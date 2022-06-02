import React, { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const BMI = lazy(() => import("./BMI"));

function RouteComponent() {
  let navigate = useNavigate();

  useEffect(() => {
    let val = localStorage.getItem("routeSecondTime");
    console.log("val", val);
    if (val) {
      console.log("12345678");
      navigate("/bmi");
    }
  },[]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/bmi" element={<BMI />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default RouteComponent;
