import React from "react";
import "../homepage/SideNavBar.css";
import invoicess from "../../assets/image/invoicess.png";
import customerr from "../../assets/image/customerr.png";
import noinvoicess from "../../assets/image/noinvoicess.png";
import paymentss from "../../assets/image/paymentss.png";
import RecentPayment from "../../page/RecentPayment";
import RecentInvoice from "../../page/RecentInvoice";

const Dashboard = () => {
  return (
    <div className="container p-0" style={{height: 'calc(100vh - 65px)', overflow: 'auto'}}>
      <div className="dashboardWrapper">
        <div className="dashboardLeft">Dashboard</div>
        <div className="dashboardRight">
          Show Stats
          <div class="btn-group">
            <button class="btn btn-secondary btn-sm" type="button">
            <i class="plusIcon fa fa-calendar-minus" aria-hidden="true"></i>
              Last 30 days
            </button>
            <button
              type="button"
              class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Last 30 days</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  Last 30 days
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Last 7 days
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


        <div className="d-flex pb-5 flex-row justify-content-between" style={{margin: '0px 40px'}}>
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="feature-block1">
              <img className="pic" src={invoicess} alt="img" />
              <h4 className="title4">No Invoices Created</h4>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="feature-block1">
              <img className="pic" src={customerr} alt="img" />
              <h4 className="title4">No Customer Added</h4>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="feature-block1">
              <img className="pic" src={noinvoicess} alt="img" />
              <h4 className="title4">No Invoices Created</h4>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="feature-block1">
              <img className="pic" src={paymentss} alt="img" />
              <h4 className="title4">No Payments Received</h4>
            </div>
          </div>
        </div>

      <div class="container text-center">
        <div class="row justify-content-evenly">
          <div class="col-6">
            <h4 className="textRecent"> Recent Invoices</h4>
            <div className="recent">
              
              <RecentInvoice />
            </div>
          </div>

          <div class="col-6 mb-4">
            <h4 className="textRecent"> Recent Payments</h4>
            <div className="recent">
             <RecentPayment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
