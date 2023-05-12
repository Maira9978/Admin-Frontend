import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewQuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    topic: "",
    category: "",
    difficulty: "",
    keyword: "",
  });
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingQuestionContent, setEditingQuestionContent] = useState("");
  const [editingQuestionTopic, setEditingQuestionTopic] = useState("");
  const [editingQuestionCategory, setEditingQuestionCategory] = useState("");
  const [editingQuestionDifficulty, setEditingQuestionDifficulty] =
    useState("");

  const { topic, category, difficulty, keyword } = filters;

  useEffect(() => {
    const fetchData = async () => {
      const [
        questionsResponse,
        difficultiesResponse,
        categoriesResponse,
        topicsResponse,
      ] = await Promise.all([
        axios.get("http://localhost:2000/api/viewquestion"),
        axios.get("http://localhost:2000/api/viewDifficulty"),
        axios.get("http://localhost:2000/api/viewcategory"),
        axios.get("http://localhost:2000/api/viewTopic"),
      ]);

      const questions = questionsResponse.data.question;
      const difficulties = difficultiesResponse.data.difficulty.reduce(
        (map, { _id, dName }) => map.set(_id, dName),
        new Map()
      );
      const categories = categoriesResponse.data.category.reduce(
        (map, { _id, cName }) => map.set(_id, cName),
        new Map()
      );
      const topics = topicsResponse.data.topic.reduce(
        (map, { _id, tName }) => map.set(_id, tName),
        new Map()
      );

      setQuestions(questions);
      setDifficulties(difficulties);
      setCategories(categories);
      setTopics(topics);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("hi");
      const response = await axios.delete(
        `http://localhost:2000/api/deleteQuestion/${id}`
      );
      console.log({ response });
      const newQuestions = questions.filter((q) => q.id !== id);
      console.log({ newQuestions });
      setQuestions(newQuestions);
    } catch (error) {
      console.log("err");
      console.log(error);
    }
  };

  const handleFiltersChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.value,
    }));
  };
  const filteredQuestions = questions.filter((q) => {
    if (topic && q.topic !== topic) return false;
    if (category && q.category !== category) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    if (
      keyword &&
      !q.questionContent.toLowerCase().includes(keyword.toLowerCase())
    )
      return false;
    return true;
  });

  const handleSave = async (id) => {
    console.log("Editing question ID:", id);
    try {
      await axios.put(`http://localhost:2000/api/editQuestion/${id}`, {
        questionContent: editingQuestionContent,
        topic: editingQuestionTopic,
        category: editingQuestionCategory,
        difficulty: editingQuestionDifficulty,
      });
      setQuestions((prevQuestionList) =>
        prevQuestionList.map((question) =>
          question._id === id
            ? {
                ...question,
                questionContent: editingQuestionContent,
                topic: editingQuestionTopic,
                category: editingQuestionCategory,
                difficulty: editingQuestionDifficulty,
              }
            : question
        )
      );
      setEditingQuestionId(null);
      setEditingQuestionContent("");
      setEditingQuestionTopic("");
      setEditingQuestionCategory("");
      setEditingQuestionDifficulty("");
    } catch (error) {
      console.log(error);
    }
  };

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
                    <h5 className="card-title mb-0">View Question Bank</h5>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Topic</label>
                        <select
                          name="topic"
                          className="form-select"
                          onChange={handleFiltersChange}
                        >
                          <option value="">All</option>
                          {[...topics.values()].map((tName) => (
                            <option key={tName} value={tName}>
                              {tName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Category</label>
                        <select
                          name="category"
                          className="form-select"
                          onChange={handleFiltersChange}
                        >
                          <option value="">All</option>
                          {[...categories.values()].map((cName) => (
                            <option key={cName} value={cName}>
                              {cName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Difficulty</label>
                        <select
                          name="difficulty"
                          className="form-select"
                          onChange={handleFiltersChange}
                        >
                          <option value="">All</option>
                          {[...difficulties.entries()].map(([dId, dName]) => (
                            <option key={dId} value={dName}>
                              {dName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Keyword</label>
                        <input
                          name="keyword"
                          type="text"
                          className="form-control"
                          placeholder="Search by question content"
                          onChange={handleFiltersChange}
                        />
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            {/*  <th scope="col">Question ID</th> */}
                            <th scope="col">Question Content</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Category</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredQuestions.map((q) => (
                            <tr key={q._id}>
                              {editingQuestionId === q._id ? (
                                <>
                                  <td>
                                    <textarea
                                      rows="5"
                                      cols="23"
                                      value={editingQuestionContent}
                                      onChange={(e) =>
                                        setEditingQuestionContent(
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <select
                                      className="form-select"
                                      value={editingQuestionTopic}
                                      onChange={(e) =>
                                        setEditingQuestionTopic(e.target.value)
                                      }
                                    >
                                      <option value="">
                                        -- Select a topic --
                                      </option>
                                      {Array.from(topics).map(([id, name]) => (
                                        <option key={id} value={id}>
                                          {name}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      className="form-select"
                                      value={editingQuestionCategory}
                                      onChange={(e) =>
                                        setEditingQuestionCategory(
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="" >
                                        -- Select a category --
                                      </option>
                                      {Array.from(categories).map(
                                        ([id, name]) => (
                                          <option key={id} value={id}>
                                            {name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      className="form-select"
                                      value={editingQuestionDifficulty}
                                      onChange={(e) =>
                                        setEditingQuestionDifficulty(
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">
                                        -- Select a difficulty --
                                      </option>
                                      {Array.from(difficulties).map(
                                        ([id, name]) => (
                                          <option key={id} value={id}>
                                            {name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-success"
                                      onClick={() => handleSave(q._id)}
                                      disabled={
                                        !editingQuestionContent ||
                                        !editingQuestionTopic ||
                                        !editingQuestionCategory
                                      }
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-secondary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => {
                                        setEditingQuestionId(null);
                                        setEditingQuestionContent("");
                                        setEditingQuestionTopic("");
                                        setEditingQuestionCategory("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>
                                    <textarea rows="5" cols="23" readOnly>
                                      {q.questionContent}
                                    </textarea>
                                  </td>
                                  <td>{topics.get(q.topic)}</td>
                                  <td>{categories.get(q.category)}</td>
                                  <td>{difficulties.get(q.difficulty)}</td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleDelete(q._id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => {
                                        setEditingQuestionId(q._id);
                                        setEditingQuestionContent(
                                          q.questionContent
                                        );
                                        setEditingQuestionTopic(q.topic);
                                        setEditingQuestionCategory(q.category);
                                        setEditingQuestionDifficulty(
                                          q.difficulty
                                        );
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

export default ViewQuestionBank;
