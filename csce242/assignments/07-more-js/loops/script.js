const container = document.getElementById("bubble-container");
const bubbleCount = 50;
const driftClasses = ["drift-1", "drift-2", "drift-3"];

// bubbles for loop
for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // random horizontal position (10% to 90% to stay inside the "water")
  const xPos = Math.random() * 80 + 10;
  bubble.style.left = xPos + "%";

  // random bubble size between 4px and 14px
  const size = Math.random() * 10 + 4;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  // random animation duration between 3s and 7s
  const duration = Math.random() * 4 + 3;
  bubble.style.animationDuration = duration + "s";

  // stagger start times so they don't all appear at once
  const delay = Math.random() * 6;
  bubble.style.animationDelay = delay + "s";

  // random drift pattern 
  const drift = driftClasses[Math.floor(Math.random() * driftClasses.length)];
  bubble.classList.add(drift);

  container.appendChild(bubble);
}
