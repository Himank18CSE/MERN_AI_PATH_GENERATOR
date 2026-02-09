import CareerForm from "./pages/CareerForm";
import Dashboard from "./pages/Dashboard";
import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";



function App() {
  return(
  <>
  <Toaster position="top-right" />
  <Navbar/>
  <Routes>
    <Route path="/" element={<ProtectedRoute><CareerForm/></ProtectedRoute>}/>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>


  </Routes>
  </>
  )
}

export default App;
