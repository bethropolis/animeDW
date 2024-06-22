package api

import (
	"compress/gzip"
	"io"
	"net/http"
	"net/http/cookiejar"
	"sync"
)

type Client struct {
	client  *http.Client
	baseUrl string
	cache   map[string]string
	mutex   sync.Mutex
}

func NewClient(baseUrl string) *Client {
	jar, _ := cookiejar.New(nil)
	return &Client{
		client:  &http.Client{Jar: jar},
		baseUrl: baseUrl,
		cache:   make(map[string]string),
	}
}

func (c *Client) Get(url string, headers map[string]string) (string, error) {

	var fullUrl string
	if hostUrl, ok := headers["HostUrl"]; ok {
		// Step 2: Use "HostUrl" as the base URL
		fullUrl = hostUrl + url
		// Remove "HostUrl" from headers to avoid sending it as an HTTP header
		delete(headers, "HostUrl")
	} else {
		// Step 3: Use the client's default baseUrl
		fullUrl = c.baseUrl + url
	}

	// Check the cache
	c.mutex.Lock()
	if cachedResponse, found := c.cache[fullUrl]; found {
		c.mutex.Unlock()
		return cachedResponse, nil
	}
	c.mutex.Unlock()

	req, err := http.NewRequest("GET", fullUrl, nil)
	if err != nil {
		return "", err
	}

	// Set "Accept-Encoding": "gzip" by default
	req.Header.Set("Accept-Encoding", "gzip")

	// Set additional headers dynamically
	for key, value := range headers {
		req.Header.Set(key, value)
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", err // This should probably return a more descriptive error
	}

	var reader io.ReadCloser
	switch resp.Header.Get("Content-Encoding") {
	case "gzip":
		reader, err = gzip.NewReader(resp.Body)
		if err != nil {
			return "", err
		}
		defer reader.Close()
	default:
		reader = resp.Body
	}

	body, err := io.ReadAll(reader)
	if err != nil {
		return "", err
	}

	responseString := string(body)

	// Store the response in the cache
	c.mutex.Lock()
	c.cache[fullUrl] = responseString
	c.mutex.Unlock()

	return responseString, nil
}
