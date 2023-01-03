import React, { useState, useEffect , useContext} from "react";
import axios from "axios";

function Login()
{   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null); 
    
    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [userData, setUserData] = useState({});

   
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("hi")
        const user = { email, password };
         // send the username and password to the server
        console.log(email);
        axios.post(`http://localhost:2000/api/admin/signin`, {
            email,
            password
        })
        .then(res => {
            console.log(res.data)
            setLoggedInStatus('LOGGED_IN');
            setUserData(response.data.user);
            <App data={loggedInStatus} />  
			})
        .catch(e => {
            console.log(`Login error ${e}`);
        });

        
    };
    
    return(
        <>
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Welcome to Admin</h1>
							<p className="lead">
								Sign in to your account to continue
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<div className="text-center">
										<img src="vendor/img/avatars/avatar.jpg" alt="Charles Hall" className="img-fluid rounded-circle" width="132" height="132" />
									</div>
									<form>
										<div className="mb-3">    
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" onChange={({ target }) => setEmail(target.value)}/>
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" onChange={({ target }) => setPassword(target.value)} />
											<small>
            <a href="index.html">Forgot password?</a>
          </small>
										</div>
										<div>
											<label className="form-check">
            <input className="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked/>
            <span className="form-check-label">
              Remember me next time
            </span>
          </label>
										</div>
										<div className="text-center mt-3">
											{/* <a href="index.html" className="btn btn-lg btn-primary">Sign in</a> */}
											 <button className="btn btn-lg btn-primary" onClick={handleSubmit}>Sign in</button> 
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	
        </>
      
        );
}
export default Login;