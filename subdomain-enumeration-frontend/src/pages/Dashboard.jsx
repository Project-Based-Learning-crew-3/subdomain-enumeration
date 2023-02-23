import React from 'react'

let subdomainsFound;
const Dashboard = () => {
  return (
    <div style={{
        color: 'white'
    }}>
        <h1>Subdomains <br></br> found {subdomainsFound} </h1>
        <div className="StatusCode">
            <table style={{
              width:"100%"
            }}>
                <th>200 {}</th>
                <th>300 {}</th>
                <th>400 {}</th>
            </table>
            <button type="submit" style={{
              width:"20%",
              border:"10% solid gray",
              borderRadius:"15px",
              padding:"8px"
            }}>NEXT</button>
        </div>
    </div>
  )
}

export default Dashboard