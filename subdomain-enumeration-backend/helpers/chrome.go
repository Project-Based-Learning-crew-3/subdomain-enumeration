package enumeration

import (
	"context"
	"errors"
	"net/url"
	"time"

	"github.com/chromedp/cdproto/inspector"
	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/cdproto/runtime"
	"github.com/chromedp/chromedp"
)

// import (
// 	"fmt"
// 	"log"
// 	"net/url"
// 	"os"

// 	"github.com/gofiber/fiber/v2"
// 	"github.com/rs/zerolog"
// 	"github.com/sensepost/gowitness/chrome"
// 	"gorm.io/gorm"
// )

// type Processor struct {
// 	Logger *zerolog.Logger

// 	Db                 *gorm.DB
// 	Chrome             *chrome.Chrome
// 	URL                *url.URL
// 	ScreenshotPath     string
// 	ScreenshotFileName string

// 	// file name & file path
// 	fn string
// 	fp string

// 	// preflight response
// 	preflightResult *chrome.PreflightResult
// 	// screenshot
// 	screenshotResult *chrome.ScreenshotResult

// 	// persistence id
// 	urlid uint
// }

// func (p *Processor) preflight() (err error) {
// 	log := zerolog.New(os.Stdout).With().Timestamp().Logger()
// 	log.Info().Msg("crash")
// 	p.Logger.Debug().Str("url", p.URL.String()).Msg("preflighting")

// 	p.preflightResult, err = p.Chrome.Preflight(p.URL)
// 	if err != nil {
// 		return
// 	}

// 	var l *zerolog.Event
// 	if p.preflightResult.HTTPResponse.StatusCode == 200 {
// 		l = p.Logger.Info()
// 	} else {
// 		l = p.Logger.Warn()
// 	}
// 	l.Str("url", p.URL.String()).Int("statuscode", p.preflightResult.HTTPResponse.StatusCode).
// 		Str("title", p.preflightResult.HTTPTitle).Msg("preflight result")

// 	return
// }

// func ReturnScreenshot(c *fiber.Ctx) error {
// 	fmt.Println("Hello")

// 	url1, err := url.Parse("kct.ac.in")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Println(url1)

// 	chrm := chrome.NewChrome()
// 	chrm.PrepareHeaderMap()
// 	// opt := Processor{
// 	// Logger:             ,
// 	// Db:                 db,
// 	// Chrome: chrm,
// 	// ScreenshotPath:     options.ScreenshotPath,
// 	// ScreenshotFileName: options.ScreenshotFileName,
// 	// URL: url1,
// 	// }

// 	fmt.Println("Came here too!")
// 	// preflight dispatches the preflight function
// 	// err = opt.preflight()
// 	// if err != nil {
// 	// 	log.Error().Err(err).Msg("error preflighting")
// 	// }

// 	// takeScreenshot dispatches the takeScreenshot function
// 	// var ssbyte []byte
// 	// err = opt.takeScreenshot()
// 	chrm.PrepareHeaderMap()
// 	result, err := chrm.Screenshot(url1)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	// fmt.Println("came here")
// 	fmt.Println("came here2")
// 	// fmt.Println(string(opt.screenshotResult.Screenshot))

// 	fmt.Println(string(result.Screenshot))
// 	// return c.SendString(string(opt.screenshotResult.Screenshot))

// 	return c.SendString(string(result.Screenshot))
// }

// // takeScreenshot dispatches the takeScreenshot function
// func (p *Processor) takeScreenshot() (err error) {
// 	p.Logger.Debug().Str("url", p.URL.String()).Msg("screenshotting")

// 	p.screenshotResult, err = p.Chrome.Screenshot(p.URL)
// 	if err != nil {
// 		return
// 	}

// 	fmt.Println(p.screenshotResult)

// 	return
// }

type Chrome struct {
	ResolutionX int
	ResolutionY int
	UserAgent   string
	Timeout     int64
	Delay       int
	FullPage    bool
	ChromePath  string
	Proxy       string
	Headers     []string
	HeadersMap  map[string]interface{}

	// save screenies as PDF's instead
	AsPDF bool

	// wappalyzer client
	// wappalyzer *Wappalyzer
}
type ConsoleLog struct {
	URLID uint

	Type  string
	Value string
}

