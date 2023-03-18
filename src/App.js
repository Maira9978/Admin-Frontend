import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route ,Link} from 'react-router-dom';
import  { Component, Suspense } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Blank from "./pages/Blank";
import Addquestion from "./pages/Addquestion";
import ViewQuestionBank from "./pages/ViewQuestionBank";
import Managetopic from "./pages/Managetopic";
import Managetype from "./pages/Managetype";
import Edit from "./pages/Edit";
function App() {
  const items = JSON.parse(localStorage.getItem('dataKey'));
  // const tk=items.token
  // localStorage.setItem('TokenVal', JSON.stringify(userData));

  const tk=JSON.parse(localStorage.getItem('TokenVal'));
      return (
        
        
        
        <Router>
       
        <Routes>

           
          <Route exact path="/" element={<Login />}/>
            {/* <Route index element={<Home />} /> */}
            {/* <Route path="" element={<Blogs />} /> */}
            
            
            <Route path="/main" element={tk?<Main/>:<Login/>} /> 
            <Route path="/login" element={tk?<Main/>:<Login/>} /> 
            <Route path="/profile" element={tk?<Profile />:<Login/>} /> 
            <Route path="/blank" element={tk?<Blank/>:<Login/>} /> 
            {/* <Route path="*" element={<NoPage />} />  */}
            <Route path="/addquestion" element={tk?<Addquestion/>:<Login/>} /> 
            <Route path="/viewquestionbank" element={tk?<ViewQuestionBank/>:<Login/>} /> 
            <Route path="/managetopic" element={tk?<Managetopic/>:<Login/>} /> 
            <Route path="/managetype" element={tk?<Managetype/>:<Login/>} /> 
            <Route path="/edit" element={tk?<Edit/>:<Login/>} /> 

          
          
        </Routes>
        
        <div><Footer /></div>

      </Router>
      
      
    

          
    // <div className="wrapper">
      
    //   <Sidebar />
    //   <div className="main">
    //     <Navbar />
    //     <main className="content">
    //       <div className="container-fluid p-0">
             
    //       <Login/>
    //         <Dashboard/> 
            
    //       </div>
    //     </main>

    //     <Footer />
    //   </div>
    // </div>
  );
}

export default App;
