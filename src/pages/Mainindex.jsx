import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const Mainindex = () => {


  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="page-wrapper">
        <Navbar />
         {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                <div className="dash-widget-info">
                  <h3>23</h3>
                  <span>Auteurs</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-globe" /></span>
                <div className="dash-widget-info">
                  <h3>23</h3>
                  <span>Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                <div className="dash-widget-info">
                  <h3>23</h3>
                  <span>Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                <div className="dash-widget-info">
                  <h3>23</h3>
                  <span>Employees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card-group m-b-30">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Nouveau demande de congés</span>
                    </div>
                  </div>
                  <h3 className="mb-3">23</h3>
                  <div className="progress mb-2" style={{height: '5px'}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '2%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Reclamation</span>
                    </div>

                  </div>
                  <h3 className="mb-3">23</h3>
                  <div className="progress mb-2" style={{height: '5px'}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '2%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Repos</span>
                    </div>

                  </div>
                  <h3 className="mb-3">23</h3>
                  <div className="progress mb-2" style={{height: '5px'}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '2%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="d-block">Resignation</span>
                    </div>

                  </div>
                  <h3 className="mb-3">23</h3>
                  <div className="progress mb-2" style={{height: '5px'}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '2%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>	
        </div>

      </div>
      {/* /Page Content */}
        
        
      </div>
    </div>
  );
};

export default Mainindex;
