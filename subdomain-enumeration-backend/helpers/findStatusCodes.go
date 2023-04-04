package enumeration

import (
	"fmt"
	"sync"

	"github.com/valyala/fasthttp"
)

type SubdomainsWithStatusCodes struct {
	Subdomain  string `json:"subdomain"`
	StatusCode int    `json:"statuscode"`
}

func FindStatusCodes(subdomains []string) []SubdomainsWithStatusCodes {

	var subdomainsWithStatusCodes = []SubdomainsWithStatusCodes{}
	sem := make(chan struct{}, 10) // limit to 10 concurrent goroutines

	var wg sync.WaitGroup
	wg.Add(len(subdomains))

	for _, domain := range subdomains {
		sem <- struct{}{}
		go func(domain string) {
			defer func() {
				<-sem
				wg.Done()
			}()

			req := fasthttp.AcquireRequest()
			defer fasthttp.ReleaseRequest(req)
			req.SetRequestURI("https://" + domain)

			req.Header.Set("Accept-Encoding", "gzip")

			resp := fasthttp.AcquireResponse()
			defer fasthttp.ReleaseResponse(resp)

			// Perform the request
			err := fasthttp.Do(req, resp)
			if err != nil {
				fmt.Printf("Client get failed: %s\n", err)
				return
			}

			subdomainsWithStatusCodes = append(subdomainsWithStatusCodes, SubdomainsWithStatusCodes{Subdomain: domain, StatusCode: resp.StatusCode()})

		}(domain)
	}

	wg.Wait()

	return subdomainsWithStatusCodes

}
