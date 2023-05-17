import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const Blank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const fileData = () => {
    if (selectedFile) {
      return (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">{selectedFile.name}</h5>
            <p className="card-text">File type: {selectedFile.type}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">No file selected</h5>
          </div>
        </div>
      );
    }
  };

  const onFileUpload = async () => {
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".txt")) {
        setErrorMessage("Only TXT files are allowed");
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("myFile", selectedFile, selectedFile.name);
      try {
        const response = await axios.post(
          "http://localhost:2000/api/parser",
          formData
        );
        console.log(response.data);
        setNumQuestions(response.data.length); // update numQuestions with the number of questions uploaded
        setErrorMessage(""); // Clear any previous error messages
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error uploading file");
        }
      }
      setIsLoading(false);
    } else {
      setErrorMessage("No file selected");
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage("");
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6 mx-auto">
                <div className="card mt-5">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "rgb(46, 64, 83)" }}
                  >
                    <h5 className="card-title mb-0" style={{ color: "white" }}>
                      Upload Questions
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control-file"
                        onChange={onFileChange}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={onFileUpload}
                        disabled={isLoading}
                      >
                        {isLoading ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                </div>
                {fileData()}

                {numQuestions > 0 && (
                  <div className="card mt-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        Number of questions uploaded: {numQuestions}
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Blank;
