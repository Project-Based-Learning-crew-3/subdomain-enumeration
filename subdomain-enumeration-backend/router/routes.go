package routes

import (
	"github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/controller"
	"github.com/gofiber/fiber/v2"
)

func Routes() *fiber.App {
	router := fiber.New()

	//  /*/*/ CORS /*/*/*/
	//  router.Use(cors.New(cors.Config{
	// 	AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
	// 	AllowOrigins:     os.Getenv("FRONTEND_URL"),
	// 	AllowCredentials: true,
	// 	AllowMethods:     "POST",
	// }))

	// routes
	router.Get("/", controller.Controller)
	router.Post("/findsubdomains", controller.Findsubdomains)

	return router
}
