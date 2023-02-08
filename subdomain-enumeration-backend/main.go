package main
import "github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/router"

func main() {
	app := routes.Routes();
	app.Listen(":3000")
}