// variaveis globais
let nav = 0;
let clicked = null;


// variavel do modal:
const newEvent = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');


// calendario
const calendar = document.getElementById("calendar");
const weekdays = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];


// traz as tarefas do banco de dados
async function fetchTarefas() {
  try {
    const response = await fetch('/tarefas');
    const tarefas = await response.json();
    console.log('Tarefas:', tarefas);
    return tarefas;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
}


//funções
//função load() será chamada quando a pagina carregar:
async function load() {
  const tarefas = await fetchTarefas();
  const date = new Date();

  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMonth = new Date(year, month, 1);

  const dateString = firstDayMonth.toLocaleDateString("pt-br", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddinDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

  console.log('Data atual:', date);
  console.log('Número de dias no mês:', daysMonth);
  console.log('Primeiro dia do mês:', firstDayMonth);

  calendar.innerHTML = "";

  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement("div");
    dayS.classList.add("day");

    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i - paddinDays).padStart(2, '0')}`;

    if (i > paddinDays) {
      dayS.innerText = i - paddinDays;

      if (i - paddinDays === day && nav === 0) {
        dayS.id = "currentDay";
      }

      const taskDate = `${String(i - paddinDays).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
      console.log('Data da tarefa:', taskDate);

      const [dayy, monthy, yeary] = taskDate.split('/');
      // Reorganizar os componentes e usar hífen como separador
      const formattedDate = `${yeary}-${monthy}-${dayy}`;
      console.log('Data da tarefaa:', formattedDate);

      if (tarefas.some(tarefa => tarefa.data === formattedDate)) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        dayS.appendChild(eventDiv);
      }

      dayS.setAttribute("data-date", dayString);
      dayS.addEventListener('click', () => exibirModal(dayString));
      console.log('Dia adicionado:', dayString);
    } else {
      dayS.classList.add('padding');
    }

    calendar.appendChild(dayS);
  }
}


// botao hoje
document.getElementById("currentDate").addEventListener("click", function() {
  nav = 0; // Reset navigation to current month
  load();
});


// funcao para exibir o modal ao clicar na classe .day
function exibirModal() {
  document.querySelectorAll(".day").forEach((day) => {
    day.addEventListener("click", function () {
      const dataClicada = this.getAttribute("data-date");
      console.log('Data clicada:', dataClicada);
      document.getElementById("data").value = dataClicada;
      $("#myModal").modal("show");
    });
  });
}


// chama a função para que ela seja executada quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  buttons();
  load();
  exibirModal();
});


// botões
function buttons() {
  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });
}
buttons();
load();


// display dos modais com botao
document.getElementById("editModal").addEventListener("shown.bs.modal", function () {
    document.getElementById("editForm").style.display = "block";
});


document.getElementById("deleteModal").addEventListener("shown.bs.modal", function () {
    document.getElementById("deleteForm").style.display = "block";
});


// traz os dados da tarefa selecionada
// edit
document.addEventListener("DOMContentLoaded", function () {
  var editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var id = this.getAttribute("data-id");
      var titulo = this.getAttribute("data-titulo");
      var descricao = this.getAttribute("data-descricao");
      var data = this.getAttribute("data-data");
      var status = this.getAttribute("data-status");

      document.getElementById("editId").value = id;
      document.getElementById("editTitulo").value = titulo;
      document.getElementById("editDescricao").value = descricao;
      document.getElementById("editData").value = data;
      document.getElementById("editStatus").value = status;
    });
  });
});


// delete
document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var id = this.getAttribute("data-id");
      document
        .getElementById("deleteForm")
        .querySelector('input[name="id"]').value = id;
    });
  });
});


// menu tarefas
// sort valores
document.addEventListener("DOMContentLoaded", function () {
  const tarefasContainer = document.getElementById("divtarefas");

  function sortTarefas(tarefas, criteria) {
    return tarefas.sort((a, b) => {
      if (criteria === "nomeAZ") {
        return a
          .querySelector(".card-header")
          .innerText.localeCompare(b.querySelector(".card-header").innerText);
      } else if (criteria === "nomeZA") {
        return b
          .querySelector(".card-header")
          .innerText.localeCompare(a.querySelector(".card-header").innerText);
      } else if (criteria === "data") {
        const dataA = parseDate(a.querySelector("small.card-text").innerText);
        const dataB = parseDate(b.querySelector("small.card-text").innerText);
        return dataB - dataA; // Ordena em ordem decrescente
      }
    });
  }

  // converte a string de data no formato dd/MM/yyyy em um objeto date
  function parseDate(dateString) {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Os meses são indexados a partir de zero
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  // funcao para tarefas ordenadas
  function renderTarefas(tarefas) {
    tarefasContainer.innerHTML = "";
    tarefas.forEach((tarefa) => tarefasContainer.appendChild(tarefa));
  }

  // Adiciona eventos de clique nos botões de ordenação
  document.querySelectorAll("#divFiltro button").forEach((button) => {
    button.addEventListener("click", () => {
      const sortCriteria = button.getAttribute("data-sort");
      const tarefas = Array.from(tarefasContainer.children);
      const sortedTarefas = sortTarefas(tarefas, sortCriteria);

      renderTarefas(sortedTarefas);
    });
  });
});