const express = require('express')
const axios = require('axios')
const apiController = require("./Routes/index")

const app = express()

app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/api", apiController)
// app.use("/api", (req, res) => {
//     res.send({
//         name: "Zimam"
//     })
// })

app.get("/", async (req, res) => {
    // let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let url = req.protocol + '://' + req.get('host') + "/api/getAllItems";
    let data = await axios.get(url)

    let headers = data.data.items.map((item, index) => {
        if (index === 0) {
            return Object.keys(item).map(header => header)
        }
    })[0]

    res.render('pages/index', { items: data.data.items, headers: headers })
})

// app.get("/api")

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});