import React from 'react'
import {Link} from 'react-router-dom'

function AppBar() {
    return (
        <div className='app-bar'>
            <Link to="/">Home</Link>
            <Link to="/campground/new">Add</Link>
        </div>
    )
}

export default AppBar
