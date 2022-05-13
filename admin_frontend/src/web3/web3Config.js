export const connectMetaMask = async () => {
    console.log('Requesting account...');

    if(window.ethereum) {
        console.log('detected');

        try{
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            return accounts;
        }
        catch(error){

        }
    }else{
        console.log('Meta Mask not detected!')
    }
}