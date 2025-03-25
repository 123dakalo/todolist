const olActivityEl = document.querySelector('.ol-activity');
const button = document.querySelector('.btn-add');
const timeEl = document.querySelector('#time');
const appendFuction = document.querySelector('form');
const inputField = document.querySelector('.input');

olActivityEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('clear-activity')) {
        event.target.parentNode.remove();
    }

    saveInfo();
});

appendFuction.addEventListener('submit', function (event) {
    event.preventDefault();

    const valuesIn = inputField.value;
    const timeIn = timeEl.value;
    const deadline = new Date(timeIn).getTime();

    const innerHtml = `
        <li class="li-activity">
            <span class="inside-activity">${valuesIn}</span>
            <span class="countdown" data-deadline="${deadline}">${timeIn}</span>
            <button class="clear-activity">x</button>
        </li>
    `;

    olActivityEl.insertAdjacentHTML('beforeend', innerHtml);

    inputField.value = '';
    timeEl.value = '';

    saveInfo();
    Countdowns();
});

function Countdowns() {
    const countDown = document.querySelectorAll(".countdown");

    countDown.forEach(timeEl =>{
        const targetDate = parseInt(timeEl.dataset.deadline);
        const currentDate = new Date().getTime();
        const timeLeft = targetDate - currentDate;

        if(timeLeft <= 0){

            timeEl.innerHTML = "Times up!";
            timeEl.style.color = "red";
            timeEl.style.fontWeight = "Bold";

        }else{

            const days = Math.floor(timeLeft/1000/60/60/24);
            const hours = Math.floor(timeLeft/1000/60/60) % 24;
            const minutes = Math.floor(timeLeft/1000/60) % 60;
            const seconds = Math.floor(timeLeft/1000) % 60;

            timeEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s `;

            // if (minutes <= 5 && minutes >= 0) {
            //     alert(`Hurry! is about to expire in ${minutes}m !`);
            // }
        }
    });
}
setInterval(Countdowns, 1000);

function saveInfo() {
    localStorage.setItem('data', olActivityEl.innerHTML);
}

function savedInfo() {
    olActivityEl.innerHTML = localStorage.getItem('data') || "";
    Countdowns();
}
savedInfo();

