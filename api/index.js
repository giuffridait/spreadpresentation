const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../public/deck.html"), "utf8");

module.exports = (req, res) => {
  const auth = req.headers["authorization"];

  if (auth) {
    const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
      .toString()
      .split(":");
    if (user === "demo" && pass === "spr34dd3m0") {
      res.setHeader("Content-Type", "text/html");
      return res.end(html);
    }
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="Spreadshirt AI Strategy"');
  res.statusCode = 401;
  res.end("Authentication required");
};
