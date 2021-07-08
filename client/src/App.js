import React, {useState, useEffect} from "react";
import NotepadContract from "./contracts/Notepad.json";
import getWeb3 from "./getWeb3";
import SearchBar from "./components/searchBar";
import Notes from "./components/notes";
import loadingGIF from "./images/loading.gif";
import Firefox from "./images/firefox.png";
import Chrome from "./images/chrome.png";
import Appstore from "./images/appstore.png";
import Playstore from "./images/playstore.png";
import "./App.css";

 const App = ()=>{

    const [Web3, setWeb3] = useState(null);
    const [Accounts, setAccounts] = useState(null);
    const [Contract, setContract] = useState(null);
    const [Chain, setChain] = useState(null); //Network

    const [changes, setChanges] = useState(false);
    const [noChangesOnBlur, setNoChangesOnBlur] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchFilterData, setSearchFilterData] = useState("All");
    const [colorsFilterData, setColorsFilterData] = useState([true, true, true, true, true]);
    const [searchData, setSearchData] = useState("");
    const [displayIDs, setDisplayIDs] = useState([]);
    const [saveFailed, setSaveFailed] = useState(false);

    useEffect(()=>{
        (async()=>{
            setWeb3(await getWeb3());
        })();
    }, []);

    const setUp = async ()=>{
        let accounts, instance, chainId;
        try{
            accounts = await Web3.eth.getAccounts();
            chainId = await window.ethereum.request({ method: 'eth_chainId' });
            instance = new Web3.eth.Contract(NotepadContract.abi, "0xb0f1390500973009582557f86aB9f1Fe612627AB");
        }
        catch (error) {
            setLoading(true);
        }
        try{
            if(instance && accounts){
                const response = await instance.methods.fetch(accounts[0]).call();
                setData(response);
            }
        }
        catch{
            setData([]);
        }
        if(!Accounts || (accounts && accounts[0]!==Accounts[0])){
            setAccounts(accounts);
        }
        if(!Chain || (chainId && chainId!==Chain)){
            setChain(chainId);
        }
        if(!Contract || (Contract && instance._address!==Contract._address)){
            setContract(instance);
        }
        setLoading(false);
    }
    useEffect(()=>{
        try{
            window.ethereum.on('accountsChanged', async (accounts) => {
                setAccounts(accounts);

            });
            window.ethereum.on('chainChanged', (network)=>{
                setChain(network);              
            });
        }
        catch(error){
            setLoading(true);
            console.log('Metamask required');
        }
    }, []);
    useEffect(() => {
        setUp();
    }, [Web3, Accounts, Contract, Chain]);


    return (
        <div className="notePadArea">
            <div className={(loading||!Accounts||Chain!=="0x2a")?"loadingScreenContainer visibility":"loadingScreenContainer"}>
                <div className="loadingAnimationContainer">
                    <div className="Intro">
                        <div className="IntroTitle">
                            NotePad
                        </div>
                        <div className="IntroBy">
                            By Dheeraj Gadwala 
                        </div>
                    </div>
                    <img src = {loadingGIF} className="loadingAnimation"/>
                    <div className={(!Accounts||Chain!=="0x2a")?"linksContainer visibility":"linksContainer"}>
                        <div className={!Accounts?"checker visibility":"checker"}>
                            This application requires MetaMask. Please install the Metamask appication/ extension using the links below to continue.
                        </div>
                        <div className={Chain!=="0x2a"?"checker visibility":"checker"}>
                            This Applications works only on the Kovan test network. Please change to the Kovan test net.
                        </div>
                        <div className={!Accounts?"links visibility":"links"}>
                            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
                                <img src={Chrome}/>
                            </a>
                            <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">
                                <img src={Firefox}/>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=io.metamask&hl=en_IN&gl=US">
                                <img src={Playstore}/>
                            </a>
                            <a href="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202">
                                <img src={Appstore}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={saveFailed?"saveFailedBox visibility":"saveFailedBox"}>
                <div className="saveFailedContainer">
                    <div className="saveFailedText">
                        Your Data was not saved.
                        <div>
                            {Chain==="0x2a"?"Reason: Transaction rejected by user or Insufficient funds in account.":"Reason: You are not on the Kovan Test network. Please switch to the kovan testnet."}
                        </div>
                    </div>
                    <div className="saveFailedOKButton" onClick={()=>{setSaveFailed(false)}}>
                        <div>
                            OK
                        </div>
                    </div>
                </div>
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
                saveFailed = {saveFailed}
                setSaveFailed = {setSaveFailed}
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
