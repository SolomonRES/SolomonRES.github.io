const formatDateMMDDYYYY = (yyyyMmDd) => {
  const parts = yyyyMmDd.split("-");
  if (parts.length !== 3) return "";

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${month}/${day}/${year}`;
};

window.onload = () => {
    
  /* geometry/triangle card click */
  const geometryCard = document.getElementById("card-geometry");
  const triangle = document.getElementById("triangle");

  geometryCard.onclick = () => {
    triangle.classList.toggle("is-hidden");
  };

  /* date change */
  const dateInput = document.getElementById("date-input");
  const dateOutput = document.getElementById("date-output");

  dateInput.onchange = () => {
    if (!dateInput.value) {
      dateOutput.innerHTML = "";
      return;
    }

    const formatted = formatDateMMDDYYYY(dateInput.value);
    dateOutput.innerHTML = `You picked the date: <strong>${formatted}</strong>`;
  };

  /* image frame  */
  const imageFrame = document.getElementById("image-frame");

  imageFrame.onclick = () => {
    imageFrame.classList.toggle("framed");
  };
};
