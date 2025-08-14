const clientes = document.getElementById("listaClientes");

fetch("https://crudcrud.com/api/1a916dbc84ef46af9e4132a137145c10/clientes")
.then(resposta => resposta.json())
.then(listaDeClientes => {
    listaDeClientes.forEach(cliente => {
        const item = document.createElement("li");
        item.innerHTML = `
            <span class="cadastroCliente">
               <span>${cliente.nome_cliente}</span>
               <p id="emailCadastrado">${cliente.email_cliente}</p>
            </span>
            <button onclick="remove('${cliente._id}')">
                X
            </button>
        `;
        clientes.appendChild(item);
    });
})
.catch(error => console.error("Erro ao carregar clientes:", error));

function addCliente() {

    const nomeCliente = document.getElementById("nome").value;
    const emailCliente = document.getElementById("email").value;


    fetch("https://crudcrud.com/api/1a916dbc84ef46af9e4132a137145c10/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome_cliente: nomeCliente, email_cliente: emailCliente})
    })
    .then(resposta => resposta.json())
    .then((cliente) => {
        const item = document.createElement("li");
        item.innerHTML = `
            <span class="cadastroCliente">
               <span>${cliente.nome_cliente}</span>
               <p id="emailCadastrado">${cliente.email_cliente}</p>
            </span>
            <button onclick="remove('${cliente._id}')">
                X
            </button>
        `;
        clientes.appendChild(item);
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";

        alert("Cliente adicionado com sucesso!");
    })
    .catch(error => console.error("Erro ao adicionar cliente:", error));
};

function remove(id) {
    fetch(`https://crudcrud.com/api/1a916dbc84ef46af9e4132a137145c10/clientes/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        // Encontra o botão que foi clicado e, em seguida, o item da lista pai
        const itemParaRemover = document.querySelector(`button[onclick="remove('${id}')"]`).closest('li');

        // Remove o item da lista
        if (itemParaRemover) {
            itemParaRemover.remove();
            alert("Cliente removido com sucesso!");
        }
    })
    .catch(error => console.error("Erro ao remover a tarefa:", error));
}