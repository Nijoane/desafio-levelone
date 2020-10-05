const express = require('express');
const { uuid,  } = require('uuidv4');

const app = express();

app.use(express.json());

const cadastros = [];

app.get('/cadastros', (request, response) => {
    const { name } = request.query

    const results = name
        ? cadastros.filter(cadastro => cadastro.name.includes(name))
        : cadastros;

    return response.json(results);
});

app.post('/cadastros', (request, response) => {
    const { name, email, phone} = request.body;

    const cadastro = { id: uuid(), name, email, phone };

    cadastros.push(cadastro)

    return response.json(cadastro);
});

app.put('/cadastros/:id', (request, response) => {
    const { id } = request.params;
    const { name, email, phone} = request.body;
    
    const cadastroIndex = cadastros.findIndex(cadastro => cadastro.id == id);

    if (cadastroIndex < 0){
        return response.status(400).json({ error: "Register not found!" });
    };

    const cadastro = {
        id,
        name,
        email,
        phone
    };

    cadastros[cadastroIndex] = cadastro;

    return response.json(cadastro);
});

app.delete('/cadastros/:id', (request, response) => {
    const { id } = request.params;

    const cadastroIndex = cadastros.findIndex(cadastro => cadastro.id == id);

    if (cadastroIndex < 0){
        return response.status(400).json({ error: "Register not found!" });
    };

    cadastros.splice(cadastroIndex, 1);

    return response.status(204).send();
});


app.listen(3333, () => {
    console.log("Back-end started!")
});