const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "../public/deck.html"), "utf8");

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };

function checkAuth(req) {
  const auth = req.headers["authorization"];
  if (!auth) return false;
  const [user, pass] = Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
  return user === "demo" && pass === "spr34dd3m0";
}

module.exports = (req, res) => {
  if (!checkAuth(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Spreadshirt AI Strategy"');
    res.statusCode = 401;
    return res.end("Authentication required");
  }

  const ext = path.extname(req.url.split("?")[0]);
  if (MIME[ext]) {
    const filePath = path.join(__dirname, "../public", req.url.split("?")[0]);
    try {
      const file = fs.readFileSync(filePath);
      res.setHeader("Content-Type", MIME[ext]);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.end(file);
    } catch {
      res.statusCode = 404;
      return res.end("Not found");
    }
  }

  res.setHeader("Content-Type", "text/html");
  res.end(html);
};
