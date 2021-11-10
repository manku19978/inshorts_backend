import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import { formatString } from '../utils/formatText.js'

export async function scrapeData(url) {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const requiredData = [
            formatString($('.bg-blue .mob-hide').text().trim()),
            formatString($('.bg-green .mob-hide').text().trim()),
            formatString($('.bg-red .mob-hide').text().trim()),
            {
                title: 'Total Vaccinations',
                count: $('.coviddata').text().trim(),
                countChange: $('.coviddataval').text().trim()
            }
        ]

        fs.writeFileSync(
            'data.json',
            JSON.stringify(requiredData, null, 2),
            err => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Successfully written data to file')
            }
        )
    } catch (err) {
        console.error(err)
    }
}
