const axios = require("axios");
require("dotenv").config();
const underdogApiEndpoint = "https://dev.underdogprotocol.com";

const config = {
  headers: { Authorization: `Bearer ${process.env.UNDERDOG_API_KEY}` },
};

const createProject = async (req, res) => {
  try {
    const name = req.body.name;
    const bladeImage = req.body.bladeImage;
    const description = req.body.description;
    const grassImage = req.body.grassImage;

    // grass
    const grassData = {
      name: name,
      symbol: "grass",
      image: grassImage,
      description: description,
      transferable: false,
    };

    const createGrass = await axios.post(
      `${underdogApiEndpoint}/v2/projects`,
      grassData,
      config
    );

    // blade
    const bladeData = {
      name: name,
      symbol: "blade",
      image: bladeImage,
      description: JSON.stringify({
        description: description,
        grassProjectId: createGrass.data.projectId,
        grassMintAddress: createGrass.data.mintAddress,
        totalBlades: 0,
      }),
      transferable: false,
    };

    const createBlade = await axios.post(
      `${underdogApiEndpoint}/v2/projects`,
      bladeData,
      config
    );
    console.log(createGrass.data);
    console.log(createBlade.data);
    res
      .status(200)
      .json({
        msg: "Project created successfully",
        grassProjectId: createGrass.data.projectId,
        bladeProjectId: createBlade.data.projectId,
        grassTransactionId: createGrass.data.transactionId,
        bladeTransactionId: createBlade.data.transactionId,
      });
  } catch (err) {
    console.log("err in create project", err);
    res.status(401).json({ msg: "error while creating projects", err });
  }
};

const listAllProjects = async (req, res) => {
  try {
    const resp = await axios.get(
      `${underdogApiEndpoint}/v2/projects?limit=10`,
      config
    );
    const underdogProjects = resp.data.results;
    const grazeProjects = [];

    for (let project of underdogProjects) {
      if (project.symbol === "blade" && checkJson(project.description)) {
        const description = JSON.parse(project.description);
        const totalBlades = description.totalBlades
          ? description.totalBlades
          : 0;
        description.grassMintAddress = description.grassMintAddress
          ? description.grassMintAddress
          : "";
        grazeProjects.push({
          name: project.name,
          description: description.description,
          projectId: project.id,
          grassProjectId: description.grassProjectId,
          bladeProjectID: project.id,
          image: project.image,
          grassMintAddress: description.grassMintAddress,
          bladeMintAddress: project.mintAddress,
        });
      } else continue;
    }

    res.status(200).json({ result: grazeProjects });
  } catch (err) {
    console.log("err in list project", err);
    res.status(400).json({ msg: "error while fetching projects", err });
  }
};

const checkJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
};

