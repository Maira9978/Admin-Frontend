import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import moment from "moment";

function Edit() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // fetch question data from API
    const fetchData = async () => {
      const response = await axios.get("API_URL_HERE");
      setQuestion(response.data.question);
      setOptions(response.data.options);
      setCorrectAnswer(response.data.correctAnswer);
      setTopic(response.data.topic);
      setDifficulty(response.data.difficulty);
      setCategory(response.data.category);
    };
    fetchData();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit edited question data to API
    axios.put("API_URL_HERE", {
      question,
      options,
      correctAnswer,
      topic,
      difficulty,
      category,
    })
    .then(response => {
      // handle successful response
    })
    .catch(error => {
      // handle error response
    });
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <h1>Edit Question</h1>
          <form onSubmit={handleSubmit}>
            <label>Question Content:</label>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(index, event.target.value)
                  }
                />
              </div>
            ))}
            <label>Correct Answer:</label>
            <select
              value={correctAnswer}
              onChange={(event) => setCorrectAnswer(event.target.value)}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label>Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
            <label>Difficulty:</label>
            <input
              type="text"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            />
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            <button type="submit">Save Changes</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Edit;
