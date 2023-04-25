package routes

import (
	"fmt"
	"net/http"
	"os"

	"github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/controller"
	// enumeration "github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/helpers"
	"github.com/PuerkitoBio/goquery"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func Routes() *fiber.App {
	router := fiber.New()

	//  /*/*/ CORS /*/*/*/
	router.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     os.Getenv("FRONTEND_URL"),
		AllowCredentials: true,
		AllowMethods:     "POST",
	}))

	// routes
	router.Get("/", controller.Controller)
	router.Post("/findsubdomains", controller.Findsubdomains)
	router.Post("/getheaders", func(c *fiber.Ctx) error {
		var domain controller.Domain
		c.BodyParser(&domain)
		resp, err := http.Head("https://" + domain.Domain)
		if err != nil {
			fmt.Println("Error:", err)
			return nil
		}

		defer resp.Body.Close()

		headers := resp.Header
		fmt.Println(headers)
		return c.JSON(fiber.Map{"headers": headers})
	})

	router.Post("/findalllinks", func(c *fiber.Ctx) error {

		var domain controller.Domain
		c.BodyParser(&domain)

		var links []string

		resp, err := http.Get("http://" + domain.Domain)
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()

		// Load the HTML document using goquery
		doc, err := goquery.NewDocumentFromReader(resp.Body)
		if err != nil {
			panic(err)
		}

		// Find all links in the HTML document and print their href attributes
		doc.Find("a").Each(func(i int, s *goquery.Selection) {
			href, exists := s.Attr("href")
			if exists {
				links = append(links, href)
			}
		})

		return c.JSON(fiber.Map{"links": links})
	})

	return router
}
