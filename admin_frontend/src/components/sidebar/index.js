import { useState } from 'react'
import Sidebar from './SideBar'


const Side = () => {
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
      icon: 'fa fa-trophy',
      title: 'Add Admin',
      to: '/register',
    },
  ]

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
          <Sidebar key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Side