type NetworkLog struct {
	URLID uint

	RequestID string
	Time      time.Time
	// RequestType storage.RequestType
	StatusCode int64
	URL        string
	FinalURL   string // may differ from URL if there were redirects
	IP         string
	Error      string
}
type ScreenshotResult struct {
	Screenshot []byte
	DOM        string

	// logging
	ConsoleLog []ConsoleLog
	NetworkLog []NetworkLog
}

func NewChrome() *Chrome {
	return &Chrome{}
}

func (chrome *Chrome) Screenshot(url *url.URL) (result *ScreenshotResult, err error) {

	// prepare a new screenshotResult
	result = &ScreenshotResult{}

	// setup chromedp default options
	options := []chromedp.ExecAllocatorOption{}
	options = append(options, chromedp.DefaultExecAllocatorOptions[:]...)
	options = append(options, chromedp.UserAgent(chrome.UserAgent))
	options = append(options, chromedp.DisableGPU)
	options = append(options, chromedp.Flag("ignore-certificate-errors", true)) // RIP shittyproxy.go
	options = append(options, chromedp.WindowSize(chrome.ResolutionX, chrome.ResolutionY))

	if chrome.ChromePath != "" {
		options = append(options, chromedp.ExecPath(chrome.ChromePath))
	}

	if chrome.Proxy != "" {
		options = append(options, chromedp.ProxyServer(chrome.Proxy))
	}

	actx, acancel := chromedp.NewExecAllocator(context.Background(), options...)
	defer acancel()
	browserCtx, cancelBrowserCtx := chromedp.NewContext(actx)
	defer cancelBrowserCtx()

	// create the initial context to act as the 'tab', where we will perform the initial navigation
	// if this context loads successfully, then the screenshot will have been captured
	//
	//		Note:	You're not supposed to delay the initial run context, so we use WithTimeout
	//				 https://pkg.go.dev/github.com/chromedp/chromedp#Run

	tabCtx, cancelTabCtx := context.WithTimeout(browserCtx, time.Duration(chrome.Timeout)*time.Second)
	defer cancelTabCtx()

	// Run the initial browser
	if err := chromedp.Run(browserCtx); err != nil {
		return nil, err
	}

	// prevent browser crashes from locking the context (prevents hanging)
	chromedp.ListenTarget(browserCtx, func(ev interface{}) {
		if _, ok := ev.(*inspector.EventTargetCrashed); ok {
			cancelBrowserCtx()
		}
	})

	chromedp.ListenTarget(tabCtx, func(ev interface{}) {
		if _, ok := ev.(*inspector.EventTargetCrashed); ok {
			cancelTabCtx()
		}
	})

	// squash JavaScript dialog boxes such as alert();
	chromedp.ListenTarget(tabCtx, func(ev interface{}) {
		if _, ok := ev.(*page.EventJavascriptDialogOpening); ok {
			go func() {
				if err := chromedp.Run(tabCtx,
					page.HandleJavaScriptDialog(true),
				); err != nil {
					cancelTabCtx()
				}
			}()
		}
	})

	// log console.* events, as well as any thrown exceptions
	chromedp.ListenTarget(tabCtx, func(ev interface{}) {
		switch ev := ev.(type) {
		case *runtime.EventConsoleAPICalled:

			// use a buffer to read each arg passed to the console.* call
			buf := ""
			for _, arg := range ev.Args {
				buf += string(arg.Value)
			}

			result.ConsoleLog = append(result.ConsoleLog, ConsoleLog{
				Type:  "console." + string(ev.Type),
				Value: buf,
			})

		case *runtime.EventExceptionThrown:
			result.ConsoleLog = append(result.ConsoleLog, ConsoleLog{
				Type:  "exception",
				Value: ev.ExceptionDetails.Error(),
			})
		}
	})

	// keep a keyed reference so we can map network logs to requestid's and
	// update them as responses are received
	networkLog := make(map[string]NetworkLog)

	// log network events
	chromedp.ListenTarget(tabCtx, func(ev interface{}) {
		switch ev := ev.(type) {
		// http
		case *network.EventRequestWillBeSent:
			// record a fresh request that will be sent
			networkLog[string(ev.RequestID)] = NetworkLog{
				RequestID: string(ev.RequestID),
				Time:      time.Time(*ev.Timestamp),
				// RequestType: storage.HTTP,
				URL: ev.Request.URL,
			}
		case *network.EventResponseReceived:
			// update the networkLog map with updated information about response
			if entry, ok := networkLog[string(ev.RequestID)]; ok {
				entry.StatusCode = ev.Response.Status
				entry.FinalURL = ev.Response.URL
				entry.IP = ev.Response.RemoteIPAddress

				networkLog[string(ev.RequestID)] = entry
			}
		case *network.EventLoadingFailed:
			// update the network map with the error experienced
			if entry, ok := networkLog[string(ev.RequestID)]; ok {
				entry.Error = ev.ErrorText

				networkLog[string(ev.RequestID)] = entry
			}
		// websockets
		case *network.EventWebSocketCreated:
			networkLog[string(ev.RequestID)] = NetworkLog{
				RequestID: string(ev.RequestID),
				// RequestType: storage.WS,
				URL: ev.URL,
			}
		case *network.EventWebSocketHandshakeResponseReceived:
			if entry, ok := networkLog[string(ev.RequestID)]; ok {
				entry.StatusCode = ev.Response.Status
				entry.Time = time.Time(*ev.Timestamp)

				networkLog[string(ev.RequestID)] = entry
			}
		case *network.EventWebSocketFrameError:
			if entry, ok := networkLog[string(ev.RequestID)]; ok {
				entry.Error = ev.ErrorMessage

				networkLog[string(ev.RequestID)] = entry
			}
		}
	})

	// perform navigation on the tab context and attempt to take a clean screenshot
	err = chromedp.Run(tabCtx, buildTasks(chrome, url, true, &result.Screenshot, &result.DOM))

	if errors.Is(err, context.DeadlineExceeded) {
		// if the context timeout exceeded (e.g. on a long page load) then
		// just take the screenshot this will take a screenshot of whatever
		// loaded before failing

		// create a new tab context for this scenario, since our previous
		// context expired using a context timeout delay again to help
		// prevent hanging scenarios
		newTabCtx, cancelNewTabCtx := context.WithTimeout(browserCtx, time.Duration(chrome.Timeout)*time.Second)
		defer cancelNewTabCtx()

		// listen for crashes on this backup context as well
		chromedp.ListenTarget(newTabCtx, func(ev interface{}) {
			if _, ok := ev.(*inspector.EventTargetCrashed); ok {
				cancelNewTabCtx()
			}
		})

		// attempt to capture the screenshot of the tab and replace error accordingly
		err = chromedp.Run(newTabCtx, buildTasks(chrome, url, false, &result.Screenshot, &result.DOM))
	}

	if err != nil {
		return nil, err
	}

	// close the tab so that we dont receive more network events
	cancelTabCtx()

	// append the networklog
	for _, log := range networkLog {
		result.NetworkLog = append(result.NetworkLog, log)
	}

	return result, nil
}

