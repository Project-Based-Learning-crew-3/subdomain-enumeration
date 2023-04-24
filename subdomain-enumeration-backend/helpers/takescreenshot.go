package enumeration

import (
	"io"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

// https://api.apiflash.com/v1/urltoimage?access_key=50b816ea01e643d096c4e7948539b372&wait_until=page_loaded&url=http://google.com

type Subdomain struct {
	Subdomain string `json:"subdomain"`
}

func TakeScreenshot(c *fiber.Ctx) error {

	// ctx, cancel := chromedp.NewContext(context.Background())
	// defer cancel()

	// // Navigate to the URL
	var url Subdomain
	c.BodyParser(&url)
	// fmt.Println(url.Subdomain)
	// if url.Subdomain == "" {
	// 	return c.JSON(fiber.Map{"error": "Please provide a url"})
	// }

	// if err := chromedp.Run(ctx, chromedp.Navigate("https://"+url.Subdomain)); err != nil {
	// 	return c.JSON(fiber.Map{"error": "canot navigate to invalid url"})
	// }

	// // Wait for the page to load
	// time.Sleep(time.Second * 2)

	// // Take a screenshot of the page
	// var buf []byte
	// if err := chromedp.Run(ctx, chromedp.CaptureScreenshot(&buf)); err != nil {
	// 	log.Fatal(err)
	// }

	apiFlashEndpoint := "https://api.apiflash.com/v1/" + url.Subdomain
	request, _ := http.NewRequest("GET", apiFlashEndpoint, nil)
	query := request.URL.Query()
	query.Add("access_key", "50b816ea01e643d096c4e7948539b372")
	query.Add("url", "https://example.com")
	request.URL.RawQuery = query.Encode()

	client := &http.Client{}
	response, _ := client.Do(request)
	defer response.Body.Close()

	image, _ := os.Create("screenshot.jpeg")
	io.Copy(image, response.Body)
	image.Close()

	return c.JSON(fiber.Map{"base64image": image})
}
