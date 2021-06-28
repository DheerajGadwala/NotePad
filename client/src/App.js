import React, {useState, useEffect} from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";


 const App = ()=>{
    
    const [Web3, setWeb3] = useState(null);
    const [StorageValue, setStorageValue] = useState(0);
    const [Accounts, setAccounts] = useState(null);
    const [Contract, setContract] = useState(null);

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccounts(Accounts);
    })

    const runExample = async ()=>{
        if(Contract){
            await Contract.methods.set(5).send({from: Accounts[0]});
            const response = await Contract.methods.get().call();
            setStorageValue(response);
        }
    }

    const setUp = async ()=>{
        try{
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            console.log(web3.eth.net.getId(), SimpleStorageContract);
            let instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                "0x53ABc339b67c390b7A11a8A1661Ebd79294E3E76",
            );
            setWeb3(web3);
            setAccounts(accounts);
            setContract(instance);

        }
        catch (error) {
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    }

    useEffect(() => {
        setUp();
    });
    useEffect(() =>{
        runExample();
    }, [Contract]);

    return (
        <>
        <div className="App">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
                If your contracts compiled and migrated successfully, below will show
                a stored value of 5 (by default).
            </p>
            <p>
                Try changing the value stored on <strong>line 40</strong> of App.js.
            </p>
            <div>The stored value is: {StorageValue}</div>
            
        </div>
        </>
    );
}

export default App;
