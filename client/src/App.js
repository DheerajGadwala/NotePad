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

    const [changes, setChanges] = useState(false);
    const [noChangesOnBlur, setNoChangesOnBlur] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchFilterData, setSearchFilterData] = useState("All");
    const [colorsFilterData, setColorsFilterData] = useState([true, true, true, true, true]);
    const [searchData, setSearchData] = useState("");
    const [displayIDs, setDisplayIDs] = useState([]);

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
            setLoading(false);

        }
        catch (error) {
            setLoading(true);
            console.error(error);
          }
    }
    useEffect(()=>{
        try{
            window.ethereum.on('accountsChanged', function (accounts) {
                setAccounts(accounts);
            });
        }
        catch(error){
            setLoading(true);
            console.log('Metamask required');
        }
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
                <div className="Intro">
                    <div className="IntroTitle">
                        NotePad
                    </div>
                    <div className="IntroBy">
                        By Dheeraj Gadwala 
                    </div>
                </div>
                <img src = {loadingGIF} className="loadingAnimation"/>
                <div className={Accounts===null?"linksContainer visibility":"linksContainer"}>
                    <div>This application requires MetaMask. Please install the Metamask appication/ extension using the links below to continue.</div>
                        <div className="links">
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
