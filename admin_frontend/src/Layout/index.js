import Dashboard from '../components/DashBoard/index'
import Invoicelist from '../components/Pet-Listing'
import Assetslist from '../components/Asset-Listing'
import DistributeReward from '../components/Distributed-Data/index'
import Side from '../components/sidebar'
import Login from "../components/Login/index"
import '../App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Layout() {
  return (
    <div className='App'>
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
                {/* <Route path='/' element={<Dashboard />} /> */}
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
    </div>
  )
}

export default Layout;
