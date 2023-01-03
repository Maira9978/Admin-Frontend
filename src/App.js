import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
function App(props) {


  return (  
    
    
     {...props.data=== "LOGGED_IN" ? <Dashboard/>:<Login/>}
     
          
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
