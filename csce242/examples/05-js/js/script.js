let count = 0;
let timerId = null;

document.getElementById("btn-start-count").onclick = () => {
    if (timerId !== null) return;

    timerId = setInterval(() => {
        count++;
        document.getElementById("p-count-display").innerHTML = count;
    }, 1000);
};

document.getElementById("btn-pause-count").onclick = () => {
    clearInterval(timerId);
    timerId = null;
};
