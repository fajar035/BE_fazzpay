require("dotenv").config();

const express = require("express");
const routers = require("./src/routers/index");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const logger = morgan(
  // ":method : url :status :res[content-length] - :response-time ms"
  // ":method :url :status :response-time ms - :res[content-length]"
  ":method :url :status :res[content-length] - :response-time ms"
);
const host = "http://localhost:";
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: [process.env.HOSTLOCAL, process.env.HOSTDEPLOY],
  allowedHeaders: ["x-access-token", "content-type"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(routers);

server.listen(port, () => {
  console.log(`Server running at ${host}${port}`);
});
