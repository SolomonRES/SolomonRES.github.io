/* button click example */
document.getElementById("btn-show-message").onclick = () => {
    document.getElementById("p-message").innerHTML = "hello world";
};

/* link click example */ 
document.getElementById("a-click").onclick = (e) => {
    e.preventDefault();             
    e.currentTarget.innerHTML = "The button has been clicked";
};


// start and stop the ball bouncing
document.getElementById("btn-bounce").onclick = (e) => {
    const ball = document.getElementById("ball");

    if(e.currentTarget.innerHTML.toLowerCase() == "start") {
        e.currentTarget.innerHTML = "Stop";
        ball.classList.add("bounce");
    } else {
        e.currentTarget.innerHTML = "Start";
    }
    
}

document.getElementById("txt-num-days").oninput = () => {
    const days = Number(document.getElementById("txt-num-days").value);
    const msg = document.getElementById("p-plant-message");

    if (days <= 0) {
        msg.textContent = "Please enter a positive number of days.";
    } else if (days < 3) {
        msg.textContent = "the plant is growing";
    } else if (days < 6) {
        msg.textContent = "the plant is still growing";
    } else {
        msg.textContent = "the plant is fully grown";
    }
};

document.getElementById("btn-display-donation").onclick = () => {
    const errorP = document.getElementById("p-donation-error");
    errorP.innerHTML = "";

    const donationText = document.getElementById("txt-donation").value;

    if(isNaN(donationText) || donationText <= 0) {
        errorP.innerHTML = "Invalid Amount"
        return;
    } 

    donation = parseInt(donationText);
    const percentGoal = donation / 5000 * 1000;

    document.getElementById("p-donation").innerHTML = 'You have reached ${percentGoal}% of your goal.';


    document.querySelector(":root").computedStyleMap.setProperty("--donation", percentGoal + "%");
}
