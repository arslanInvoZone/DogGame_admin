import Sidebar from './SideBar'
import { Link } from 'react-router-dom'


const Side = ({admin}) => {
  const con = [
    {
      icon: 'fa fa-user',
      title: 'Users',
      to: '/users',
    },
    {
      icon: 'fa fa-paw',
      title: 'Pets',
      to: '/pets',
    },
    {
      icon: 'fa fa-building-o',
      title: 'Assets',
      to: '/assets',
    },
    {
      icon: 'fa fa-trophy',
      title: 'Distribute Reward',
      to: '/distribute-reward',
    },
    {
      icon: 'fa fa-sign-out',
      title: 'Log Out',
      to: '/',
    },
  ]
  const clickHandler = (e) => {
    if(e.target.innerText === 'Log Out'){
      localStorage.removeItem('adminInfo');
      admin(false) 
    }
  }

  return (
    <div className='theiaStickySidebar'>
      <div className='profile-sidebar'>
        <div className='widget-profile pro-widget-content'>
          <div className='profile-info-widget'>
            <div className='profile-det-info'>
              <img src='./images/logo.png'  alt='logo' height={70} width={250}/>

              <div className='patient-details'>
                <h5 className='mb-0'>
                 Dashboard
                </h5>
              </div>
            </div>
          </div>
        </div>

        {con.map((item, index) => (
          <Sidebar key={index} item={item} click={clickHandler}/>
        ))}

      </div>
    </div>
  )
}

export default Side
