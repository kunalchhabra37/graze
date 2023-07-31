# API Routes
## Projects
GET /api/projects/fetch/all
- Fetches All projects of the user

GET /api/projects/fetch/{projectId}
- Fetches a Particular project

GET /api/projects/fetch/stats/{projectId}
- Fetches stats of a particular project

POST /api/projects/create
- Creates a new Project


## NFTs
GET /api/nft/fetch/all/{projectId}
- Fetches all NFTs in a project

GET /api/nft/fetch/{type}/{projectId}/{nftId}
- Fetches a Particular NFT of type grass or blade

GET /api/nft/check/blade/{projectId}/{wallet}/{contentId}
- Checks if a user has particular blade NFT with contentId

GET /api/nft/check/grass/{projectId}/{wallet}
- Checks if a user has grass nft

POST /api/nft/send/{type}/{projectId}
- Mint a single NFT

POST /api/nft/batch/{type}/{projectId}
- Batch transfer NFT to multiple users of both types

POST /api/nft/burn/{type}/{projectId}/{nftId}
- Burns an NFT of both types

PATCH /api/nft/update/{type}/grass/{projectId}/{grassId}
- Updates grass NFT for updating metrics. 4 types of Update request types: {incBladeCount,bladeOpened,updateLastVisited,updateSubscriptionStatus}

- ## Dashboard
- GET /api/dashboard/fetch
- - Fetches the Dashboard and displays all user metrics