const sendNFT = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);

    const nftType = req.params.type;
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const externalUrl = req.body.bladeaUrl ? req.body.bladeaUrl : "";
    const contentId = req.body.contentId ? req.body.contentId : "";
    const newBlade = req.body.newBlade ? req.body.newBlade : true;
    const receiverAddress = req.body.receiverAddress;

    if (nftType === "grass") {
      const check = await checkNft(grassProjectId, receiverAddress);
      if (check.present) {
        return res
          .status(200)
          .json({
            msg: "grass already present for the user",
            id: check.nfts[0].id,
          });
      }
    }
    let { nftData, projectId } = createNFT(
      nftType,
      bladeProjectId,
      grassProjectId,
      name,
      image,
      description,
      externalUrl,
      contentId
    );
    nftData.receiverAddress = receiverAddress;
    await axios.post(
      `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
      nftData,
      config
    );

    //update project and nft params if blade
    if (nftType === "blade") {
      const { present, nfts } = await checkNft(grassProjectId, receiverAddress);
      if (!present) {
        throw new Error("Invalid User");
      }
      const grassId = nfts[0].id;
      await update(grassProjectId, grassId, "incBladeCount", {
        bladeProjectId: bladeProjectId,
        newBlade: newBlade,
      });
    }
    res.status(200).json({ msg: "Transfer of nft successful" });
  } catch (err) {
    console.log("err in send nft", err);
    res.status(400).json({ msg: "error", err });
  }
};

const batchTransferNFT = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);

    const nftType = req.params.type;
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const externalUrl = req.body.bladeaUrl ? req.body.bladeaUrl : "";
    const contentId = req.body.contentId ? req.body.contentId : "";
    let newBlade = req.body.newBlade ? req.body.newBlade : true;
    let receiverAddresses = req.body.receiverAddresses;
    if (nftType === "grass") {
      const alreadyGrass = [];
      for (let receiverAddress of receiverAddresses) {
        const check = await checkNft(grassProjectId, receiverAddress);
        if (check.present) {
          alreadyGrass.push(receiverAddress);
        }
      }
      receiverAddresses = receiverAddresses.filter(
        (address) => !alreadyGrass.includes(address)
      );
    }

    let { nftData, projectId } = createNFT(
      nftType,
      bladeProjectId,
      grassProjectId,
      name,
      image,
      description,
      externalUrl,
      contentId
    );
    nftData.receiverAddresses = receiverAddresses;

    await axios.post(
      `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
      nftData,
      config
    );

    // update grass and project if blade
    if (nftType === "blade") {
      for (let receiverAddress of receiverAddresses) {
        const { present, nfts } = await checkNft(
          grassProjectId,
          receiverAddress
        );

        if (!present) {
          throw new Error("Invalid User");
        }
        const grassId = nfts[0].id;
        await update(grassProjectId, grassId, "incBladeCount", {
          bladeProjectId: bladeProjectId,
          newBlade: newBlade,
        });
        newBlade = false;
      }
    }
    res
      .status(200)
      .json({
        msg: `Batch Transfer of ${receiverAddresses.length} nft successful`,
      });
  } catch (err) {
    console.log("err in batch transfer", err);
    res.status(400).json({ msg: "error", err });
  }
};

const fetchSingleNft = async (req, res) => {
  try {
    const nftType = req.params.type;
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);
    const nftId = req.params.nftId;
    let projectId;

    if (nftType === "blade") {
      projectId = bladeProjectId;
    } else if (nftType === "grass") {
      projectId = grassProjectId;
    } else throw new Error("Incorrect NFT type");
    const nft = await fetchNFT(projectId, nftId);
    res.status(200).json(nft);
  } catch (err) {
    console.log("error in fetchNftInterface", err);
    res.status(400).json({ msg: "nft not found" });
  }
};

