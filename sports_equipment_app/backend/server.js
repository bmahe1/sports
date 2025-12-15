const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow frontend (for now allow all)
app.use(cors());
app.use(express.json());

const products = require("./products.json");

// ✅ API route
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ EB-required port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
