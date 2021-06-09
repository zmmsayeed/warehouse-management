const express = require('express');
const csv = require('csv-parser');
const fs = require('fs')

const router = express.Router()

router.get("/getAllItems", async (req, res) => {
    return new Promise(((resolve, reject) => {
        try {
            let items = []

            fs.createReadStream('./public/items.csv')
                .pipe(csv())
                .on('data', (row) => {
                    items.push(row)
                    // console.log(row);
                })
                .on('end', () => {
                    console.log('CSV file read successfully!');
                    resolve(res.status(200).send({
                        items
                    }));
                });
        } catch (err) {
            reject(res.status(200).send({
                error: err
            }))
        }
    }))
})

module.exports = router