func buildTasks(chrome *Chrome, url *url.URL, doNavigate bool, buf *[]byte, dom *string) chromedp.Tasks {
	var actions chromedp.Tasks

	if len(chrome.HeadersMap) > 0 {
		actions = append(actions, network.Enable(), network.SetExtraHTTPHeaders(network.Headers(chrome.HeadersMap)))
	}

	if doNavigate {
		actions = append(actions, chromedp.Navigate(url.String()))
		if chrome.Delay > 0 {
			actions = append(actions, chromedp.Sleep(time.Duration(chrome.Delay)*time.Second))
		}
		actions = append(actions, chromedp.Stop())
	}

	// add a small sleep to wait for images and other things
	actions = append(actions, chromedp.Sleep(time.Second*3))

	// grab the dom
	actions = append(actions, chromedp.OuterHTML(":root", dom, chromedp.ByQueryAll))

	// should we print as pdf?
	if chrome.AsPDF {
		actions = append(actions, chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			*buf, _, err = page.PrintToPDF().
				WithDisplayHeaderFooter(true).
				Do(ctx)
			return err
		}))

		return actions
	}

	// otherwise screenshot as png
	if chrome.FullPage {
		actions = append(actions, chromedp.FullScreenshot(buf, 100))
	} else {
		actions = append(actions, chromedp.CaptureScreenshot(buf))
	}

	return actions
}
