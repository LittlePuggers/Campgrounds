import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function CampgroundForm() {

    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        title: '',
        location: ''
    })

    useEffect(()=>{
        setData({
            title: '',
            location: ''
        })
        if (params.id) {
        axios.get(`http://localhost:3001/campground/${params.id}`)
        .then(res=>{setData((prev)=>{return{...prev, title: res.data.title, location: res.data.location}})})
    }}, [params.id])

    async function submitForm(){
        if(!data.title && !data.location) return
        if(params.id){
            await axios.put(`http://localhost:3001/campground/edit/${params.id}`, data).then(data => navigate(`/campground/${data.data._id}`))
        } else {
        await axios.post('http://localhost:3001/campground/new', data).then(data => navigate(`/campground/${data.data._id}`))
    }}

    return (
        <div className='campground-view'>
                {params.id ? <h1>Edit Campground</h1>:<h1>Add a Campground</h1>}
                <label htmlFor='title'>Title</label>
                <input name='title' type='text' value={data.title} onChange={ (e) => { setData( prev => {return ({...prev, title: e.target.value})})}}></input>
                <br/>
                <label htmlFor='title'>Location</label>
                <input type='text' value={data.location} onChange={ (e) => { setData( prev => {return ({...prev, location: e.target.value})})}}></input>
                <button onClick={() => {submitForm()}}>Submit</button>
            
        </div>
    )
}

export default CampgroundForm
