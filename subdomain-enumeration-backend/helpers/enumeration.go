package enumeration

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"strings"

	"github.com/projectdiscovery/subfinder/v2/pkg/resolve"
	"github.com/projectdiscovery/subfinder/v2/pkg/runner"
)

func Enumeration(url string) []SubdomainsWithStatusCodes {
	return subfinder(url)
}

func subfinder(url string) []SubdomainsWithStatusCodes {

	runnerInstance, err := runner.NewRunner(&runner.Options{
		Threads:            10,                       // Thread controls the number of threads to use for active enumerations
		Timeout:            30,                       // Timeout is the seconds to wait for sources to respond
		MaxEnumerationTime: 10,                       // MaxEnumerationTime is the maximum amount of time in mins to wait for enumeration
		Resolvers:          resolve.DefaultResolvers, // Use the default list of resolvers by marshaling it to the config
		ResultCallback: func(s *resolve.HostEntry) { // Callback function to execute for available host
			log.Println(s.Host, s.Source)
		},
		Verbose: true,
	})

	buf := bytes.Buffer{}
	err = runnerInstance.EnumerateSingleDomain(url, []io.Writer{&buf})
	if err != nil {
		log.Fatal(err)
	}

	data, err := io.ReadAll(&buf)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s", data)

	var subdomains []string = strings.Split(string(data), "\n")
	// Set up httpx client

	return FindStatusCodes(subdomains)

}
