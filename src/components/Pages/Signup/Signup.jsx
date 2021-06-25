import React ,{useState}from "react";
import Navbar from "../Navabr/Navwbar";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Signup.css";
function Signup() {
  const [signupDetails, setsignupDetails] = useState({
    name:"",
    email: "",
    password: "",
  });
  let history = useHistory();
  const onChangeHandler = (e) => {
    let user = signupDetails;
    user[e.target.name] = e.target.value;
    setsignupDetails(user);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/v1/signup/`, { signupDetails })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.data.status==="SUCCESS")
        {
          history.push('/login');
          toast.success(res.data.message);
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
        <Navbar />
      </div>
      <div className="container">
        <Card className="card_reg-frm " style={{ width: "40%" }}>
          <h1 className="frm_reg_txt">Register</h1>
          <Form className="form_reg" onSubmit={onSubmitHandler}>
            <Form.Group controlId="formBasicName">
              <Form.Label
                style={{
                  fontFamily: "'Nixie One', cursive",
                  fontWeight: "bold",
                }}
              >
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                className=""
                style={{ width: "100%" }}
                name="name"
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
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
                name="email"
                onChange={onChangeHandler}
                style={{ width: "100%" }}
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
                name="password"
                onChange={onChangeHandler}
                style={{ width: "100%" }}
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

export default Signup;
