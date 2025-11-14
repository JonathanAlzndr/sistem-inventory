import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
   
  <React.StrictMode>
    <BrowserRouter>
     <ThemeProvider>
      <App />
      <ToastContainer 
      position="top-right"
      autoClose={3000}       
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      theme="light"         
    />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
 
);
