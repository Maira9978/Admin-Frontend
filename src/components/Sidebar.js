import {Link} from "react-router-dom"
import { MdDashboard } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineManageAccounts} from "react-icons/md";
import { BsFillCloudUploadFill} from "react-icons/bs";
import { BiAddToQueue} from "react-icons/bi";
import { CiViewTable} from "react-icons/ci";

function Sidebar() {
  return (
    
    <nav id="sidebar" className="sidebar js-sidebar" >
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">Programmers' Battle</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header"></li>



          <li className="sidebar-item ">
            <Link to="/main" className="sidebar-link">
            
              <i className="align-middle" data-feather="sliders"></i>{" "}
              <MdDashboard/>
              <span className="align-middle">Home</span>
            
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/profile" className='sidebar-link'>
            
              <i className="align-middle" data-feather="user"></i>{" "}
              <AiFillProfile/>
              <span className="align-middle">Profile</span>
            
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/managetopic" className='sidebar-link'>
            
              <i className="align-middle" data-feather="user"></i>{" "}
              <MdManageAccounts/>
              <span className="align-middle">Manage Topic</span>
            
            </Link>
          </li>



          <li className="sidebar-item">
            <Link to="/managetype" className='sidebar-link'>
            
              <i className="align-middle" data-feather="user"></i>{" "}
              <MdOutlineManageAccounts/>
              <span className="align-middle">Manage Question Type</span>
            
            </Link>
          </li>
          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="pages-sign-in.html">
              <i className="align-middle" data-feather="log-in"></i>{" "}
              <span className="align-middle">Sign In</span>
            </a>
          </li> */}

          {/* <li className="sidebar-item">
            <a className="sidebar-link" href="pages-sign-up.html">
              <i className="align-middle" data-feather="user-plus"></i>{" "}
              <span className="align-middle">Sign Up</span>
            </a>
          </li> */}

          <li className="sidebar-item">
          <Link to="/blank" className='sidebar-link'>
              <i className="align-middle" data-feather="book"></i>{" "}
              <BsFillCloudUploadFill/>
              <span className="align-middle">Upload Questions</span>
          </Link>
          </li>
          <li className="sidebar-item">
          <Link to="/addquestion" className='sidebar-link'>
              <i className="align-middle" data-feather="book"></i>{" "}
              <BiAddToQueue/>
              <span className="align-middle">Add Questions</span>
          </Link>
          </li>

          <li className="sidebar-item">
          <Link to="/viewquestionbank" className='sidebar-link'>
              <i className="align-middle" data-feather="book"></i>{" "}
              <CiViewTable/>
              <span className="align-middle">View Question Bank</span>
          </Link>
          </li>



          <li className="sidebar-item">
          <Link to="/landing" className='sidebar-link'>
              <i className="align-middle" data-feather="book"></i>{" "}
              <CiViewTable/>
              <span className="align-middle">Upload Dry Run</span>
          </Link>
          </li>

        {/*   <li className="sidebar-item">
          <Link to="/edit" className='sidebar-link'>
              <i className="align-middle" data-feather="book"></i>{" "}
              <CiViewTable/>
              <span className="align-middle">Edit Questions</span>
          </Link>
          </li>
 */}









          {/* <li className="sidebar-header">Tools & Components</li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="ui-buttons.html">
              <i className="align-middle" data-feather="square"></i>{" "}
              <span className="align-middle">Buttons</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="ui-forms.html">
              <i className="align-middle" data-feather="check-square"></i>{" "}
              <span className="align-middle">Forms</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="ui-cards.html">
              <i className="align-middle" data-feather="grid"></i>{" "}
              <span className="align-middle">Cards</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="ui-typography.html">
              <i className="align-middle" data-feather="align-left"></i>{" "}
              <span className="align-middle">Typography</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="icons-feather.html">
              <i className="align-middle" data-feather="coffee"></i>{" "}
              <span className="align-middle">Icons</span>
            </a>
          </li>

          <li className="sidebar-header">Plugins & Addons</li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="charts-chartjs.html">
              <i className="align-middle" data-feather="bar-chart-2"></i>{" "}
              <span className="align-middle">Charts</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="maps-google.html">
              <i className="align-middle" data-feather="map"></i>{" "}
              <span className="align-middle">Maps</span>
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
export default Sidebar;
