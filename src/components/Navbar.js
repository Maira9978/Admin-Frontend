import {Link} from 'react-router-dom';
import { useState , useEffect } from 'react';
function Navbar() {

  const [items, setItems] = useState(null);
  const handleLink=()=>{
    const items = JSON.parse(localStorage.getItem('dataKey'));
    // items.token=null
    localStorage.setItem('TokenVal', null);
    localStorage.setItem('dataKey', JSON.stringify(items));
    
  }
   useEffect (() => {  
  const items = JSON.parse(localStorage.getItem('dataKey'));
 
  if (items) {
   setItems(items);
   console.log("I'm User data of navbar", items.user.firstName )
  }
}, []);
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <a
              className="nav-icon dropdown-toggle d-inline-block d-sm-none"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="align-middle" data-feather="settings"></i>
            </a>

            <a
              className="nav-link dropdown-toggle d-none d-sm-inline-block"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="vendor/img/avatars/mair.jpeg"
                className="avatar img-fluid rounded me-1"
                alt="Charles Hall"
              />{" "}
              {items === null ? ( <span className="text-dark">user</span>):(<span className="text-dark">{items.user.firstName}</span>)}
           
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <Link to="/profile" className='dropdown-item'>

                <i className="align-middle me-1" data-feather="user"></i>{" "}
                Profile
              </Link>
              
              <div className="dropdown-divider"></div>
              <Link onClick={()=>{handleLink()}}to="/" className='dropdown-item'>
              Log out 
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
