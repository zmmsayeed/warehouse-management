const express = require('express')
const axios = require('axios')
const cors = require('cors');
const apiController = require("./Routes/index")

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.static(__dirname + '/public/client/build'));
app.use(express.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/api", apiController)

app.get('/', (req, res) => {
    res.render('/client/public/index.html');
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});