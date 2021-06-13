const express = require('express');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');
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
            reject(res.status(500).send({
                error: err
            }))
        }
    }))
})

router.post("/updateItem", async (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            let items = []
            fs.createReadStream('./public/items.csv')
                .pipe(csv())
                .on('data', (row) => {
                    items.push(row)
                    // console.log(row);
                })
                .on('end', () => {
                    console.log('CSV file read in update successfully!');

                    // update the list
                    let idToReplace = req.body.id;
                    let index = items.findIndex(item => item.id === idToReplace)
                    console.log("Index: ", index)

                    // object is found in the array
                    if (index > -1) {
                        items.splice(index, 1, req.body)
                    } else {
                        items.push(req.body)
                    }

                    const ws = fs.createWriteStream('./public/items.csv');
                    fastcsv
                        .write(items, { headers: true })
                        .pipe(ws)

                    resolve(res.status(200).send({
                        items
                    }));
                });
        } catch (err) {
            reject(res.status(500).send({
                error: err
            }))
        }
    })
})

router.get("/deleteItem", async (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            let items = [];
            fs.createReadStream('./public/items.csv')
                .pipe(csv())
                .on('data', (row) => {
                    items.push(row);
                })
                .on('end', () => {
                    console.log('CSV file read in delete successfully!');

                    // update the list
                    let idToDelete = req.query.id;
                    let index = items.findIndex(item => item.id === idToDelete)

                    // object is found in the array
                    if (index > -1) {
                        items.splice(index, 1)
                    }

                    const ws = fs.createWriteStream('./public/items.csv');
                    fastcsv
                        .write(items, { headers: true })
                        .pipe(ws)

                    resolve(res.status(200).send({
                        items
                    }));
                });
        } catch (err) {
            reject(res.status(500).send({
                message: "Could not delete the item",
                error: err
            }))
        }
    })
})

module.exports = router