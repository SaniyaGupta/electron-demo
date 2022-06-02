const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
let bmiVal = "Calc BMI";
let toggleWindow = (event) => {
  ipcRenderer.send("toggle-window");
};

ipcRenderer.on("bmi", (event, arg) => {
  bmiVal = arg ? arg : "Calc BMI";
});

ipcRenderer.on("show-hide", (event, arg) => {
  if (arg === "show") {
    const bmi = document.createElement("div");
    bmi.setAttribute("id", "bmi");
    bmi.innerHTML = bmiVal;
    var toggle = document.getElementById("toggle");
    toggle.appendChild(bmi);
    document.getElementById("cross").remove()
  } else {
    const image = document.createElement("img");
    image.src ="crossIcon.png"
    image.width="40";
    image.height="40";
    image.setAttribute("id", "cross");
    const toggle = document.getElementById("toggle");
    toggle.appendChild(image);
    document.getElementById("bmi").remove()
  }
});
