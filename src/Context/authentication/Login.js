import {React,useState } from "react";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.sucsess){
            localStorage.setItem('token',json.authToken);
            
            props.showAlert("Logged in  Successfully","success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }   
    }

    const  myfunction = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={credentials.email}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                    />
                    <input type="checkbox" onClick={myfunction} />Show Password
                </div>
                
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </form>

        </div>
    )
}

export default Login
