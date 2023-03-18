import { CiViewTable} from "react-icons/ci";
function Dashboard() {
  return (
    <>
      <h1 className="h3 mb-3">
        <strong>Admin</strong> Dashboard
        
      </h1>

      <div className="row">
        

        <div className="col-xl-6 col-xxl-7">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Admin </h5>
              <p>This is an android application to be used by first year students. As many players are using the
               application so the major security concerns will be player authentication which is done by
               registration which include all the information regarding player. Web Application is only used for
               Admin. As database is handled by admin so admin is responsible for the security of the database.</p>
             


             
            </div>
           
           {/*  <div className="card-body py-3">
              <div className="chart chart-sm">
                <canvas id="chartjs-dashboard-line"></canvas>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      
    </>
  );
}
export default Dashboard;
