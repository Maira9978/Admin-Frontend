import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

function Addquestion() {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      topic,
      difficulty,
      category,
      questionContent: question,
      options,
      correctAnswer: correctOption,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:2000/api/uploadQuesList",
        { quesList: [newQuestion] }
      );
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        // extract the error message from the error object
        const errorMessage = error.response.data.message;
        // display the error message in an alert
        alert(errorMessage);
      } else {
        alert("Login Failed");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, categoriesResponse, difficultiesResponse] =
          await Promise.all([
            axios.get("http://localhost:2000/api/viewTopic"),
            axios.get("http://localhost:2000/api/viewcategory"),
            axios.get("http://localhost:2000/api/viewDifficulty"),
          ]);

        const topics = topicsResponse.data.topic.map((topic) => topic.tName);
        setTopics(topics);

        const categories = categoriesResponse.data.category.map(
          (category) => category.cName
        );
        setCategories(categories);

        const difficulties = difficultiesResponse.data.difficulty.map(
          (difficulty) => difficulty.dName
        );
        setDifficulties(difficulties);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        Add Question Statement
                      </h5>
                    </div>
                    <div className="card-body">
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="form-control"
                        rows="2"
                        placeholder="Type your question here..."
                      ></textarea>
                    </div>
                  </div>
                  <br />
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Select Topic</h5>
                    </div>

                    <div className="card-body">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="form-select mb-3"
                      >
                        <option value="">Select a topic</option>

                        {topics.map((topic, index) => (
                          <option key={index} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Select Category</h5>
                    </div>
                    <div className="card-body">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select mb-3"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Select Difficulty</h5>
                    </div>

                    <div className="card-body">
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="form-select mb-3"
                      >
                        <option value="">Select a difficulty</option>
                        {difficulties.map((difficulty, index) => (
                          <option key={index} value={difficulty}>
                            {difficulty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Add Options</h5>
                    </div>
                    <div className="card-body">
                      {options.map((option, index) => (
                        <div key={index} className="input-group mb-3">
                          <span className="input-group-text">{index + 1}</span>
                          <input
                            type="text"
                            className="form-control"
                            value={option}
                            onChange={(e) =>
                              setOptions([
                                ...options.slice(0, index),
                                e.target.value,
                                ...options.slice(index + 1),
                              ])
                            }
                            placeholder={`Option ${index + 1}`}
                          />
                          <div className="input-group-append">
                            <div className="input-group-text">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={correctOption === index.toString()}
                                onChange={() =>
                                  setCorrectOption(index.toString())
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Add Question"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Addquestion;
