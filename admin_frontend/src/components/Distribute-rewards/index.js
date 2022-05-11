import {Button, Form} from 'react-bootstrap';
// import { useState } from 'react'

const DistributeRewards = () => {
  

  return (
    <>
      <div className="add-content" style={{display:'felx',justifyContent:'center',alignItems:'center'}}>
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
        <Button className="bg-primary" style={{marginTop:'30px',fontSize:'20px'}} >
              Distribute
          </Button>
        </div>
        </Form>
      </div>
    </>
  )
}

export default DistributeRewards

