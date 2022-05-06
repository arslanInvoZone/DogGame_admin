import { Link } from 'react-router-dom'

const Sidebar = ({ item }) => {
  return (
    <div className='dashboard-widget'>
      <nav className='dashboard-menu'>
        <ul>
          <li className={item.active}>
            <Link to={`${item.to}`}>
              <i className={`fas ${item.icon}`}></i>
              <span style={{marginLeft:"22px"}}>{item.title}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
