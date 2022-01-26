const morgan = require("morgan");
const express = require("express");
const app = express();
const persons = require("./routes/persons");
const info = require("./routes/info");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

morgan.token("body", function (req, res) {
  return req.body ? JSON.stringify(req.body) : "";
});

app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms' :body")
);
app.use(cors());

app.use("/api/persons", persons);
app.use("/info", info);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
