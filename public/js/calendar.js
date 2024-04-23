document.addEventListener('DOMContentLoaded', function () {
    const days = document.querySelectorAll('.day');
    const modal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('taskForm');

    days.forEach(day => {
        day.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskDescription = document.getElementById('taskDescription').value;
        console.log('Tarefa adicionada: ' + taskDescription);
        modal.style.display = 'none';
        // Adicione a tarefa ao banco de dados ou a uma lista de tarefas aqui
    });
});
