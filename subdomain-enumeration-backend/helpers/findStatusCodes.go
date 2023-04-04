package enumeration

import (
	"fmt"
)

type SubdomainsWithStatusCodes struct {
	Subdomain  string `json:"subdomain"`
	StatusCode int    `json:"statuscode"`
}

func FindStatusCodes(subdomains []string) []SubdomainsWithStatusCodes {

	fmt.Println(subdomains)

	var subdomainsWithStatusCodes = []SubdomainsWithStatusCodes{}

	for _, subdomain := range subdomains {

		getStatusCode(subdomain, &subdomainsWithStatusCodes)
	}

	return subdomainsWithStatusCodes

}

func getStatusCode(subdomain string, subdomainSlice *[]SubdomainsWithStatusCodes) {

	// var finalSubdomain = SubdomainsWithStatusCodes{
	// 	Subdomain:  subdomain,
	// 	StatusCode: resp.StatusCode,
	// }

	// *subdomainSlice = append(*subdomainSlice, finalSubdomain)

}
