import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { scrapeData } from './controllers/scrapper'
import { PORT, URL } from './utils/constants'

const app = express()
app.use(cors())

app.get('/health', (req, res) => res.send('healthy'))

app.get('/getCovidData', async (req, res, next) => {
    try {
        await scrapeData(URL)
        fs.readFile('data.json', (err, d) => {
            if (err) next(err)
            else res.send(JSON.parse(d))
        })
    } catch (err) {
        res.send(err)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port - ${PORT}`)
})
