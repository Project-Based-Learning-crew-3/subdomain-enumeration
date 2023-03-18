package main

import (
	"os"

	routes "github.com/Project-Based-Learning-crew-3/subdomain-enumeration-backend/router"
)

func main() {
	app := routes.Routes()
	app.Listen(":" + os.Getenv("PORT"))
}
