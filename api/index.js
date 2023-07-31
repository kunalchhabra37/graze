const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 6969

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());


app.use('/api/nft', require('./routes/api.nft'))
app.use('/api/projects', require('./routes/api.project'))
app.use('/api/dashboard', require('./routes/api.dashboard'))


app.listen(PORT, console.log(`Server started on Port ${PORT}`))