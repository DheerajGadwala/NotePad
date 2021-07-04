import React, {useState, useEffect} from "react";
import NotepadContract from "./contracts/Notepad.json";
import getWeb3 from "./getWeb3";
import SearchBar from "./components/searchBar";
import Notes from "./components/notes";
import loadingGIF from "./images/loading.gif";

import "./App.css";


 const App = ()=>{

    const [Web3, setWeb3] = useState(null);
    const [Accounts, setAccounts] = useState(null);
    const [Contract, setContract] = useState(null);

    const [changes, setChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccounts(accounts);
    });

    const setUp = async ()=>{
        try{
            setLoading(true);
            let web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            let instance = new web3.eth.Contract(
                NotepadContract.abi,
                "0xb0f1390500973009582557f86aB9f1Fe612627AB",
            );
            setWeb3(web3);
            setAccounts(accounts);
            setContract(instance);
            setLoading(false);

        }
        catch (error) {
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    }

    const getData = async ()=>{
        setLoading(true);
        if(Contract && Accounts){
            const response = await Contract.methods.fetch(Accounts[0]).call();
            setData(response);
        }
        setLoading(false);
    }

    useEffect(() => {
        setUp();
    }, [Web3, Accounts, Contract]);
    useEffect(() =>{
        getData();
    }, [Contract, Accounts]);

    return (
        <div className="notePadArea">
            <div className={loading?"loadingAnimationContainer visibility":"loadingAnimationContainer"}>
                <img src = {loadingGIF} className="loadingAnimation"/>
            </div>
            <SearchBar
                data = {data}
                setData = {setData}
                loading = {loading}
                setLoading = {setLoading}
                Accounts = {Accounts}
                Contract = {Contract}
                changes = {changes}
                setChanges = {setChanges}
            />
            <Notes
                loading = {loading}
                setLoading = {setLoading}
                data = {data}
                setData = {setData}
                setChanges = {setChanges}
            />
        </div>
    );
}

export default App;
