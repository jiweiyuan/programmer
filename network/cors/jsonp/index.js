const express = require("express");


const app = express();
app.use(express.static(__dirname));


app.listen(99, () => {
    console.log("Server is listening on port 99");
});
