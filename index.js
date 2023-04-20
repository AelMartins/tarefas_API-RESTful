const express = require("express");
const app = express();
app.use(express.json());

app.listen(8080, () => {
    console.log("O SERVIDOR ESTÁ ATIVO NA PORTA 8080");
})