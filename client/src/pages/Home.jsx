import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='bg-green-300 p-4 flex justify-between items-center'>
      <div>
        <Link to="/admin-dashboard">
          Admin</Link>
      </div>
      <div>
        <Link to="voyager-dashboard">Voyager</Link>
      </div>
      <div>
        <Link to="/manager-dashboard">
          Manager
        </Link>
      </div>
      <div>
        <Link to="/headcook-dashboard">Head Cook</Link>
      </div>
      <div>
        <Link to="/supervisor-dashboard">
          Supervisor</Link>
      </div>
    </div >
  )
}

export default Home