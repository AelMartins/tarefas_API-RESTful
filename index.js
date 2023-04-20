const express = require("express");
const app = express();
app.use(express.json());

app.listen(8080, () => {
    console.log("O SERVIDOR ESTÁ ATIVO NA PORTA 8080");
})


let tarefa = [];
let tarefa_Id = 0;

app.post('/novaTarefa', (req, res) => {
    const { titulo, descricao } = req.body;
    if (!titulo) {
        return res.status(400).send('ERRO, TÍTULO OBRIGATÓRIO!');
    }
    tarefa_Id += 999
    if(tarefa_Id > 999){
        return res.status(403).send('ATENÇÃO! VOCÊ POSSUÍ MAIS DE 999 TAREFAS, EXCLUA ALGUMAS');
    }
    const novaTarefa = {
        id: tarefa_Id,
        titulo: titulo,
        descricao: descricao,
        concluida: false
    }
    tarefa.push(novaTarefa);
    let print = `<h1> CRIADA TAREFA: "${titulo}" COM ID: "${novaTarefa.id}" </h1>`;
    print += `<h1> DESCRIÇÃO: "${descricao}" </h1>`;
    if (novaTarefa.concluida === false){
        print += `<h1> TAREFA PENDENTE </h1>`;
    } else {
        print += `<h1> TAREFA CONCLUIDA </h1>`;
    }
    res.send(print);
})
