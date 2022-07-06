import React from 'react';
import { Divider } from "@mui/material";
import Quiz from "./Components/Quiz/Quiz";

function App() {
  return (
    <React.Fragment>
      <Quiz />
      <Divider />
      <Quiz />
    </React.Fragment>
  );
}

export default App;
