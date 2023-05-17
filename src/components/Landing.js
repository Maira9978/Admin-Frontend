import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { classnames } from "../utils/general";

import useKeyPress from "../hooks/useKeyPress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";

const cpp = `// Write your code here..`;

const Landing = () => {
    const min =2;
const max = 15;
const difficulty="hard";
const category="dry run's";


  const [code, setCode] = useState(cpp);
//   const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  // const [difficulty, setDifficulty] = useState("");
  // const [difficulties, setDifficulties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [question, setQuestion] = useState("");
  // const [category, setCategory] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [noOfInputs, setNoOfInputs] = useState(0);
  const [inputVal, setInputVal] = useState("");
  // const theme = "cobalt";
  const language = {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
  };
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  function generateOptions(correctOption) {
    const options = [];
    const variance = 20; // adjust this to change how close the options are to the correct answer
    const min = Math.max(0, correctOption - variance);
    const max = Math.min(100, correctOption + variance);
    options.push(correctOption.toString()); // Convert the correct option to a string
    while (options.length < 4) {
      const randomOption = Math.floor(Math.random() * (max - min + 1) + min);
      const randomOptionString = randomOption.toString(); // Convert the random option to a string
      if (!options.includes(randomOptionString)) {
        options.push(randomOptionString);
      }
    }
    // shuffle the options using the Fisher-Yates algorithm
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }
  

  const SubmitDryRun = async () => {
    if(outputDetails?.status?.description==="Accepted"){
    const newQuestion = {
      topic,
      difficulty,
      noOfInputs,
      inputVal: inputVal,
      category,
      questionContent: code,
      options,
      correctAnswer: correctOption,
    };
    console.log(newQuestion);
  

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:2000/api/uploadQuesList",
        { quesList: [newQuestion] }
      );
      console.log(response);
       showSuccessToast(`Question has uploaded to Database Successfully!`);
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
  }
  else{
    console.log("Compilation Failed");
  

}
  };



  const handleCompile = () => {

    console.log("Num of Inputs: ", noOfInputs)
    console.log("Selected Topic: ", topic)
    console.log("Code: ", typeof code)
    

    let customInput="";

    for (let i = 0; i < noOfInputs; i++) {
      
        const randomInput = Math.floor(Math.random() * (max - min + 1)) + min;
        customInput += randomInput.toString() + " "; // Convert number to string and concatenate with a space
      }

      console.log("Input field: ",   customInput)
      setInputVal(customInput);

    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "325b1818cbmsh79d7df717caa493p16deb8jsn23c86701c7ae",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "325b1818cbmsh79d7df717caa493p16deb8jsn23c86701c7ae",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        


        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data:  ",response.data?.status?.description);
        

        if(response.data?.status?.description==="Accepted"){
          console.log("OUTPUT: ",atob(response.data.stdout));
         
          setCorrectOption(Number(atob(response.data.stdout)));
          const genOptions = generateOptions(Number(atob(response.data.stdout)));
          setOptions(genOptions);

         
          await SubmitDryRun();
        }
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse] =
          await Promise.all([
            axios.get("http://localhost:2000/api/viewTopic"),
          ]);

        const topics = topicsResponse.data.topic.map((topic) => topic.tName);
        setTopics(topics);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    // <>
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />

        <main className="content">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* <form onSubmit={SubmitDryRun}> */}
          {/* <form > */}

          <div className="row">
             <div className="col-12 col-lg-6">
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


              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Number of inputs</h5>
                </div>

                <div className="card-body">
                            <input
                    type="number"
                    id="numInputs"
                    className="form-control"
                    value={noOfInputs}
                    onChange={(e) => setNoOfInputs(e.target.value)}
                    // value={numInputs}
                    // onChange={(e) => setNumInputs(e.target.value)}
                />


                </div>
              </div>

              

                {/* <CustomInput
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                  style={{ width: "100%" }}
                /> */}
              <div className="col-12 col-lg-6">
                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <div className="flex flex-col items-end"></div>
                    <OutputWindow outputDetails={outputDetails} />
                    {outputDetails && (
                    <OutputDetails outputDetails={outputDetails} />
                    )}
                </div>
                </div>

                
             </div>
                <div className="col-12 col-lg-6">
                <div className="flex flex-row space-x-4 items-start px-4 py-4">
                    <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme="Oceanic Next"
                    />
                    </div>
                

                <button
                  onClick={handleCompile}
                  disabled={!code || !topic}
                  
                  className={classnames(
                    "btn btn-primary mt-4 ",
                    !code ? "opacity-50" : ""
                  )}
                >
                  {processing ? "Processing..." : "Compile and Upload"}
                </button>
                
                </div>
                </div>
                
          </div>
          
          {/* </form> */}
        </main>
            
      </div>
    </div>
  );
};

export default Landing;
