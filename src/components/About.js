import React from 'react'



const About = () => {

  return (
    <>



      <div>
        <div className='container col-md-10 col-sm-12' style={{ marginBottom: "20px" }}>
          <div className="card glass">
            <div className="card-body">
              <h5 style={{ textAlign: "center" }} className="card-title"><strong>About iNoteBook</strong></h5>
              <p className="card-text">Welcome to iNotebook, your ultimate digital companion for storing and managing personal notes securely in the cloud. Designed with convenience and security in mind, iNotebook ensures you never lose your important notes by storing them safely online, eliminating the risks of local storage failures.

                At iNotebook, we prioritize your privacy and data security. Your credentials are safeguarded using advanced encryption techniques, ensuring that your passwords remain secure and undisclosed—even to us! Whether you're jotting down ideas, organizing tasks, or keeping a journal, iNotebook provides a seamless, reliable, and user-friendly experience.</p>
            </div>
          </div>

        </div>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">

              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width={800}
                height={400}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >

                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#777" />
                <text
                  x="50%"
                  y="50%"
                  fill="white"
                  dy=".3em"
                  textAnchor="middle"
                  fontSize="24"
                  fontFamily="Arial, sans-serif"
                >
                  Why Choose iNotebook?
                </text>
              </svg>
              <div className="carousel-caption  d-md-block">
                <h5>Cloud-Based Storage:</h5>
                <p>Access your notes anytime, anywhere, on any device. No more worries about losing data due to device failure or accidental deletion.</p>
              </div>
            </div>
            <div className="carousel-item">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width={800}
                height={400}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Second slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#666" />
                <text
                  x="50%"
                  y="50%"
                  fill="white"
                  dy=".3em"
                  textAnchor="middle"
                  fontSize="24"
                  fontFamily="Arial, sans-serif"
                >
                  Why Choose iNotebook?
                </text>
              </svg>
              <div className="carousel-caption d-none d-md-block">
                <h5>Enhanced Security:</h5>
                <p>Your personal information is protected with state-of-the-art encryption, giving you peace of mind.</p>
              </div>
            </div>
            <div className="carousel-item">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width={800}
                height={400}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Third slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#555" />
                <text
                  x="50%"
                  y="50%"
                  fill="white"
                  dy=".3em"
                  textAnchor="middle"
                  fontSize="24"
                  fontFamily="Arial, sans-serif"
                >
                  Why Choose iNotebook?
                </text>
              </svg>
              <div className="carousel-caption d-none d-md-block">
                <h5>User-Friendly Interface: </h5>
                <p> Designed to help you focus on your thoughts, iNotebook keeps everything organized and easily accessible.</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>


      </div>

    </>

  )
}

export default About
