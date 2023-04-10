const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const pkg = require("./package.json");

async function routes(app, options) {
    // makes a proxy request to aoc for the input requested in the url
    app.get("/inputs/:year/:day", async (req, res) => {
    const { year, day } = req.params;
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const options = {
      method: "get",
      headers: {
        credentials: "include",
        "Content-Type": "text/plain",
        cookie: process.env.SESSION_TOKEN,
        "User-Agent": `node/${process.version} ${pkg.name}/${pkg.version}`,
      },
    };
    // TODO: implement caching
    const response = await fetch(url, options);
    const content = await response.text();
    fs.writeFile(`./data/${year}${day}.in`, content, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.send({ input: content });
  });
  app.get("/", async (req, res) => {
    const stream = fs.createReadStream('./index.html');
    res.type('text/html').send(stream);
    return res;
  });
}

module.exports = routes;
