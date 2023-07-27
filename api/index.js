const express = require('express')

const app = express()

const PORT = 6969

app.use(express.json())
app.use(cors())
/*
endpoints:
- create project: 
- Mint NFT and transfer
- burn NFT
- Update NFT
- fetch users holding a particular NFT
- fetch dashboard
*/

app.listen(PORT, console.log(`Server started on Port ${PORT}`))