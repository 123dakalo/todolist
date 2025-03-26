const olActivityEl = document.querySelector('.ol-activity');
const appendFunction = document.querySelector('form');
const inputField = document.querySelector('.input');
const timeEl = document.querySelector('#time');

olActivityEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('clear-activity')) {
        event.target.closest('.li-activity').remove();
        saveInfo();
    }
});

appendFunction.addEventListener('submit', function (event) {
    event.preventDefault();

    const valuesIn = inputField.value;
    const timeIn = timeEl.value;

    const deadline = new Date(timeIn).getTime(); 

    const innerHtml = `
        <li class="li-activity">
            <div class="topHolder">
                <span class="inside-activity">${valuesIn}</span>
                <button class="clear-activity">x</button>
            </div>
            <div class="bottomHolder">
                <span class="countdown" data-deadline="${deadline}">${timeIn}</span>
            </div>
        </li>
    `;

    olActivityEl.insertAdjacentHTML('beforeend', innerHtml);

    inputField.value = '';
    timeEl.value = '';

    saveInfo();
    Countdowns();
});

function Countdowns() {
    const countDownEls = document.querySelectorAll(".countdown");

    countDownEls.forEach(timeEl => {
        const targetDate = Number(timeEl.dataset.deadline); 
        const currentDate = new Date().getTime();
        const timeLeft = targetDate - currentDate;

        if (timeLeft <= 0) {
            timeEl.innerHTML = "Time's up!";
            timeEl.style.color = "red";
            timeEl.style.fontWeight = "bold";
            timeEl.style.fontSize = "1rem";
        } else {
            const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
            const hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
            const minutes = Math.floor(timeLeft / 1000 / 60) % 60;
            const seconds = Math.floor(timeLeft / 1000) % 60;

            timeEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
