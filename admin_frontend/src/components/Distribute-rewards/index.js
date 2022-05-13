<<<<<<< HEAD
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
// import { useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { bulkAirdropERC20, initContract } from '../../web3/distributeRewards'

const DistributeRewards = () => {
  const [web3, setWeb3] = useState('')
  const [addresses,setAddresses] = useState([]);
  const [tokens,setTokens] = useState([]);
  const chowTokenContractAddress = '0xae5f3F9671430F829BE7a9f1a2686E0932a6bc8C';
  let walletAddresses = []
  const fixedTokens = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '40', label: '40' },
    { value: '50', label: '50' },
    { value: '60', label: '60' },
    { value: '70', label: '70' },
    { value: '80', label: '80' },
    { value: '90', label: '90' },
    { value: '100', label: '100' },
  ]
  useEffect(() => {
    setWeb3(initContract())
  }, [])
  const distribute = async () => {
    // if(tokens.length === 1 && addresses.length > 1){
    //   let updatedTokens = [];
    //   for(let i=0;i<=addresses.length;i++){
    //     updatedTokens.push(tokens[0]);
    //   }
   
    //   bulkAirdropERC20(
    //     chowTokenContractAddress,
    //     addresses,
    //     updatedTokens,
    //   ).then((data) => {
    //     console.log(data)
    //   })  
    // }else{
    //   bulkAirdropERC20(
    //     chowTokenContractAddress,
    //     addresses,
    //     tokens,
    //   ).then((data) => {
    //     console.log(data)
    //   })
    // }
    if(!tokens || !addresses){
      return
    }
       bulkAirdropERC20(
        chowTokenContractAddress,
        addresses,
        tokens,
      ).then((data) => {
        console.log(data)
      })
      setTokens([])
      setAddresses([])
  }

  const fetchData = async () => {
    await axios.get(process.env.REACT_APP_BASE_URL + 'users/').then((res) => {
      res.data.map((address) => {
       return walletAddresses.push({
          value: address.walletAddress,
          label: address.walletAddress,
        })
      })
    })
  }

  useEffect(() => {
    fetchData()
  })
  const addressesChangeHandler  = (e) =>{
// if(e.length){
//   e.map((val)=>{
//     return setAddresses([...addresses,val.value]);
//    })
// }else{
//   setAddresses([]);
// }
setAddresses([e.value]);
    
  }
  const tokensChangeHandler  = (e) =>{
    // if(e.length === 0 || e.length-1){
    //   setTokens([]);
    // }else{
      
    //   e.map((val)=>{
    //     return setTokens([...tokens,parseInt(val.value)]);
    //    })
    // }
    setTokens([parseInt(e.target.value)])
      
  }     
  return (
    <>
      <div
        className="add-content"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
=======
import {Button, Form} from 'react-bootstrap';
// import { useState } from 'react'

const DistributeRewards = () => {
  

  return (
    <>
      <div className="add-content" style={{display:'felx',justifyContent:'center',alignItems:'center'}}>
>>>>>>> bea4aa69837c99d011d5cb5bac37312d3f1a0687
        <h1 className="add-head">Distribute Rewards</h1>
      </div>
      <div className="rwardContainer">
        <Form>
          <div className="inputsContainer">
            <Form.Group>
              <Form.Label>Enter Reward:</Form.Label>
              {/* <CreatableSelect
              
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                
                name="colors"
                options={fixedTokens}
                className="basic-multi-select"
                classNamePrefix="select"
              isSearchable
                onChange={(e)=>tokensChangeHandler(e)}
              /> */}
              <Form.Control
                  type="text"
                  placeholder="Enter Wallet Address"
                  autoFocus
                  required
                  onChange = {(e)=>tokensChangeHandler(e)}
                />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter walletAddress:</Form.Label>
              <Select
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                isSearchable={true}
                name="colors"
                options={walletAddresses}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e)=>addressesChangeHandler(e)}
              />
              {/* <Form.Control
                  type="text"
                  placeholder="Enter Wallet Address"
                  autoFocus
                  required
<<<<<<< HEAD
                  onChange = {(e)=>addressesChangeHandler(e)}
                /> */}
            </Form.Group>
          </div>
          <div className="btnContainer">
            <Button
              className="bg-primary"
              style={{ marginTop: '30px', fontSize: '20px' }}
              onClick={distribute}
              disabled={tokens.length === 0 || addresses.length === 0}
            >
=======
                />
          </Form.Group>
        </div>
        <div className='btnContainer'>
        <Button className="bg-primary" style={{marginTop:'30px',fontSize:'20px'}} >
>>>>>>> bea4aa69837c99d011d5cb5bac37312d3f1a0687
              Distribute
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default DistributeRewards
