# subdomain-enumeration
This is a simple GUI tool that allows penetration testers to efficiently find the vulnerable subdomains of a given main domain
<br></br>
## Features
- enumerate all possible subdomains of a given domain 
- filter subdomains based on [status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and functionality
- Allow users to export subdomains in various formats such as text, json, csv 
- Take screenshots of subdomains
<br></br>
## Usage

### Backend 
  First clone the repository using [git](https://git-scm.com/)
```sh
git clone https://github.com/Project-Based-Learning-crew-3/subdomain-enumeration.git
```
Then navigate to backend directory
```sh
cd subdomain-enumeration-backend/
```

Then install all the dependencies for backend
```go
go get
```

> if u encounter command 'go' not found, install [go](https://go.dev/dl/) 

Now run the backend server using 
```go
go run main.go
```
The go server will be running on port 3000
<br></br>
### Frontend
navigate to frontend
```sh
cd ..
cd subdomain-enumeration-frontend/
```
install all the dependencies for react
```sh
npm install --force
```
After installing the dependencies run
```sh
npm start
```
Now you can view your app by visiting `http://localhost:3000/`

see a live demo [here](https://subdomain-enumeration.netlify.app/)

