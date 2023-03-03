# subdomain-enumeration
This is a simple GUI tool that allows penetration testers to efficiently find the vulnerable subdomains of a given main domain
<br></br>
## Features
- enumerate multiple all possible subdomains 
- filter subdomains based on status codes and various parameters
- Allow users to export subdomains in various formats such as text, json, table 
<br></br>
## Usage

### Backend 
  First clone the repository using [git](https://git-scm.com/)
```sh
git clone https://github.com/Project-Based-Learning-crew-3/subdomain-enumeration.git
```

Then install all the dependencies for backend
```sh
cd subdomain-enumeration-backend/
go get
```

> if u encounter command 'go' not found, install [go](https://go.dev/dl/) 

Now run the backend server using 
```sh
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
npm install
```
After installing the dependencies run
```sh
npm start
```
Now you can view your app by visiting `http://localhost:3000/`


