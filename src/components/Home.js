import { Link,useNavigate } from "react-router-dom";
import {useEffect} from 'react';

function Home() {
// import { useHistory } from "react-router-dom";
let navigate = useNavigate();

useEffect(() => {
//   let val = localStorage.getItem("routeSecondTime");
//   console.log("val", val);
//   if (val) {
//     console.log("12345678");
//     navigate("/bmi");
//   }
console.log("home mount")
},[]);
  return (
    <div className="app">
      <div className="center">
        <p>
          The Body Mass Index (BMI) Calculator can be used to calculate BMI
          value and corresponding weight status while taking age into
          consideration.
        </p>
        <Link to="/bmi">Calculate BMI</Link>
        <div>
          <p>BMI Categories:</p>
          <p>Underweight = &lt;18.5</p>
          <p>Normal weight = 18.5–24.9</p>
          <p>Overweight = 25–29.9</p>
          <p>Obesity = BMI of 30 or greater</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
