import React, { useState, useEffect } from "react";

import Editor from '@monaco-editor/react';

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

function Analytics() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <form >
              <div className="row">
              <Editor height="90vh" defaultLanguage="c++" defaultValue="// some comment" />;
              {/* <div className="col-12 col-lg-6">
                 <div className="card">

                 <div className="card-header">
                      
                      
                 </div>
                
                 </div>
              </div> */}

              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Analytics;
