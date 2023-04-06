package enumeration

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/gofiber/fiber/v2"
)

type Subdomain struct {
	Subdomain string `json:"subdomain"`
}

func TakeScreenshot(c *fiber.Ctx) error {

	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// Navigate to the URL
	var url Subdomain
	c.BodyParser(&url)
	fmt.Println(url.Subdomain)
	if url.Subdomain == "" {
		return c.JSON(fiber.Map{"error": "Please provide a url"})
	}

	if err := chromedp.Run(ctx, chromedp.Navigate("https://"+url.Subdomain)); err != nil {
		return c.JSON(fiber.Map{"error": "canot navigate to invalid url"})
	}

	// Wait for the page to load
	time.Sleep(time.Second * 2)

	// Take a screenshot of the page
	var buf []byte
	if err := chromedp.Run(ctx, chromedp.CaptureScreenshot(&buf)); err != nil {
		log.Fatal(err)
	}

	enc := base64.StdEncoding.EncodeToString(buf)

	fmt.Println(enc)

	return c.JSON(fiber.Map{"base64image": enc})
}
