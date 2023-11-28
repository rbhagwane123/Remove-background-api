const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello i am live");
});

app.post("/api/remove", (req, res) => {
  const imageURL = req.body.image;
  request.post(
    {
      url: "https://api.remove.bg/v1.0/removebg",
      formData: {
        image_url: imageURL,
        size: "auto",
      },
      headers: {
        "X-Api-Key": "qvMA9jypasrrpSr2oVckKc4g",
      },
      encoding: null,
    },
    function (error, response, body) {
      if (error)
        return console.error(
          "Request failed because Invalid URL or file",
          error
        );
      if (response.statusCode != 200)
        return console.log(
          "Error: ",
          request.statusCode,
          body.toString("utf8")
        );
      const bufferData = Buffer.from(body, "base64");
      res.contentType("image/png");
      res.send(bufferData);
      //fs.writeFileSync("./transparent-image/removed.png", body);
    }
  );
});

app.listen(port, () => {
  console.log("I am live again");
});
