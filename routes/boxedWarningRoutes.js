const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const { medicine } = req.query;
  try {
    // res.json({ medicine: req.query.medicine });

    const fdaResponse = await axios.get(
      `https://api.fda.gov/drug/label.json?search=boxed_warning:${medicine}`
    );

    console.log(fdaResponse.data.results[0].drug_interactions);

    res.json({ medicine: medicine });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
