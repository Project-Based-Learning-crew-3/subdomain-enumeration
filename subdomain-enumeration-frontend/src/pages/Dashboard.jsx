import React from 'react'

let subdomainsFound;
const Dashboard = () => {
  return (
    <div style={{
        color: 'white'
    }}>
        <h2>Subdomains <br></br> found {subdomainsFound} </h2>
        <div className="StatusCode">
            <h2>200 {}</h2>
            <h2>300 {}</h2>
            <h2>400 {}</h2>
        </div>
    </div>
  )
}

export default Dashboard