import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "../page/CustomerPage";
import DashboardPage from "../page/DashboardPage";
import HomePage from "../page/HomePage";
import InvoicesPage from "../page/InvoicesPage";
import LandingPage from "../page/LandingPage";
import LoginPage from "../page/LoginPage";
import NewInvoicesPage from "../page/NewInvoicesPage";
import PaymentsPage from "../page/PaymentsPage";
import ProfilePage from "../page/ProfilePage";
import RegisterPage from "../page/RegisterPage";
import VerifyPage from "../page/VerifyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/verification" element={<VerifyPage/>}/>
        <Route path="/home" element={<HomePage/>}>
          <Route path="dashboard" element={<DashboardPage/>}/>
          <Route path="invoices" element={<InvoicesPage/>}/>
          <Route path='invoices/newInvoices' element={<NewInvoicesPage/>}/>
          <Route path="payments" element={<PaymentsPage/>}/>
          <Route path="costumer" element={<CustomerPage/>}/>
          <Route path="profile" element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