const fetchGrassProjectId = async (bladeProjectId) => {
  try {
    const bladeProject = await fetchProjectApi(bladeProjectId);

    const description = bladeProject.description;
    if (!checkJson(description)) {
      throw new Error("Not a valid Blade/Graze Project");
    }
    return JSON.parse(description).grassProjectId;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchNFT = async (projectId, nftId) => {
  try {
    const fetchNftResponse = await axios.get(
      `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
      config
    );

    return fetchNftResponse.data;
  } catch (err) {
    throw new Error(err);
  }
};

const updateGrass = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);
    const grassId = req.params.grassId;
    const type = req.params.type;
    const data = req.body.data;
    await update(grassProjectId, grassId, type, data);
    res.status(200).json({ msg: "grass updated successfully" });
  } catch (error) {
    console.log("error in update grass", error);
    res.status(400).json({ msg: "error in updating nft", error });
  }
};

const updateProject = async (projectId, data) => {
  try {
    await axios.patch(
      `${underdogApiEndpoint}/v2/projects/${projectId}`,
      data,
      config
    );
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (projectId, nftId, type, data) => {
  try {
    switch (type) {
      case "incBladeCount":
        {
          console.log(1);
          const grass = await fetchNFT(projectId, nftId);
          const bladeProjectId = data.bladeProjectId;
          const newBlade = data.newBlade;
          console.log(2);
          const bladeProject = await fetchProjectApi(bladeProjectId);
          console.log(3);
          if (!checkJson(bladeProject.description)) {
            throw new Error("Project is not valid blade project");
          }

          const description = JSON.parse(bladeProject.description);
          if (newBlade) {
            console.log(4);
            description.totalBlades = description.totalBlades + 1;
            await updateProject(bladeProjectId, {
              description: JSON.stringify(description),
            });
            console.log(5);
          }

          const totalBlades = description.totalBlades;
          grass.attributes.bladeSent += 1;
          grass.attributes = calculateParams(grass.attributes, totalBlades);
          console.log(6);
          const updateData = {
            attributes: grass.attributes,
          };
          console.log(7);
          const updatedNft = await axios.patch(
            `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
            updateData,
            config
          );
          console.log(8);
          return { status: true, nft: updatedNft.data };
        }
        break;
      case "bladeOpened":
        {
          const grass = await fetchNFT(projectId, nftId);
          const bladeProjectId = data.bladeProjectId;
          const bladeId = data.bladeId;

          const bladeProject = await fetchProjectApi(bladeProjectId);
          if (!checkJson(bladeProject.description)) {
            throw new Error("Project is not valid blade project");
          }

          const description = JSON.parse(bladeProject.description);
          const totalBlades = description.totalBlades;

          await burn(bladeProjectId, bladeId);

          grass.attributes.bladeOpened = grass.attributes.bladeOpened + 1;
          grass.attributes = calculateParams(grass.attributes, totalBlades);
          grass.attributes.lastVisited = Date.now();

          const updateData = {
            attributes: grass.attributes,
          };

          const updatedNft = await axios.patch(
            `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
            updateData,
            config
          );

          return { status: true, nft: updatedNft.data };
        }
        break;
      case "updateLastVisited": {
        /*  
                update last visited: fetch grass, update last visited
                */

        // const nft = await fetchNFT(projectId, nftId);
        const updateData = {
          attributes: {
            lastVisited: Date.now(),
          },
        };

        const updatedNft = await axios.patch(
          `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
          updateData,
          config
        );

        return { status: true, nft: updatedNft.data };
      }

      case "updateSubscriptionStatus": {
        /*
                update subscribed when user subscribes or unsubscribes: fetch grass, update subscribed and update attributes
                */
        const updateData = {
          attributes: {
            subscribed: data.subscribed,
          },
        };

        const updatedNft = await axios.patch(
          `${underdogApiEndpoint}/v2/projects/${projectId}/nfts/${nftId}`,
          updateData,
          config
        );
        return { status: true, nft: updatedNft.data };
      }
      default:
        throw new Error(
          "Invalid update type expected `incBladeCount || bladeOpened || updateLastVisited || updateSubscriptionStatus`"
        );
    }
  } catch (err) {
    throw new Error(err);
  }
};

const calculateParams = (nft, totalBlades) => {
  try {
    if (nft.bladeSent == 0 || totalBlades == 0) {
      return nft;
    }

    nft.bladeOpenRate = (nft.bladeOpened / nft.bladeSent) * 100;
    nft.bladeSubscriptionRate = (nft.bladeSent / totalBlades) * 100;
    nft.userScore =
      ((nft.bladeOpenRate * 100 + nft.bladeSubscriptionRate * 100 * 4) / 5) *
      100;
    return nft;
  } catch (err) {
    throw new Error(err);
  }
};

