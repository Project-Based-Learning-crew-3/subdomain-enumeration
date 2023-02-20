package controller

import (
	enumeration "github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/helpers"
	"github.com/gofiber/fiber/v2"
)

type Subdomain struct {
	Subdomain string `json:"subdomain"`
}
type Data struct {
	Data enumeration.Subdomains `json:"data"`
}

func Controller(c *fiber.Ctx) error {
	// enumeration.Enumeration("kct.ac.in")
	return c.SendString("Hello World2!")

}

func Findsubdomains(c *fiber.Ctx) error {
	var subdomain Subdomain
	c.BodyParser(&subdomain)
	return c.JSON(Data{enumeration.Enumeration(subdomain.Subdomain)})
}
