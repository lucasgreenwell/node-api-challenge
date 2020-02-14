const express = require('express');
const cors = require("cors");

const server = express();
const actionsRouter = require('./actionsRouter')
const projectsRouter = require('./projectsRouter')

server.use(express.json());
server.use(cors());

server.use('/actions', actionsRouter)
server.use('/projects', projectsRouter)

server.get("/", (req, res) => {
    res.send(`
      <h2>This is one awesome home page!</h>
      <p>Gotta love that home page, amirite?</p>
    `);
  });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});