import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
import { useRef, useState } from 'react'

const Navbar = () => {
  let Location = useLocation();
  React.useEffect(() => {
    console.log("Location is ", Location);
  }, [Location]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const context = useContext(noteContext);
  const { getUser } = context;
  const userRef = useRef(null);
  const [User, setUser] = useState({ email: "", name: "", id: "", date: "" });
  const handleUser = async () => {
    userRef.current.click();
    const userDetails = await getUser();
    setUser({ email: userDetails.user.email, name: userDetails.user.name, id: userDetails.user._id, date: userDetails.user.date });
  }


  return (
    <div>
      <div>
        <>
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={userRef}
          >
            Launch demo modal
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    User Details
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <ul className="list-group">
                    <li className="list-group-item">Username: {User.name}</li>
                    <li className="list-group-item">Email: {User.email}</li>
                    <li className="list-group-item">id: {User.id}</li>
                    <li className="list-group-item">Date: {User.date.split("T")[0]}</li>
                  </ul>

                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>

      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            iNoteBook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${Location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${Location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        {!localStorage.getItem("token") ? <div className='d-flex ms-auto justify-content-end'>
          <NavLink className="btn btn-primary mx-2 mt-2  " to="/login" role="button">Login </NavLink>
          <NavLink className="btn btn-primary mx-1 mt-2  " to="/signup" role="button">Signup</NavLink>
        </div> : <><i style={{ color: "white", cursor: "pointer" }} className="fa-regular fa-user mx-3" onClick={handleUser} />
          <button className="btn btn-primary mx-2 " onClick={handleLogOut}>Logout</button></>}
      </nav>

    </div>
  )
}

export default Navbar
