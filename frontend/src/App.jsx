import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Product from './pages/Product'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./pages/Cart"
import verify from "./pages/Verify"
import Verify from "./pages/Verify"

function App() {
  

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer  />
        <NavBar/>
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/collections" element={<Collections/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/place-order" element={<PlaceOrder/>}/>
          <Route path="/Product/:productId" element={<Product/>}/>
          <Route path="/verify" element={<Verify/>}/>

        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
