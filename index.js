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
    let print = `CRIADA TAREFA: " ${titulo} " COM ID: " ${novaTarefa.id} " | `;
    print += `DESCRIÇÃO: " ${descricao} " | `;
    if (novaTarefa.concluida === false){
        print += `TAREFA PENDENTE `;
    } else {
        print += `TAREFA CONCLUIDA `;
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
    res.send(`TAREFA ATUALIZADA COM SUCESSO!`);
    console.log(tarefas);
});

app.get('/pegaTarefas', (req, res) => {
    const tarefasString = JSON.stringify(tarefas, null, 2);
    const printHTML = `ESTAS SÃO TODAS AS SUAS TAREFAS: <pre>${tarefasString}</pre>`;
    res.send(printHTML);
})

app.get('/pegaTarefa', (req, res) => {
    const { id } = req.body;
    const pegarTarefa = tarefas.find(callbackTarefa => callbackTarefa.id === id);
    const tarefaString = JSON.stringify(pegarTarefa, null, 2);
    const printHTML = `ESTA É A TAREFA REQUISITADA: <pre>${tarefaString}</pre>`;
    res.send(printHTML);
});