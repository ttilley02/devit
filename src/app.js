require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const articlesRouter = require('.//folderRoutes/folderRoutes')
const NoteRouter = require('.//noteRoutes/noteRoutes')

const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/folders', articlesRouter)
app.use('/notes', NoteRouter)

app.get('/', (req, res) => {

    res.send('Hello, boilerplate!')

})

module.exports = app