const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(errorHandler);

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use("/api/v1", routes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Pharmacy ERP API Running"
    });
});

module.exports = app;