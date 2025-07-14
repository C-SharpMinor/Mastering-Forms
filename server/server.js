const express= require('express')
const dotenv= require('dotenv')
const mongoose= require('mongoose')
const cors= require('cors')

const PropertyRoutes= require('./routes/propertyRoutes')
const UserRoutes= require('./routes/userRoutes')

dotenv.config()

const app = express()

app.use(express.json({limit:'50mb'}))
app.use(cors({origin: "http://localhost:5173"}))
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/properties', PropertyRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected successfully"))
.catch((err)=> console.log("MongoDB connection failed", err.message))

app.get('/', (req, res)=>{
    res.send('Welcome to the server')   
})
const PORT= process.env.PORT || 5001

app.listen(PORT , (req, res)=>{
    console.log(`Server is running on port ${PORT}`
    )
})

