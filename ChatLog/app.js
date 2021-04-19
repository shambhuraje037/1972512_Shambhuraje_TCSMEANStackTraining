let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let bodyParser = require("body-parser");

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let TextSchema = mongoose.Schema({
  user: String,
  message: String,
});

let Message = mongoose.model("", TextSchema, "ChatLog");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat", (messageObj) => {
    mongoose.connect(url, mongooseDbOption);
    let db = mongoose.connection;
    db.on("error", (err) => console.log(err));

    db.once("open", () => {
      let data = new Message({
        user: messageObj.user,
        message: messageObj.message,
      });

      data.save((err, result) => {
        if (!err) {
          console.log("Stored in the database ChatLog: " + result + "\n");
        } else {
          console.log("Error!!!");
        }
        mongoose.disconnect();
      });
    });
  });
});

http.listen(9898, () => console.log("Running server on port 9898 \n"));