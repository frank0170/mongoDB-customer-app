import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, BrowserRouter } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Details from "./components/details";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
