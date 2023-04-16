package controller

import (
	"fmt"

	enumeration "github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/helpers"
	"github.com/gofiber/fiber/v2"
)

type Domain struct {
	Domain string `json:"domain"`
}
type Data struct {
	Domain string                                  `json:"domain"`
	Data   []enumeration.SubdomainsWithStatusCodes `json:"subdomains"`
}

func Controller(c *fiber.Ctx) error {

	// enumeration.Enumeration("kct.ac.in")

	//We Read the response body on the line below.
	// lib.ScreenshotPath("https://kct.ac.in", "kct.png")

	return c.SendString("Hello World2!")

}
func Findsubdomains(c *fiber.Ctx) error {
	var domain Domain
	c.BodyParser(&domain)
	fmt.Println(domain.Domain)
	return c.JSON(Data{domain.Domain, enumeration.Enumeration(domain.Domain)})
}
