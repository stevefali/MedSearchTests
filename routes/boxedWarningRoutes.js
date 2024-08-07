const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const getBoxedWarningEndpoint = require("../utils/networkUtils.js");
const getInteractorMatch = require("../search/interactorSearch.js");

router.get("/", async (req, res) => {
  const { medicine, interactor } = req.query;
  try {
    const fdaResponse = await axios.get(getBoxedWarningEndpoint(medicine));

    const resultObj = fdaResponse.data.results[0];

    let resultString = resultObj.drug_interactions[0];

    const matches = getInteractorMatch(resultString, interactor);

    res.json({
      medicine: medicine,
      interactor: interactor || "Interactor is empty!",
      matches: matches,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: `No results found for medicine named ${medicine}.` });
  }
});

router.get("/mult", async (req, res) => {
  const medicines = ["tacrolimus", "amoxicillin", "ozempic", "ursodiol"];
  const { interactor } = req.query;

  const fdaCalls = [];
  for (const medicine of medicines) {
    fdaCalls.push(async () => {
      try {
        return {
          medicine: medicine,
          resp: await axios.get(getBoxedWarningEndpoint(medicine)),
        };
      } catch (error) {
        return {
          medicine: medicine,
          resp: false,
        };
      }
    });
  }

  const fdaResponses = await Promise.allSettled(
    fdaCalls.map((fdaCall) => fdaCall())
  );

  const interactionsResponse = [];
  const noneFound = `No interactions with ${interactor} found.`;

  for (const fdaResponse of fdaResponses) {
    let medName = fdaResponse.value.medicine;
    if (fdaResponse.value.resp) {
      const matches = getInteractorMatch(
        fdaResponse.value.resp.data.results[0].drug_interactions[0],
        interactor
      );
      interactionsResponse.push({
        medicine: medName,
        matches: matches.length > 0 ? matches : noneFound,
      });
    } else {
      interactionsResponse.push({
        medicine: medName,
        matches: noneFound,
      });
    }
  }

  res.json({
    interactionsResponse,
    disclaimer: "Disclaimer here",
  });
});

module.exports = router;
