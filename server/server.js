import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import "dotenv/config";
import Campground from './models/Campgrounds.js'
import cookieParser from 'cookie-parser'

mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
  }))
app.use(cookieParser())

app.get('/' , async (req, res)=> {
    const camp = await Campground.find()
    res.send(camp)
})

app.post('/campground/new', async (req, res)=> {
    const camp = new Campground(req.body)
    const newCamp = await camp.save()
    res.json(newCamp)
})

app.put('/campground/edit/:id', async (req, res)=>{
    const filter = {_id: req.params.id }
    const update = { ...req.body}
    await Campground.findOneAndUpdate(filter, update)
    res.json({_id: req.params.id})
})

app.get('/campground/:id', async (req, res)=> {
    const camp = await Campground.findById(req.params.id)
    res.send(camp)
})

app.delete('/campground/delete/:id', async (req, res)=>{
    await Campground.deleteOne({_id: req.params.id})
})

app.listen( PORT , () => console.log(`listening on port: ${PORT}`) )