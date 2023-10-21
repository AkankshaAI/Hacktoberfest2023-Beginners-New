const monthYear = document.getElementById('monthYear');
const days = document.getElementById('days');
let date = new Date();

function showCalendar() {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    monthYear.innerHTML = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)} ${date.getFullYear()}`;

    days.innerHTML = '';
    for (let i = 0; i < firstDay; i++) {
        let day = document.createElement('div');
        days.appendChild(day);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement('div');
        day.innerHTML = i;
        day.addEventListener('click', () => {
            day.classList.toggle('selected');
        });
        days.appendChild(day);
    }
}

function prevMonth() {
    date.setMonth(date.getMonth() - 1);
    showCalendar();
}

function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    showCalendar();
}

showCalendar();
