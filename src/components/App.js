import React from 'react';
import RouteComponent from './Route';

import {BrowserRouter as Router} from "react-router-dom";
function App() {
  return (
    <Router>
      <RouteComponent/>
    </Router> 
  );
}

export default App;
