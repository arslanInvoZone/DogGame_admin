import Web3 from "web3";
import {ethers} from 'ethers'
import rewards from './rewardsAbi.json';
const contractAddress = '0x870A10daB94600a0427A9239DE97Fc941Ee17941';
const infuraRPC = 'https://rinkeby.infura.io/v3/e4b939be2a8840d38a50c1ba58dbc93d';
let Contract;
let web3;


export const initContract = () => {
    web3 = new Web3(infuraRPC);
   Contract =  new web3.eth.Contract(rewards,contractAddress);
   return web3
  }
export const bulkAirdropERC20 = async (address, address1, num) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, rewards, signer);
        let nftTxn = await nftContract.BulkAirdropERC20(address, address1, num);
        await nftTxn.wait();
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };