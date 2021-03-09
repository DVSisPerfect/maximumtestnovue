//Вносим города в селект
(async () => {
let url = 'https://60254fac36244d001797bfe8.mockapi.io/api/v1/city';
let response = await fetch(url);
let parsed = await response.json(); 
let selectInput = document.querySelector('#selectInput');
    for (let i = 0; i < parsed.length; i++) {
        selectInput.insertAdjacentHTML("beforeend", `<option value=${parsed[i].title}> ${parsed[i].title} </option>`);
    }
})()

//Упрощаем работу с формой 
let form;
document.addEventListener ("DOMContentLoaded", () => {
    form = document.forms.rnd; 
    form.online.addEventListener ("click", disableCity); //Клик на Онлайн
    form.online.addEventListener ("click", checkForm); //Валидация формы
    let radio = document.getElementsByName("radioButt"); //Клик на радио
        for (let button of radio) {
          button.addEventListener ("click", clearTheme); //Очистка другой темы
          button.addEventListener ("click", checkForm); //Валидация формы
        }
    form.otherTheme.addEventListener ("keyup", clearRadio); //Ввод другой темы
    form.otherTheme.addEventListener ("keyup", checkForm); //Валидация формы
    form.problem.addEventListener ("keyup", checkForm); //Валидация формы
    form.addEventListener ('submit', submitForm); //Сабмит формы
})


//Выкл выбор города
function disableCity() {
    form.selectInput.disabled = !form.selectInput.disabled;
}

//Очищаем поле темы
function clearTheme() {
    form.otherTheme.value = "";
}

function clearButt () {
    let radio = document.getElementsByName("radioButt");
        for (let button of radio) {
          button.checked = false;
        }
}
//Очищаем радио-кнопки
function clearRadio() {
    if (form.otherTheme.value !== "") {
        clearButt();
    }
}

//Валидация формы
function checkForm() {
    if ((form.selectInput.value !== "Выберите свой город" || form.online.checked == true) &&
        (form.otherTheme.value !== "" || form.radioButt.value !== "") &&
        form.problem.value !== "") {
            form.submit.disabled = false;
        } else {
            form.submit.disabled = true;
        }
}

//Отправка формы
submitForm = async (e) => {
    e.preventDefault();
    let response = await fetch('https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form', {
      method: 'POST',
      body: new FormData(form)
    });
    let result = await response.json();
    if (result.success) {
        form.online.checked = false;
        form.selectInput.disabled = false;
        clearButt();
        clearTheme();
        form.problem.value = "";
        form.submit.disabled = true;
        showModal();
    } else {
        alert("Ошибка отправки заявки");
    }
  };

function showModal () {
    let modal = document.getElementById("modal");
    let img = document.getElementById("gucci");
    modal.style.display = "block";
    modal.style.top = document.documentElement.clientHeight/2 - img.height/2 + "px";
    modal.style.left = document.documentElement.clientWidth/2 - img.width/2 + "px";
    showCover();
}

function hideModal () {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    hideCover();
}

function showCover() {
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    document.body.style.overflowY = 'hidden';
    document.body.append(coverDiv);
}

function hideCover() {
    document.getElementById('cover-div').remove();
    document.body.style.overflowY = '';
}