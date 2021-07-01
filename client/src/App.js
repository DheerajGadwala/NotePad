import React, {useState, useEffect} from "react";
import NotepadContract from "./contracts/Notepad.json";
import getWeb3 from "./getWeb3";

import "./App.css";


 const App = ()=>{

    const [Web3, setWeb3] = useState(null);
    const [StorageValue, setStorageValue] = useState(0);
    const [Accounts, setAccounts] = useState(null);
    const [Contract, setContract] = useState(null);

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccounts(Accounts);
    });

    const setUp = async ()=>{
        try{
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            console.log(web3.eth.net.getId(), NotepadContract);
            let instance = new web3.eth.Contract(
                NotepadContract.abi,
                "0x91308822E77b1cF439C4AB5E30967598C5AA7FB2",
            );
            setWeb3(web3);
            setAccounts(accounts);
            setContract(instance);
            console.log()

        }
        catch (error) {
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    }

    const getData = async ()=>{
        if(Contract){
            //await Contract.methods.update("0xf17f52151ebef6c7334fad080c5704d77216b732", ["First Note"], ["Testing 1"]).send({from: Accounts[0]});
            const response = await Contract.methods.fetch("0xf17f52151ebef6c7334fad080c5704d77216b732").call();
            console.log(response)
        }
    }

    useEffect(() => {
        setUp();
    });

    useEffect(() =>{
        getData();
    }, [Contract]);

    return (
        <>
        </>
    );
}

export default App;
