import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
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
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [difficulty, setdifficulty] = useState([]);
  const [users, setusers] = useState([]);
  
  const getQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/viewquestion");
      setQuestions(response.data.question);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/viewcategory");
      console.log(response.data.category)
      setCategories(response.data.category);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getTopics = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/viewTopic");
      console.log(response.data.topic)
      setTopics(response.data.topic);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getdifficulty = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/viewDifficulty");
      console.log(response.data.difficulty)
      setdifficulty(response.data.difficulty);
    } catch (error) {
      console.log("Error:", error);
    }
  };

 /*  const getusers = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/users");
      console.log(response.data.user)
      setusers(response.data.user);
    } catch (error) {
      console.log("Error:", error);
    }
  }; */
  useEffect(() => {
    getQuestions();
    getCategories();
    getTopics ();
    getdifficulty();
   /*  getusers(); */
  }, []);
  const getTotalQuestionsCount = () => {
    return questions.length;
  };

  const getTotalCategoryCount = () => {
    return categories.length;
  };
  const getTotalTopicCount = () => {
    return topics.length;
  };
  const getTotaldifficultyCount = () => {
    return difficulty.length;
  };
 /*  const getusersCount = () => {
    return users.length;
  }; */
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
                            <h5 className="card-title">Total Questions</h5>
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
                        <h1 className="mt-1 mb-3"> {getTotalQuestionsCount()}</h1>
                        <div className="mb-0">
                          <span className="text-danger">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                            {" "}
                          </span>
                         {/*  <span className="text-muted">Since last week</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Total Categories</h5>
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
                        <h1 className="mt-1 mb-3">{getTotalCategoryCount()}</h1>
                        <div className="mb-0">
                          
                          <span className="text-muted"></span>
                        </div>
                      </div>


                      
                    </div>
                    
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Total Users</h5>
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
                        <h1 className="mt-1 mb-3">{}</h1>
                        <div className="mb-0">
                          
                          <span className="text-muted"></span>
                        </div>
                      </div>


                      
                    </div> */}

                  </div>
                  
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Total Topics</h5>
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
                        <h1 className="mt-1 mb-3">{getTotalTopicCount()}</h1>
                        <div className="mb-0">
                          {/* <span className="text-success">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i> 6.65%{" "}
                          </span> */}
                          {/* <span className="text-muted">Since last week</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Total Levels</h5>
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
                        <h1 className="mt-1 mb-3">{getTotaldifficultyCount()}</h1>
                        <div className="mb-0">
                          {/* <span className="text-danger">
                            {" "}
                            <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                            -2.25%{" "}
                          </span>
                          <span className="text-muted">Since last week</span> */}
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xl-6 col-xxl-7">
      <div className="card flex-fill w-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Calendar</h5>
        </div>
        <div className="card-body py-3">
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
