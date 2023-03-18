import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FcQuestions } from "react-icons/fc";
import { MdTopic } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GiLevelEndFlag } from "react-icons/gi";
import "react-datetime/css/react-datetime.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Main() {
  
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/viewquestion"
      );
       console.log(response.data) 
      setQuestions(response.data.question);
    } catch (error) {
     /*  console.log(error); */
    }
  };
  getQuestions()
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="row">
            <div className="col-xl-6 col-xxl-5 d-flex">
              <div className="w-100">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Questions</h5>
                          </div>

                          <div className="col-auto">
                            <div className="stat text-primary">
                              <i
                                className="align-middle"
                                data-feather="truck"
                              ></i>
                              <FcQuestions />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3">17</h1>
                        <div className="mb-0">
                          <span className="text-danger">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                            -3.65%{" "}
                          </span>
                          <span className="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Topics</h5>
                          </div>

                          <div className="col-auto">
                            <div className="stat text-primary">
                              <i
                                className="align-middle"
                                data-feather="users"
                              ></i>
                              <MdTopic />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3">6</h1>
                        <div className="mb-0">
                          <span className="text-success">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i> 5.25%{" "}
                          </span>
                          <span className="text-muted"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Types</h5>
                          </div>

                          <div className="col-auto">
                            <div className="stat text-primary">
                              <i
                                className="align-middle"
                                data-feather="dollar-sign"
                              ></i>
                              <BiCategory />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3">4</h1>
                        <div className="mb-0">
                          <span className="text-success">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i> 6.65%{" "}
                          </span>
                          <span className="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Difficulty</h5>
                          </div>

                          <div className="col-auto">
                            <div className="stat text-primary">
                              <i
                                className="align-middle"
                                data-feather="shopping-cart"
                              ></i>
                              <GiLevelEndFlag />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3">3</h1>
                        <div className="mb-0">
                          <span className="text-danger">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                            -2.25%{" "}
                          </span>
                          <span className="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="col-xl-6 col-xxl-7">
							<div class="card flex-fill w-100">
								<div class="card-header">
									<h5 class="card-title mb-0">Calender</h5>
								</div>
								<div class="card-body py-3">
									
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        nowIndicator={true}
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                      /> 
									
								</div>
							</div>
						</div>
         
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
