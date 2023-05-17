import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
function Profile() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("dataKey"));
    if (items) {
      setItems(items);
      console.log("I'm User data of navbar", items.user.firstName);
    }
  }, []);
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="container-fluid p-0">
              <div className="mb-3">
                <h1 className="h3 d-inline align-middle">Profile</h1>
                <a
                  className="badge bg-dark text-white ms-2"
                  href="upgrade-to-pro.html"
                ></a>
              </div>
              <div className="row">
                <div className="col-md-4 col-xl-3">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Profile Details</h5>
                    </div>
                    <div className="card-body text-center">
                      <img
                      
                        src="vendor/img/avatars/mair.jpeg"
                        alt="Charles Hall"
                        className="img-fluid rounded-circle mb-2"
                        width="132"
                        height="132"
                      />
                      <h5 className="card-title mb-0">
                        {items === null ? (
                          <span className="text-dark">user</span>
                        ) : (
                          <span className="text-dark">
                            {items.user.firstName}
                          </span>
                        )}
                        {items === null ? (
                          <span className="text-dark">user</span>
                        ) : (
                          <span className="text-dark">
                            {items.user.lastName}
                          </span>
                        )}
                      </h5>
                      <div className="text-muted mb-2">Admin</div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                      <h5 className="h6 card-title">Skills</h5>
                      <a href="#" className="badge bg-primary me-1 my-1">
                        HTML
                      </a>
                      <a href="#" className="badge bg-primary me-1 my-1">
                        JavaScript
                      </a>
                      <a href="#" className="badge bg-primary me-1 my-1">
                        React
                      </a>
                      <a href="#" className="badge bg-primary me-1 my-1">
                        UI
                      </a>
                      <a href="#" className="badge bg-primary me-1 my-1">
                        UX
                      </a>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                      <h5 className="h6 card-title">Email</h5>
                      <ul className="list-unstyled mb-0">
                        {items === null ? (
                          <span className="text-dark">user</span>
                        ) : (
                          <span className="text-dark">{items.user.email}</span>
                        )}
                      </ul>
                    </div>
                    {/*  <hr className="my-0" /> */}
                  </div>
                </div>

                <div className="col-md-8 col-xl-9">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">About</h5>
                    </div>
                    <div className="card-body h-100">
                      <p>
                        Programmers’ Battle is a game based mobile application
                        that will facilitate the students and help them overcome
                        their programming level difficulties and boost their
                        confidence. Its main purposes are to facilitate first
                        year students at FAST-NU and to provide a competitive
                        and interactive means for students to practice
                        programming.{" "}
                      </p>
                      <p>
                        • Every year, students at FAST-NUCES encounter
                        programming challenges which is the eventual cause of
                        their loss of motivation.
                      </p>
                      <p>
                        • Dire need for a game to assess the students with
                        respect to their agility to solve a problem and the
                        correctness of their answer to provide rewards according
                        to their skill-level.
                      </p>
                      <p>
                        • During the semester, students are in a constant need
                        for self-assessment.
                      </p>
                      <p>
                        • Game’s offline mode can become of a potential use to
                        students when they want to supplement their programming
                        concepts without the fear of losing absolutes.
                      </p>
                      {/* <img src="C:\Users\User\Desktop\New folder (3)\myproject\public\xyz.jpeg" alt="description of image" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
