const express = require("express");

const A = express();
A.use(express.static(__dirname));
A.listen(100, () => {
    console.log("Server listen on port 100");
});

A.use("/sayWorld", (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:90");
    res.send({content: "world"});
});

// A.use("/sayHello", (req, res) => {
//     const callback = req.query.callback;
//     const data = "world";
//     res.send(`${callback}('${data}')`); // hello('world')
// });
