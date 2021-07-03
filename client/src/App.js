import React, {useState, useEffect} from "react";
import NotepadContract from "./contracts/Notepad.json";
import getWeb3 from "./getWeb3";
import SearchBar from "./components/searchBar";
import Notes from "./components/notes";

import "./App.css";


 const App = ()=>{

    const [Web3, setWeb3] = useState(null);
    const [Accounts, setAccounts] = useState(null);
    const [Contract, setContract] = useState(null);

    const [saveButton, toggleSaveButton] = useState(true);
    const [data, setData] = useState([]);

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccounts(Accounts);
    });

    const setUp = async ()=>{
        try{
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            let instance = new web3.eth.Contract(
                NotepadContract.abi,
                "0xb0f1390500973009582557f86aB9f1Fe612627AB",
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

    const getData = async ()=>{
        if(Contract){
            //await Contract.methods.update("0xf17f52151ebef6c7334fad080c5704d77216b732", ["First Note", "Second Note"], ["Testing 1", "Testing 2"], ["1", "3"]).send({from: Accounts[0]});
            const response = await Contract.methods.fetch("0xf17f52151ebef6c7334fad080c5704d77216b732").call();
            setData(response);
        }
    }

    useEffect(() => {
        setUp();
    }, [Web3, Accounts, Contract]);
    useEffect(() =>{
        getData();
    }, [Contract]);
    useEffect(()=>{
        console.log(data);
    }, [data])

    return (
        <div className="notePadArea">
            <SearchBar
                data = {data}
                setData = {setData}
                saveButton = {saveButton}
                toggleSaveButton = {toggleSaveButton}
                Accounts = {Accounts}
                Contract = {Contract}
            />
            <Notes
                saveButton = {saveButton}
                toggleSaveButton = {toggleSaveButton}
                data = {data}
                setData = {setData}
            />
        </div>
    );
}

export default App;
