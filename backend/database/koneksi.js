import mongoose from "mongoose";

const DB = `mongodb://martinilham155:wer1234ui@ac-p1s5fuc-shard-00-00.aw1tteh.mongodb.net:27017,ac-p1s5fuc-shard-00-01.aw1tteh.mongodb.net:27017,ac-p1s5fuc-shard-00-02.aw1tteh.mongodb.net:27017/mauliya_bakery?ssl=true&replicaSet=atlas-s1025i-shard-0&authSource=admin&retryWrites=true&w=majority&appName=myServer`;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DATABASE connected"))
  .catch((err) => console.log("Error: " + err.message));
