
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/noteState';
import Login from './Context/authentication/Login';
import Signup from './Context/authentication/Signup';
import Alert from './components/Alert';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar />
    <Alert alert={alert} />
      <Routes>
        <Route exact path="/" element ={<Home showAlert={showAlert}/>} />
         <Route exact path="/about" element ={<About/>} /> 
        <Route exact path="/login" element ={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element ={<Signup showAlert={showAlert}/>} />
      </Routes>
      
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
