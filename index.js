import express from 'express'
import cors from 'cors'
import { scrapeData } from './controllers/scrapper'
import { PORT, URL } from './utils/constants'

const app = express()
app.use(cors)

app.get('/health', (req, res) => res.send('healthy'))

app.get('/getCovidData', async (req, res) => {
    await scrapeData(URL)
})

app.listen(PORT, () => {
    console.log(`Listening on port - ${PORT}`)
})
