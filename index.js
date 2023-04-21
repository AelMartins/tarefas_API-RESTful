const express = require("express");
const app = express();
app.use(express.json());

app.listen(8080, () => {
    console.log("O SERVIDOR ESTA ATIVO NA PORTA 8080");
})


let tarefas = [];
let tarefa_Id = 0;

app.post('/novaTarefa', (req, res) => {
    const { titulo, descricao } = req.body;
    if (!titulo) {
        return res.status(400).send(`ERRO, TÍTULO OBRIGATÓRIO!`);
    }
    tarefa_Id += 1
    if(tarefa_Id > 999){
        return res.status(403).send(`ATENÇÃO! VOCÊ POSSUÍ MAIS DE 999 TAREFAS, EXCLUA ALGUMAS`);
    }
    const novaTarefa = {
        id: tarefa_Id,
        titulo: titulo,
        descricao: descricao,
        concluida: false
    }
    tarefas.push(novaTarefa);
    let print = `<h1> CRIADA TAREFA: " ${titulo} " COM ID: " ${novaTarefa.id} " </h1>`;
    print += `<h1> DESCRIÇÃO: " ${descricao} " </h1>`;
    if (novaTarefa.concluida === false){
        print += `<h1> TAREFA PENDENTE </h1>`;
    } else {
        print += `<h1> TAREFA CONCLUIDA </h1>`;
    }
    res.send(print);
})

app.put('/concluirTarefa/:id', (req, res) => {
    const { id } = req.params;
    const tarefaEncontrada = tarefas.find(callbackTarefa => callbackTarefa.id === parseInt(id));
    if (!tarefaEncontrada) {
        return res.status(404).send(`TAREFA COM ID " ${id} " NÃO ENCONTRADA!`);
    }
    tarefaEncontrada.concluida = true;
    res.send(`A TAREFA " ${tarefaEncontrada.titulo} " COM ID " ${tarefaEncontrada.id} " FOI CONCLUÍDA!`);
})

app.put('/desconcluirTarefa/:id', (req, res) => {
    const { id } = req.params;
    const tarefaEncontrada = tarefas.find(callbackTarefa => callbackTarefa.id === parseInt(id));
    if (!tarefaEncontrada) {
        return res.status(404).send(`TAREFA COM ID " ${id} " NÃO ENCONTRADA!`);
    }
    tarefaEncontrada.concluida = false;
    res.send(`A TAREFA " ${tarefaEncontrada.titulo} " COM ID " ${tarefaEncontrada.id} " FOI DESCONCLUÍDA!`);
})

app.put('/atualizarTarefa', (req, res) => {
    const { id, titulo, descricao } = req.body;
    const atualizarTarefa = tarefas.find(callbackTarefa => callbackTarefa.id === id);
    if (!atualizarTarefa) {
        return res.status(404).send(`A TAREFA COM ID " ${id} " NÃO ENCONTRADA!`);
    }
    atualizarTarefa.titulo = titulo;
    atualizarTarefa.descricao = descricao;
    res.send(`<h1> TAREFA ATUALIZADA COM SUCESSO! </h1>`);
    console.log(tarefas);
});