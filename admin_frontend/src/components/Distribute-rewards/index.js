import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
// import { useState } from 'react'
import { bulkAirdropERC20, initContract } from '../../web3/distributeRewards';

const DistributeRewards = () => {
  const [web3,setWeb3] = useState('');
useEffect(()=>{
setWeb3(initContract())
},[])
const distribute = async() => {
//   const Chow_Inu_address = '0xae5f3F9671430F829BE7a9f1a2686E0932a6bc8C';
// const userAddress = ['0x1925CDfEEbBd49b257573E6522d89207Fd1A6a8E'];

//   console.log(await bulkDrop(Chow_Inu_address,userAddress,value));
bulkAirdropERC20("0xae5f3F9671430F829BE7a9f1a2686E0932a6bc8C", ["0x1925CDfEEbBd49b257573E6522d89207Fd1A6a8E","0x46c1B31a611c9960254399527ED9Be85D56b9A6B"],[10,5]).then((data)=>{console.log(data)})
}
  return (
    <>
      <div className="add-content" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h1 className="add-head">Distribute Rewards</h1>
      </div>
      <div className='rwardContainer'>
      <Form>
        <div className='inputsContainer'>
          <Form.Group>
          <Form.Label>Enter Reward:</Form.Label>
          <Form.Control
                  type="text"
                  placeholder="Enter Reward"
                  autoFocus
                  required
                />
          </Form.Group>
          <Form.Group>
          <Form.Label>Enter walletAddress:</Form.Label>
          <Form.Control
                  type="text"
                  placeholder="Enter Wallet Address"
                  autoFocus
                  required
                />
          </Form.Group>
        </div>
        <div className='btnContainer'>
        <Button className="bg-primary" style={{marginTop:'30px',fontSize:'20px'}} onClick={distribute} >
              Distribute
          </Button>
        </div>
        </Form>
      </div>
    </>
  )
}

export default DistributeRewards

