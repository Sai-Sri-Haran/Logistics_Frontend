import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./components/Pages/Signup/Signup";
import Login from "./components/Pages/Login/Login";
import LogisticsOrderList from "./components/Pages/LogisticsOrderList/LogisticsOrderList";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navwbar from "./components/Pages/Navabr/Navwbar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRouter from "./components/Pages/Protected";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <title>Dash Logistics</title>
        <Switch>
          <Route exact path="/" component={Navwbar}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Signup}></Route>
          <ProtectedRouter exact path="/logisticslist" component={LogisticsOrderList}/>
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
