# Graze
___
Mailchimp alternative for Web3.
Made on Solana with UnderDog Protocol
## Components
- Blade: Email or content that is sent to user.
- Grass: NFT to keep track of user engagement usin various metrics
### Usage metrics 
- Blade sent
- Blade Open Rate: depends upon blades sent and blades open.
- Blade Subscription Rate: depends upon total blades and blades sent .
- User Score: depends upon open rate and subscription rate.
- First Visited
- Last Visited
- Subscription Status
- ## Features
- Dust CNFTs(grass and blade) to users and creators
- Keep track of open rate, subscription status etc via on-chain stamps

## Setup
- rename .env.example to .env. Get your API keys from UnderDog Protocol and add it in .env file
- Move to API folder, do npm install. 
- Go back to parent folder and then go inside client. Do npm install and npm start to start the UI.
- From parent folder, do node api/index.js to start the API server.
