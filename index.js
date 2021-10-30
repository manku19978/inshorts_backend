import express from 'express'

const app = express()

app.get('/health', (req, res) => {
    res.send('Healthy')
})

app.listen(9000, () => {
    console.log('Listening')
})
