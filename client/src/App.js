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
    const [noChangesOnBlur, setNoChangesOnBlur] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchFilterData, setSearchFilterData] = useState("All");
    const [colorsFilterData, setColorsFilterData] = useState([true, true, true, true, true]);
    const [searchData, setSearchData] = useState("");
    const [displayIDs, setDisplayIDs] = useState([]);

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
    useEffect(()=>{
        window.ethereum.on('accountsChanged', function (accounts) {
            setAccounts(accounts);
        });
    }, []);
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
                searchFilterData = {searchFilterData}
                setSearchFilterData = {setSearchFilterData}
                colorsFilterData = {colorsFilterData}
                setColorsFilterData = {setColorsFilterData}
                searchData = {searchData}
                setSearchData = {setSearchData}
                displayIDs = {displayIDs}
                setDisplayIDs = {setDisplayIDs}
                noChangesOnBlur = {noChangesOnBlur}
                setNoChangesOnBlur = {setNoChangesOnBlur}
            />
            <Notes
                loading = {loading}
                setLoading = {setLoading}
                data = {data}
                setData = {setData}
                changes = {changes}
                setChanges = {setChanges}
                searchFilterData = {searchFilterData}
                colorsFilterData = {colorsFilterData}
                searchData = {searchData}
                displayIDs = {displayIDs}
                setDisplayIDs = {setDisplayIDs}
                noChangesOnBlur = {noChangesOnBlur}
                setNoChangesOnBlur = {setNoChangesOnBlur}
            />
        </div>
    );
}

export default App;
