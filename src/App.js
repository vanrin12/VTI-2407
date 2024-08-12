import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import AccountListContainer from "./containers/AccountListContainer";
function App() {

  return (
    <div className="container-fluid">
      <div className="row">
        <AccountListContainer />
      </div>
    </div>
  );
}
export default App;
