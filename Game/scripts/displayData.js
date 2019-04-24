let displayedData = new Array();

function updateDisplayedData(textToAdd) {
  console.log(textToAdd)
  if (displayedData.length == 20) {
    displayedData.pop();
    displayedData.unshift(textToAdd);
  } else {
    displayedData.unshift(textToAdd);
  }
  updateDisplay();
}

function updateDisplay() {
  const infoDiv = document.getElementById("info");

  while (infoDiv.firstChild) {
    infoDiv.removeChild(infoDiv.firstChild);
  }

  for(let i = 0; i < displayedData.length; i++) {
    let p = document.createElement("p");
    p.append(displayedData[i]);
    infoDiv.append(p);
  }
}
