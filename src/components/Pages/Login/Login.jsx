import {React,useState} from "react";
import Navwbar from "../Navabr/Navwbar";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
function Login() {
  const [signinDetails, setsigninDetails] = useState({
    email: "",
    password: "",
  });
  let history = useHistory();
  const onChangeHandler = (e) => {
    let user = signinDetails;
    user[e.target.name] = e.target.value;
    setsigninDetails(user);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(signinDetails);
    axios.post(`http://localhost:5000/api/v1/signin/`, { signinDetails })
  .then(res => {
    console.log(res);
    console.log(res.data);
    console.log(res.status);
    if(res.data.status==="SUCCESS")
    {
      axios.get(`http://localhost:5000/api/v1/vieworder/`).then((response) => {
        toast.info(response.data.message);
        localStorage.setItem("Order_details", JSON.stringify(response.data));
      });
      console.log(res.data.validation);
      toast.success(res.data.message);
      localStorage.setItem('userDetails', JSON.stringify(res.data));
      setTimeout(()=>history.push('/logisticslist'),5000);
      
    }
    else
    {
      toast.error(res.data.message);
    }
  })
    return;        
  }
  return (
    <div>
      <div>
        <Navwbar />
      </div>
      <div className="container">
        <Card className="card_lgin-frm " style={{ width: "40%" }}>
          <h1 className="frm_login_txt">Login</h1>
          <Form className="form_login" onSubmit={onSubmitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label
                style={{
                  fontFamily: "'Nixie One', cursive",
                  fontWeight: "bold",
                }}
              >
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="email_frm"
                style={{ width: "100%" }}
                name="email"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label
                style={{
                  fontFamily: "'Nixie One', cursive",
                  fontWeight: "bolder",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="pass_frm"
                style={{ width: "100%" }}
                name="password"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                fontFamily: "'Nixie One', cursive",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
