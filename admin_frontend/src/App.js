import Dashboard from './components/DashBoard/index'
import Invoicelist from './components/Pet-Listing'
import Assetslist from './components/Asset-Listing'
import DistributeReward from '../src/components/Distributed-Data/index'
import Side from './components/sidebar'
import Login from "./components/Login/index"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

function App() {
    const [admin,setAdmin] = useState(true);

    const notify = (message, color) =>
  toast(message, {
    position: 'top-right',
    type: color,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

    const authenticateAdmin = async (address) => {
      if(address){
        await axios.post(process.env.REACT_APP_BASE_URL+'admin/auth',{address})
        .then((res)=>{
          localStorage.setItem("adminInfo",JSON.stringify(res.data));
         const adminInfo =  localStorage.getItem('adminInfo');
          setAdmin(JSON.parse(adminInfo));
          notify('user logedIn successfuly!');
        })
        .catch((error)=>{
          alert(error.response.data.message);
        })
      }
    }
    useEffect(()=>{
      if(localStorage.getItem('adminInfo')){
        const adminInfo = localStorage.getItem('adminInfo');
        setAdmin(JSON.parse(adminInfo));
      }
    },[])
  return (
    <>
    <ToastContainer/>
    {admin ?<div className='App'>
    <Router>
      <div className='invoices'>
        <div className=''>
          <div className='row'>
            <div className='col-md-4 col-lg-4 col-xl-3 theiaStickySidebar'>
              <Side />
            </div>
            <div className='col-md-7 col-lg-8 col-xl-9'>
            <div className='container-fluid'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Dashboard />} />
                <Route path='/pets' element={<Invoicelist />} />
                <Route path='/assets' element={<Assetslist />} />
                <Route
                  path='/distribute-reward'
                  element={<DistributeReward />}
                />
              </Routes>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  </div> :
  <Login admin = {authenticateAdmin}/> 
  }
</>    
  )
}

export default App
