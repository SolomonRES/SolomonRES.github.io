// element references
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");
const navItems = document.querySelectorAll(".nav-item");
const exercise1 = document.getElementById("exercise1");
const exercise2 = document.getElementById("exercise2");
const minutesRange = document.getElementById("minutes-range");
const rangeValue = document.getElementById("range-value");
const rangeMessage = document.getElementById("range-message");
const currentTimeEl = document.getElementById("current-time");
const countdownMessage = document.getElementById("countdown-message");
const refreshBtn = document.getElementById("refresh-btn");

// mobile menu toggle
menuToggle.addEventListener("click", function () {
  navList.classList.toggle("show");
  menuToggle.classList.toggle("open");
});

// nav item click, switch exercises
navItems.forEach(function (item) {
  item.addEventListener("click", function () {
    // update active class
    navItems.forEach(function (nav) {
      nav.classList.remove("active");
    });
    item.classList.add("active");

    const exercise = item.getAttribute("data-exercise");

    if (exercise === "1") {
      exercise1.classList.remove("hidden");
      exercise2.classList.add("hidden");
    } else {
      exercise2.classList.remove("hidden");
      exercise1.classList.add("hidden");
      updateCountdown();
    }

    // close mobile menu after picking
    navList.classList.remove("show");
    menuToggle.classList.remove("open");
  });
});

// exercise 1: how many minutes until class?

function getSliderMessage(minutes) {
  if (minutes > 45) {
    return "🐿️ baby squirrels still asleep; go make breakfast.";
  } else if (minutes >= 30) {
    return "☕ squirrels haven't woken up yet; coffee sounds about right.";
  } else if (minutes >= 15) {
    return "🌰 squirrels are being fed milk; you should probably leave.";
  } else {
    return "🚨 bridge is up and a squirrel's in the class; you're late";
  }
}

function updateSliderMessage() {
  const minutes = parseInt(minutesRange.value);
  rangeValue.textContent = minutes;
  rangeMessage.textContent = getSliderMessage(minutes);
}

minutesRange.addEventListener("input", updateSliderMessage);

// initialize on load
updateSliderMessage();

// exercise 2: countdown till class (8:30 am)

function updateCountdown() {
  const now = new Date();
  const classTime = new Date();
  classTime.setHours(8, 30, 0, 0);

  // positive = class hasn't started, negative = already started
  const diffMs = classTime - now;
  const diffMin = Math.round(diffMs / 60000);

  // show current time
  const hours = now.getHours();
  const mins = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMins = mins < 10 ? "0" + mins : mins;
  currentTimeEl.innerHTML =
    "Current time: <strong>" +
    displayHours +
    ":" +
    displayMins +
    " " +
    ampm +
    "</strong> - Class starts at <strong>8:30 AM</strong>";

  let message;

  if (diffMin > 15) {
    message =
      "🐿️ 15+ min; squirrels still napping; go back to bed";
  } else if (diffMin > 10) {
    message =
      "🌉 10-15 min; no construction on the bridge, leave soon-ish";
  } else if (diffMin > 5) {
    message =
      "🐿️ 5-10 min; a squirrel just took your keys; good luck with that";
  } else if (diffMin > 0) {
    message =
      "🚗 under 5 min; bridge is blocked, squirrel in the road, it's over";
  } else if (diffMin >= -5) {
    message =
      "⏰ missed it by ~5 min; the squirrels beat you; sneak in quietly";
  } else if (diffMin >= -15) {
    message =
      "🌉 up to 15 min late; bridge's are crazy";
  } else {
    message =
      "🐿️ 15+ min late; squirrels already took more notes than you, email portia";
  }

  countdownMessage.textContent = message;
}

refreshBtn.addEventListener("click", updateCountdown);
