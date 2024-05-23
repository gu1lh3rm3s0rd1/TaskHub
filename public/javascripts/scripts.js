// variaveis globais
let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

// calendario
const calendar = document.getElementById("calendar"); // div calendar:
const weekdays = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
]; //array with weekdays:

//funções
//função load() será chamada quando a pagina carregar:
function load() {
  const date = new Date();

  //mudar titulo do mês:
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

  //mostrar mês e ano:
  document.getElementById(
    "monthDisplay"
  ).innerText = `${date.toLocaleDateString("pt-br", {
    month: "long",
  })}, ${year}`;

  calendar.innerHTML = "";

  // criando uma div com os dias:
  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement("div");
    dayS.classList.add("day");

    const dayString = `${month + 1}/${i - paddinDays}/${year}`;

    //condicional para criar os dias de um mês:
    if (i > paddinDays) {
      dayS.innerText = i - paddinDays;

      const eventDay = events.find((event) => event.date === dayString);

      if (i - paddinDays === day && nav === 0) {
        dayS.id = "currentDay";
      }

      if (eventDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventDay.title;
        dayS.appendChild(eventDiv);
      }

      dayS.addEventListener("click", () => openModal(dayString));
    } else {
      dayS.classList.add("padding");
    }

    calendar.appendChild(dayS);
  }
}

// Função para exibir o modal ao clicar na classe .day
function exibirModal() {
  // Seleciona todos os elementos com a classe .day
  document.querySelectorAll(".day").forEach((day) => {
    // Adiciona um event listener de clique a cada elemento
    day.addEventListener("click", function () {
      // Exibe o modal
      $("#myModal").modal("show");
    });
  });
}

// Chame a função para que ela seja executada quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
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
document
  .getElementById("editModal")
  .addEventListener("shown.bs.modal", function () {
    document.getElementById("editForm").style.display = "block";
  });

document
  .getElementById("deleteModal")
  .addEventListener("shown.bs.modal", function () {
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
