import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
        const navigate = useNavigate();
        const onChange = (e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value});
        }
    
        const handleSubmit = async(e)=>{
            e.preventDefault();
            const response = await fetch("http://localhost:5000/api/auth/createUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
            })
            const json = await response.json();
            console.log(json);
            if(json.sucsess){
                localStorage.setItem('token',json.authToken);
                navigate("/");
                props.showAlert("Account created Successfully","success");
            }
            else{
                props.showAlert("Invalid Credentials","danger");
            }
    
        }
        const myFunction = () => {
            var x = document.getElementById("password");
            var y = document.getElementById("cpassword");
            if (x.type === "password" && y.type === "password") {
                x.type = "text";
                y.type = "text";
            } else {
                x.type = "password";
                y.type = "password";
            }
        }
  return (
    <div>
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={credentials.name}
                        aria-describedby="emailHelp"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
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
                        required
                        minLength="5"
                    />
                    <input type="checkbox" onClick={myFunction} />Show Password
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        value={credentials.cpassword}
                        onChange={onChange}
                        required
                        minLength="5"
                    />
                    <input type="checkbox" onClick={myFunction} />Show Password
                </div>
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </form>
    </div>
  )
}

export default Signup
