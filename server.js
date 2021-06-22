const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = require('./routes')

const app = express()

app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/contacts', router)

app.get('/', (req, res) => {
    // res.json({
    //     message: 'working'
    // })
})

const PORT = process.env.PORT || 2727

mongoose
    .connect('mongodb+srv://<db_username>:<db_password>@cluster0.lsnb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })
