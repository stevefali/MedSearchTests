const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const { medicine, interactor } = req.query;
  try {
    const fdaResponse = await axios.get(
      `https://api.fda.gov/drug/label.json?search=boxed_warning:${medicine}`
    );

    console.log(fdaResponse.data.results[0].drug_interactions);

    res.json({
      medicine: medicine,
      interactor: interactor || "Interactor is empty!",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
