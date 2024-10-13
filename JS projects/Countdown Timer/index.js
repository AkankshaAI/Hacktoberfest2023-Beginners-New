const endDate = "31 October 2023 11:59 PM";
document.getElementById("end-date").innerText = endDate;

const inputs = document.querySelectorAll("input");

function formatTime(timeValue) {
  return Math.floor(timeValue);
}

function clock() {
  const end = new Date(endDate);
  const now = new Date();

  const diff = (end - now) / 1000;
  if (diff < 0) return;

  inputs[0].value = formatTime(diff / 3600 / 24);  // Days
  inputs[1].value = formatTime((diff / 3600) % 24);  // Hours
  inputs[2].value = formatTime((diff / 60) % 60);  // Minutes
  inputs[3].value = formatTime(diff % 60);  // Seconds
}

// Initial call
clock();

setInterval(clock, 1000);
