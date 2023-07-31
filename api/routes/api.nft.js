const express = require("express");
const router = express.Router();
const controller = require("../utils.js");

router.post("/send/:type/:projectId", controller.sendNFT);
router.post("/batch/:type/:projectId", controller.batchTransferNFT);
router.patch("/update/:type/grass/:projectId/:grassId", controller.updateGrass);
router.post("/burn/:type/:projectId/:nftId", controller.burnNft); 
router.get("/check/grass/:projectId/:wallet", controller.checkGrass);
router.get("/check/blade/:projectId/:wallet/:contentId", controller.checkBlade);
router.get("/fetch/all/:projectId", controller.fetchAllNFT);
router.get("/fetch/:type/:projectId/:nftId", controller.fetchSingleNft);


module.exports = router;