const createNFT = (
  nftType,
  bladeProjectId,
  grassProjectId,
  name,
  image,
  description,
  bladeaUrl,
  contentId
) => {
  try {
    let projectId;
    let nftData = {};

    if (nftType === "grass") {
      nftData = {
        attributes: {
          bladeProjectId: bladeProjectId,
          firstVisited: Date.now(),
          lastVisited: Date.now(),
          bladeSent: 0,
          bladeOpened: 0,
          bladeOpenRate: 0,
          bladeSubscriptionRate: 0,
          subscribed: "true",
          userScore: 0,
        },
        name: name,
        image: image,
        symbol: "grass",
        description: description,
      };
      projectId = grassProjectId;
    } else if (nftType === "blade") {
      nftData = {
        attributes: {
          type: "blade",
          grassProjectId: grassProjectId,
          contentId: contentId,
        },
        name: name,
        image: image,
        symbol: "blade",
        description: description,
        externalUrl: bladeaUrl,
      };
      projectId = bladeProjectId;
    } else {
      throw new Error("Not a valid graze nft type");
    }

    return { nftData, projectId };
  } catch (err) {
    throw new Error(err);
  }
};

const burnNft = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);
    const nftId = req.params.nftId;
    const nftType = req.params.type;
    const projectId = nftType === "grass" ? grassProjectId : bladeProjectId;
    const grassId = req.body.grassId ? req.body.grassId : "";
    await burn(projectId, nftId);

    //update grass if blade

    if (nftType === "blade" && grassId) {
      await update(grassProjectId, grassId, "bladeOpened", {
        bladeProjectId: bladeProjectId,
        bladeId: nftId,
      });
    }

    res
      .status(200)
      .json({ msg: "nft burned", nftId: nftId, projectId: projectId });
  } catch (err) {
    console.log("error in burning nft", err);
    res.status(400).json({ msg: "error in burning", err });
  }
};

const burn = async (projectId, nftId) => {
  try {
    console.log(1)
    const burnNFtResponse = await axios.post(
      `${underdogApiEndpoint}/v2/projects/n/${projectId}/nfts/${nftId}/burn`,
      config
    );
        console.log(burnNFtResponse)
    return burnNFtResponse.data;
  } catch (error) {}
};

const fetchAllNFT = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);

    const grassNFTs = await fetchAllNFTApi(grassProjectId);

    const bladeNFTs = await fetchAllNFTApi(bladeProjectId);

    res.status(200).json({ grassNFTs: grassNFTs, bladeNFTs: bladeNFTs });
  } catch (error) {
    console.log("error in fetch all", error);
    res.status(400).json({ msg: "error in nft fetching", error });
  }
};

const fetchAllNFTApi = async (projectId) => {
  try {
    const res = await axios.get(
      `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`,
      config
    );
    return res.data.results;
  } catch (error) {
    throw new Error(error);
  }
};

const dashboard = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);
    const grassDashboard = await fetchAllNFTApi(grassProjectId);

    res.status(200).json({ grassDashboard: grassDashboard });
  } catch (error) {
    console.log("error in dashboard", error);
    res.status(400).json({ msg: "error in dashboard", error });
  }
};

const checkGrass = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);
    const wallet = req.params.wallet;
    const { present, nfts } = await checkNft(grassProjectId, wallet);

    res.status(200).json({ isPresent: present, nfts });
  } catch (error) {
    console.log("error in check grass", error);
    res.status(400).json({ msg: "error in checking", error });
  }
};

const checkBlade = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const wallet = req.params.wallet;
    const contentId = req.params.contentId;

    const bladeFetchaRes = await fetchBlade(bladeProjectId, wallet, contentId);

    res.status(200).json(bladeFetchaRes);
  } catch (error) {
    console.log("error in check grass", error);
    res.status(400).json({ msg: "error in checking", error });
  }
};

const fetchBlade = async (bladeProjectId, wallet, contentId) => {
  try {
    let { present, nfts } = await checkNft(bladeProjectId, wallet);
    const bladeNFT = [];

    if (present) {
      present = false;

      for (let nft of nfts) {
        if (nft.attributes.contentId == contentId) {
          present = true;
          bladeNFT.push(nft);
        }
      }
    }
    return { isPresent: present, nfts: bladeNFT };
  } catch (error) {
    throw new Error(error);
  }
};

