import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Managetopic() {
  const [TopicList, setTopicList] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [editingTopicName, setEditingTopicName] = useState("");
  const [questions, setQuestions] = useState([]);
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/deleteTopic/${id}`);
      setTopicList((prevtopicList) =>
        prevtopicList.filter((topic) => topic.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/viewquestion");
      setQuestions(response.data.question);
    } catch (error) {
      // handle error
    }
  };
  
  useEffect(() => {
    getQuestions();
  }, []);
  
  const getQuestionsCount = (topicId) => {
    const filteredQuestions = questions.filter(
      (question) => question.topic === topicId
    );
    return filteredQuestions.length;
  };


  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/searchTopic?q=${searchKeyword}`
      );
      const searchResults = response.data.topics;
      setTopicList(searchResults);
    } catch (error) {
      console.log(error);
    }
  }, [searchKeyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/addTopic",
        {
          tName: newTopic,
        }
      );
      const {id, tName, createdAt} = response.data.topic;
      setTopicList((prevTopicList) => [
        ...prevTopicList,
        {
        id:id,
        name:tName,
        createdAt:moment(createdAt).format("MM/DD/YYYY hh:mm:ss A")}    
      ]);
      setNewTopic("");
     
      
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:2000/api/editTopic/${id}`, {
        tName: editingTopicName,
      });
      setTopicList((prevTopicList) =>
        prevTopicList.map((topic) =>
          topic.id === id
            ? { ...topic, name: editingTopicName }
            : topic
        )
      );
      setEditingTopicId(null);
      setEditingTopicName("");
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = useCallback(() => {
    setTopicList((prevTopicList) =>
      sortOrder === "asc"
        ? [...prevTopicList].sort((a, b) => a.name.localeCompare(b.name))
        : [...prevTopicList].sort((a, b) => b.name.localeCompare(a.name))
    );
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  }, [sortOrder]);

  const getTopics = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/viewTopic"
      );
      const topics = response.data.topic.map((topic) => ({
        id: topic.id,
        name: topic.tName,
        createdAt: moment(topic.createdAt).format("MM/DD/YYYY hh:mm:ss A"),
      }));
      setTopicList(topics);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getTopics();
  }, [getTopics]);

  const filteredTopics = useMemo(() => {
    return TopicList.filter(
      (topic) =>
        topic.name &&
        topic.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [TopicList, searchKeyword]);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="row">
              <div
                className="col-12 col-lg-8 col-xxl-9 d-flex"
                style={{ width: "100%" }}
              >
                <div className="card flex-fill">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Manage Topics</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="input-group mb-3"
                        style={{ width: "45%" }}
                        >
                    
                        <input
                          type="text"
                          className="form-control"
                          placeholder="New Topic"
                          value={newTopic}
                          onChange={(e) => setNewTopic(e.target.value)}
                        
                        />
                        <button className="btn btn-primary" type="submit"
                          >
                          Add
                        </button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-between">
                      <div
                        className="input-group mb-3"
                        style={{ width: "45%" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Topics"
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleSearch}
                        >
                          Search
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleSort}
                        >
                          Sort by Name {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Count</th>
                            <th>Actions</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTopics.map((topic) => (
                            <tr key={topic.id}>
                              {editingTopicId === topic.id ? (
                                <>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Type name"
                                      value={editingTopicName}
                                      onChange={(e) =>
                                        setEditingTopicName(e.target.value)
                                      }
                                    />
                                  </td>
                                  <td></td>
                                  <td>
                                    <button
                                      className="btn btn-success"
                                      onClick={() =>
                                        handleSave(editingTopicId)
                                      }
                                      disabled={!editingTopicName}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-secondary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => {
                                        setEditingTopicId(null);
                                        setEditingTopicName("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                  <td></td>
                                </>
                              ) : (
                                <>
                                  <td>{topic.name}</td>
                                  <td>{topic.createdAt}</td>
                                  <td>{getQuestionsCount(topic.id)}</td>
                    
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleDelete(topic.id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => {
                                        setEditingTopicId(topic.id);
                                        setEditingTopicName(topic.name);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </td>
                                 
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
export default Managetopic;
