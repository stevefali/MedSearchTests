const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const getBoxedWarningEndpoint = require("../utils/networkUtils.js");
const getInteractorMatch = require("../search/interactorSearch.js");

router.get("/", async (req, res) => {
  const { medicine, interactor } = req.query;
  try {
    const fdaResponse = await axios.get(getBoxedWarningEndpoint(medicine));

    console.log(fdaResponse.data.results[0].drug_interactions[0]);

    const resultString = fdaResponse.data.results[0].drug_interactions[0];

    const matches = getInteractorMatch(resultString, interactor);

    res.json({
      medicine: medicine,
      interactor: interactor || "Interactor is empty!",
      matches: matches,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