const checkNft = async (projectId, wallet) => {
  try {
    const resp = await axios.get(
      `${underdogApiEndpoint}/v2/projects/${projectId}/nfts?ownerAddress=${wallet}`,
      config
    );
    const nfts = [];
    let present = false;
    if (resp.data.results.length > 0) {
      nfts.push(...resp.data.results);
      present = true;
    }
    return { present, nfts };
  } catch (error) {
    console.log('error in checknft', error)
    return {present: false, nfts:[]}
  }
};

const sendBlade = async (req, res) => {
  try {
    if (!checkJson(req.params.projectId)) {
      throw new Error("project id not in format");
    }
    const projects = JSON.parse(req.params.projectId); //[4,3]
    const grassProjectId = projects[1];
    const bladeProjectId = projects[0];
    const nftType = "blade";
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const externalUrl = req.body.externalUrl ? req.body.externalUrl : "";
    const contentId = req.body.contentId ? req.body.contentId : "";

    let { nftData, projectId } = createNFT(
      nftType,
      bladeProjectId,
      grassProjectId,
      name,
      image,
      description,
      externalUrl,
      contentId
    );
    nftData.receiverAddresses = req.body.receiverAddresses;
    const createNftResponse = await axios.post(
      `${underdogApiEndpoint}/v2/projects/c/${projectId}/nfts/batch`,
      nftData,
      config
    );
    res.status(200).json({ msg: "Transfer of nft successful" });
  } catch (error) {}
};

const sendGrass = async (req, res) => {
  try {
    if (!checkJson(req.params.projectId)) {
      throw new Error("project id not in format");
    }
    const projects = JSON.parse(req.params.projectId); //[4,3]
    const grassProjectId = projects[1];
    const bladeProjectId = projects[0];
    const nftType = "grass";
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;

    let { nftData, projectId } = createNFT(
      nftType,
      bladeProjectId,
      grassProjectId,
      name,
      image,
      description,
      "",
      ""
    );
    nftData.receiverAddresses = req.body.receiverAddresses;
    const createNftResponse = await axios.post(
      `${underdogApiEndpoint}/v2/projects/c/${projectId}/nfts/batch`,
      nftData,
      config
    );
    res.status(200).json({ msg: "Transfer of nft successful" });
  } catch (error) {}
};

const fetchStats = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);

    const bladeStats = await axios.get(
      `${underdogApiEndpoint}/v2/projects/${bladeProjectId}/stats`,
      config
    );

    const grassStats = await axios.get(
      `${underdogApiEndpoint}/v2/projects/${grassProjectId}/stats`,
      config
    );

    res
      .status(200)
      .json({ grassStats: grassStats.data, bladeStats: bladeStats.data });
  } catch (error) {
    console.log("error in fetching stats", error);
    res.status(400).json({ msg: "error in fetching stats", error });
  }
};

const fetchProject = async (req, res) => {
  try {
    const bladeProjectId = req.params.projectId;
    const grassProjectId = await fetchGrassProjectId(bladeProjectId);
    const bladeProject = await fetchProjectApi(bladeProjectId);

    const grassProject = await fetchProjectApi(grassProjectId);

    res
      .status(200)
      .json({ grassProject: grassProject, bladeProject: bladeProject });
  } catch (error) {
    console.log("error in fetching project", error);
    res.status(400).json({ msg: "error in fetching project", error });
  }
};

const fetchProjectApi = async (projectId) => {
  try {
    const res = await axios.get(
      `${underdogApiEndpoint}/v2/projects/${projectId}`,
      config
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  fetchProject,
  fetchStats,
  sendGrass,
  sendBlade,
  checkBlade,
  checkGrass,
  dashboard,
  fetchAllNFT,
  burnNft,
  updateGrass,
  fetchSingleNft,
  batchTransferNFT,
  sendNFT,
  listAllProjects,
  createProject,
};
