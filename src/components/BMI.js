import React, { useState,useEffect } from "react";
const electron=window.require('electron')
const ipcRenderer=electron.ipcRenderer;

function BMI() {
    useEffect(()=>{
        let val=localStorage.getItem('routeSecondTime');
        console.log("bmi---",val)
        if(!val){
          localStorage.setItem('routeSecondTime',true)
        }
console.log("bmi mount")

    },[])

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [measureType, setMeasureType] = useState("standard");

  let passDataToCloseWindow=(bmi)=>{
    ipcRenderer.send('bmi-data',bmi);
  }
  let calcBmi = (event) => {
    //prevent submitting
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Please enter a valid weight and height");
    } else {
      let bmi;

      if (measureType === "metric") {
        bmi = (weight / height / height) * 10000;
      } else {
        bmi = (weight / (height * height)) * 703;
      }
      bmi=bmi.toFixed(1)
      passDataToCloseWindow(bmi)
      setBmi(bmi);

      // Logic for message

      if (bmi < 25) {
        setMessage("You are underweight");
      } else if (bmi >= 25 && bmi < 30) {
        setMessage("You are a healthy weight");
      } else {
        setMessage("You are overweight");
      }
    }
  };

 
  const calculateAgain=(event)=>{
      event.preventDefault()
    setBmi(0);
    setWeight(0);
    setHeight(0);
    passDataToCloseWindow(0)
  }

  const selectMeasureType = (event) => {
    setMeasureType(event.target.value);
    calculateAgain();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <div onChange={selectMeasureType}>
          <input
            className="radio-width"
            type="radio"
            value="standard"
            name="standard"
            checked={measureType === "standard"}
            readOnly
          />{" "}
          Standard
          <input
            className="radio-width"
            type="radio"
            value="metric"
            name="metric"
            checked={measureType === "metric"}
            readOnly
          />{" "}
          Metric
        </div>

        <form onSubmit={calcBmi}>
          <div>
            <label>
              Weight ({measureType === "standard" ? "pounds" : "kg"}){" "}
            </label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height ({measureType === "standard" ? "in" : "cm"}) </label>
            <input
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={calculateAgain} type="submit">
              Calculate Again
            </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default BMI;
