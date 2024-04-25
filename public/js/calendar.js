document.querySelectorAll('.dia-calendario').forEach(cell => {
    cell.addEventListener('click', function () {
        const selectedDate = this.getAttribute('data-date');
        document.getElementById('data').value = selectedDate; // Fill the date field in the form

        // Bootstrap modal show method
        $('#myModal').modal('show');
    });
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function carregarTarefas() {
    fetch('/tarefas')
        .then(response => response.json())
        .then(data => {
            const listaTarefas = document.getElementById('listaTarefas');
            listaTarefas.innerHTML = '';
            const ul = document.createElement('ul');
            ul.classList.add('list-group');

            data.forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `
          <h5 class="mb-1">${tarefa.titulo}</h5>
          <p class="mb-1">${tarefa.descricao}</p>
          <small>Data: ${new Date(tarefa.data).toLocaleDateString()}</small><br>
          <small>Status: ${tarefa.status}</small>
          <button onclick="editarTarefa('${tarefa._id.$oid}')" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editModal">Editar</button>
          <button onclick="deletarTarefa('${tarefa._id.$oid}')" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">Deletar</button>
        `;
                ul.appendChild(li);
            });

            listaTarefas.appendChild(ul);
        })
        .catch(error => console.error('Erro ao carregar tarefas:', error));
}

window.onload = carregarTarefas;

// Função para atualizar uma tarefa
async function atualizarTarefa(id, titulo, descricao, data, status) {
    try {
        await fetch(`/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo,
                descricao,
                data,
                status
            })
        });
        carregarTarefas(); // Recarregar tarefas após atualização
        var editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.hide();
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
}

// Função para deletar uma tarefa
async function deletarTarefa(id) {
    try {
        await fetch(`/tarefas/${id}`, {
            method: 'DELETE'
        });
        carregarTarefas(); // Recarregar tarefas após exclusão
        var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.hide();
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
}

// Adicionar evento de submit para o formulário de edição
document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const titulo = document.getElementById('editTitulo').value;
    const descricao = document.getElementById('editDescricao').value;
    const data = document.getElementById('editData').value;
    const status = document.getElementById('editStatus').value;
    atualizarTarefa(id, titulo, descricao, data, status);
});

// Adicionar evento de submit para o formulário de deleção
document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;
    deletarTarefa(id);
});





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function paginaAnterior() {
    var url = new URL(window.location.href);
    var page = parseInt(url.searchParams.get("page") || 1);
    if (page > 1) {
        url.searchParams.set("page", page - 1);
        window.location.href = url.toString();
    }
}

function proximaPagina() {
    var url = new URL(window.location.href);
    var page = parseInt(url.searchParams.get("page") || 1);
    url.searchParams.set("page", page + 1);
    window.location.href = url.toString();
}