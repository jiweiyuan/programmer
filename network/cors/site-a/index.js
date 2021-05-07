const express = require("express");

const A = express();
A.use(express.static(__dirname));
A.listen(90, () => {
    console.log("Server listen on port 90");
});

A.use("/hello", (req, res) => {
    res.json({msg: "hello world"});
});

