import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";

function Managetopic() {
  const [Topic, setTopic] = useState("");
  const [option, setOption] = useState([]);

  const [questions, setQuestions] = useState([]);
  let options = [];
  const [myid, setIdd] = useState([]);
  const [names, setName] = useState([]);
  const [createdAt, setcreatedAt] = useState([]);
  const [newtopic, setnewtopic] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [topicName, settopicName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [topic, setopic] = useState({ _id: "", tName: "" });
  const [sortBy, setSortBy] = useState("name");
  //const [prevTopics, setPrevTopics] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  // setPrevTopics([...prevTopics, data.topic]);
  const [data, setData] = useState([]);
  //Add new state to hold the topic to be edited

  let x = [];
  let y = [];
  const [sortOrder, setSortOrder] = useState("desc");

  const handledelete = async (id) => {
    console.log("hello there");
  
    axios
      .delete(`http://localhost:2000/api/deleteTopic/${id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (e) => {
    axios
      .post("http://localhost:2000/api/addTopic", {
        tName: newtopic,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    //setDates([...dates, new Date().toLocaleDateString()]);
  };

  /*  const gettopics = async (sortOrder) => {
    axios
      .get("http://localhost:2000/api/viewTopic")
      .then((response) => {
        const sortedData = response.data.topic.sort((a, b) => {
          const nameA = a.tName.toLowerCase();
          const nameB = b.tName.toLowerCase();

          if (nameA < nameB) {
            return sortOrder === "asc" ? -1 : 1;
          } else if (nameA > nameB) {
            return sortOrder === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        });

        const options = [];
        const x = [];
        const y = [];
        const z = [];

        sortedData.forEach((topic) => {
          let dte = moment(topic.createdAt).format("MM/DD/YYYY hh:mm:ss A");
          options.push(topic.id, topic.tName);
          x.push(topic.id);
          y.push(topic.tName);
          z.push(dte);
        });
        setOption(options);
        setIdd(x);
        setName(y);
        setcreatedAt(z);
      })
      .catch((e) => {
        console.log(e);
      });
  }; */
  /*   const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
  gettopics(selectedSortOrder);
  setSortOrder(selectedSortOrder);
  }; */
  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    const sortedOptions = [...options];

    if (sortValue === "asc") {
      sortedOptions.sort((a, b) => a[1].localeCompare(b[1]));
      // y.sort();
      // console.log(y)
    } else if (sortValue === "desc") {
      sortedOptions.sort((a, b) => b[1].localeCompare(a[1]));
    /*   console.log(sortedOptions); */
    }

    setOption(sortedOptions);
  };

  const gettopics = async () => {
    axios
      .get("http://localhost:2000/api/viewTopic")
      .then((response) => {
        const z = [];
        for (let i = 0; i < Object.keys(response.data.topic).length; i++) {
          let dte = moment(response.data.topic[i].createdAt).format(
            "MM/DD/YYYY hh:mm:ss A"
          );
          options.push(response.data.topic[i].id, response.data.topic[i].tName);
          x.push(response.data.topic[i].id);
          y.push(response.data.topic[i].tName);
          z.push(dte);
        }
        setOption(options);
        setIdd(x);
        setName(y);
        setcreatedAt(z);
      })
      .catch((e) => {
        /* console.log(e); */
      });
  };

  /* useEffect(() => { */
  const getQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/viewquestion"
      );
      /*   console.log(response.data) */
      setQuestions(response.data.question);
    } catch (error) {
     /*  console.log(error); */
    }
  };
  /* getQuestions(); */
  /*  }, []); */

  const getQuestionsCount = (topicId) => {
    getQuestions();
/* 
    console.log("t : ", topicId); */

    questions.filter((question) => question.topic);

    const filteredQuestions = questions.filter(
      (question) => question.topic === topicId
    );
    return filteredQuestions.length;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/searchTopic?q=${keyword}`
      );
      const searchResults = response.data.topics;
      setSearchResults(searchResults); // Update the search results state
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(names);
  };

  // useEffect(() => {

  gettopics();

// }, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <div class="row">
              {/*   <div class="col-12 col-lg-8 col-xxl-9 d-flex"> */}
              <div
                class="col-12 col-lg-8 col-xxl-9 d-flex"
                style={{ width: "100%" }}
              >
                <div class="card flex-fill">
                  <div
                    class="card-header"
                    style={{ backgroundColor: "rgb(46, 64, 83)" }}
                  >
                    <h5 class="card-title mb-0" style={{ color: "white" }}>
                      Manage Topics
                    </h5>
                    <hr style={{ width: "100%", margin: "10px 0" }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <input
                        type="text"
                        onChange={(e) => {
                          setnewtopic(e.target.value);
                        }}
                        className="form-control"
                        style={{
                          width: "300px",
                          marginRight: "10px",
                          border: "2px solid #ccc",
                          borderRadius: "4px",
                          padding: "10px",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                        placeholder="Enter Topic"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "4px",
                          background: "#007bff",
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: "400",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "10px", // added margin to the right
                        }}
                      >
                        Add
                      </button>
                      <input
                        type="text"
                        onChange={(e) => {
                          setKeyword(e.target.value);
                        }}
                        className="form-control"
                        style={{
                          width: "300px",
                          marginRight: "10px",
                          border: "2px solid #ccc",
                          borderRadius: "4px",
                          padding: "10px",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                        placeholder="Search"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSearch}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "4px",
                          background: "#007bff",
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: "400",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "10px", // added margin to the right
                        }}
                      >
                        Search
                      </button>
                      <select
                        onChange={handleSortChange}
                        style={{
                          width: "200px",
                          height: "40px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                          padding: "10px",
                          fontSize: "16px",
                          fontWeight: "400",
                          marginLeft: "10px",
                          verticalAlign: "middle",
                          zIndex: "9999",
                          color: "#333",
                        }}
                      >
                        <option
                          value=""
                          style={{ padding: "5px 0", fontSize: "14px" }}
                        >
                          Sort
                        </option>
                        <option
                          value="asc"
                          style={{ padding: "5px 0", fontSize: "14px" }}
                        >
                          Sort A-Z
                        </option>
                        <option
                          value="desc"
                          style={{ padding: "5px 0", fontSize: "14px" }}
                        >
                          Sort Z-A
                        </option>
                      </select>
                    </div>
                  </div>
                  <table class="table table-hover my-0">
                    <thead>
                      <tr>
                        <th style={{ fontWeight: "bold" }}>Topic</th>
                        <th style={{ fontWeight: "bold" }}>Delete</th>
                        <th style={{ fontWeight: "bold" }}>Edit</th>
                        <th style={{ fontWeight: "bold" }}>Count</th>
                        <th style={{ fontWeight: "bold" }}>CreatedAt</th>
                       

                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.length > 0
                        ? searchResults.map((result) => (
                            <tr key={result.id}>
                              {/* <td>{result.id}</td> */}
                              <td>{result.tName}</td>
                              <td>
                                <button
                                  style={{ marginBottom: 10, marginTop: 10 }}
                                  className="btn btn-primary"
                                  id={result.id}
                                  onClick={() => handledelete(result.id)}
                                >
                                  Delete
                                </button>
                              </td>
                              <td>
                                <button
                                  style={{ marginBottom: 10, marginTop: 10 }}
                                  className="btn btn-primary"
                                >
                                  Edit
                                </button>
                              </td>
                              <td></td>
                              <td>
                                {moment(result.createdAt).format(
                                  "MM/DD/YYYY hh:mm:ss A"
                                )}
                              </td>
                            </tr>
                          ))
                        :  myid.map((item, k) => (
                            <tr key={item}>
                              <td>{names[k]}</td>
                              <td>
                                <button
                                  style={{ marginBottom: 10, marginTop: 10 }}
                                  type="submit"
                                  className="btn btn-primary"
                                  id={item}
                                  onClick={() => handledelete(item)}
                                >
                                  Delete{" "}
                                </button>
                              </td>

                              <td>
                                <button
                                  style={{ marginBottom: 10, marginTop: 10 }}
                                  className="btn btn-primary"
                                >
                                  Edit
                                </button>
                              </td>
                              <td>{getQuestionsCount(item)}</td>
                              <td>{createdAt[k]}</td>
                            </tr>
                            
                          ))}
                          
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Managetopic;


