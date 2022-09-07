import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'


function CampgroundView() {
    const navigate = useNavigate()
    const param = useParams();
    const [campground, setCampground] = useState({});
    useEffect(
        ()=>{
            return async() => {await axios.get(`http://localhost:3001/campground/${param.id}`).then(data=>setCampground(data.data))
        }},
        [param.id]
    )
    
    
    return (
        <div className='campground-view'>
            <h1>{campground.title}</h1>
            <h2>{campground.location}</h2>
            <button onClick={()=>navigate(`/campground/edit/${param.id}`)}>Edit</button>
            <button onClick={()=> axios.delete(`http://localhost:3001/campground/delete/${param.id}`).then(navigate(`/`))}>Delete</button>
        </div>
    )
}

export default CampgroundView
