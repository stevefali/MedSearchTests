const express = require("express");
const app = express();

const axios = require("axios");
const cors = require("cors");

const PORT = 8080;

const boxedWarningRoutes = require("./routes/boxedWarningRoutes");

app.use(cors());
app.use(express.json());

app.use("/warning", boxedWarningRoutes);

app.listen(PORT, () => {
  console.log(`MedSearchTests server running on port ${PORT}`);
});
