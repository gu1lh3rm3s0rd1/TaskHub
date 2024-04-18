document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        dateClick: function (info) {
            // Abre o modal para adicionar tarefas na data clicada
            openTaskModal(info.dateStr);
        },
        eventClick: function (info) {
            // Abre o modal para editar a tarefa clicada
            editTask(info.event);
        }
    });

    calendar.render();
});

function openTaskModal(date) {
    document.getElementById('date').value = date;
    document.getElementById('taskId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('taskFormModal').style.display = 'block';
}

function editTask(event) {
    document.getElementById('date').value = event.startStr;
    document.getElementById('taskId').value = event.id;
    document.getElementById('title').value = event.title;
    document.getElementById('description').value = event.extendedProps.description;
    document.getElementById('taskFormModal').style.display = 'block';
}
