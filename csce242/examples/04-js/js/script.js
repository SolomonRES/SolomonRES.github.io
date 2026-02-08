/* button click example */
document.getElementById("btn-show-message").onclick = () => {
    document.getElementById("p-message").innerHTML = "hello world";
};

/* link click example */ 
document.getElementById("a-click").onclick = (e) => {
    e.preventDefault();             
    e.currentTarget.innerHTML = "The button has been clicked";
};

