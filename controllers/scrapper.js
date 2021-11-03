import axios from 'axios'
import cheerio from 'cheerio'
import { count } from 'console'
import fs from 'fs'
import { title } from 'process'
import { formatString } from '../utils/formatText'

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

        fs.writeFile(
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
