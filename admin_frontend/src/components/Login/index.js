import { Navbar } from 'react-bootstrap'
import { connectMetaMask } from '../../web3/web3Config'
import NoInternetConnection from "./networkStatus"

const Login = ({ admin }) => {
  return (
    <>
      {/*header */}

      <Navbar className="login-nav pt-0 pb-0">
        <Navbar.Brand>
          <img
            src="./images/logo.png"
            alt="logo"
            height={60}
            width={240}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Navbar>

      {/*  */}
      <div className="login-bg">
        <div className="state">
          {/* <h2 style={{ color: 'white' }}>Login With Your Metamask Wallet</h2> */}
          <NoInternetConnection>
          <h2 style={{ color: 'white' }}>Login With Your Metamask Wallet</h2>
      </NoInternetConnection>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="./images/MetaMask_Fox.svg.png"
            height={100}
            width={100}
<<<<<<< HEAD
            style={{ position: 'absolute', top: '-115px', left: '47%' }}
=======
            style={{ position: 'absolute', top: '-23px', left: '39%' }}
>>>>>>> bea4aa69837c99d011d5cb5bac37312d3f1a0687
            alt="img"
          />
          <button
            className="login-btn"
            onClick={async () => {
              const address = await connectMetaMask()
              admin(address[0])
            }}
          >
            Metamask
          </button>
        </div>
      </div>
      {/* footer */}
      <div className="login-nav" style={{ height: '51px' }}></div>
    </>
  )
}

export default Login
