const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const products = require("./products.json");

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
