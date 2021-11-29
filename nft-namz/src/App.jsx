import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import myNFT from './utils/MyNFT.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Constants
const TWITTER_HANDLE = 'am_cleancoding';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/namz-nft-v4';
const TOTAL_MINT_COUNT = 50;



const CONTRACT_ADDRESS = "0x9Beeb2817c7C94d1f11eea7710691E653915c54A";


const App = () => {

    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState('')

    const [currentAccount, setCurrentAccount] = useState("");
    const [totalMinted, setTotalMinted] = useState(0);
    
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
					setCurrentAccount(account)

          setupEventListener()
      } else {
          console.log("No authorized account found")
      }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4"; 
      if (chainId !== rinkebyChainId) {
        renderErrorToast();
      }

      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }


  const setupEventListener = async () => {

    try {
      const { ethereum } = window;

      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myNFT.abi, signer);

        connectedContract.on("NewNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          let numMinted = tokenId.toNumber();
          let nftLink = `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`;
          setLoading(!loading)
          setLink(nftLink)
          setTotalMinted(numMinted);
          // renderInfoToast(tokenId);
          // alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNFT = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myNFT.abi, signer);

        console.log("Open the wallet spend some cash on some gas...")
        let nftTxn = await connectedContract.makeAnNFT();

        // Minting message toast
        toast('NFT is being minted...', {
        position: "top-right",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Mining...please wait.")
        await nftTxn.wait();

        nftTxn && 
        // Success message toast
        toast.success('Your NFT has been minted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }



  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderMintButton = () => (
    <div>
      <button onClick={askContractToMintNFT} className="cta-button mint-button">
      Mint NFT
      </button>
      <ToastContainer />
    </div>
  );

  const renderOpenSeaLink = (link) => (
    <div className='opensea-container' >
      <h2> Click the following to see your NFT:</h2>
      <a href={link}>See my NFT!</a>
    </div>
  )


const renderErrorToast = () => (
  toast.error("Make sure you're on the Rinkeby Network", {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
})
)


  useEffect(() => {
    checkIfWalletIsConnected()
  },[]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">The <a className='collection' href={OPENSEA_LINK}>NAMZ Collection</a></p>
          <p className="sub-text">
            Mint an NFT with a randomly-generated nickname you can take to the basketball court.
          </p>
          { currentAccount === "" ? 
            renderNotConnectedContainer()
           : renderMintButton()
            }
        </div>
        {!loading && renderOpenSeaLink(link)}
        <div className="nft-info">
        <button className="view-collection">View Collection on OpenSea</button>
        <div className='nft-Total' >
        <p className='mint-count'>Total NFTs minted: {totalMinted} / {TOTAL_MINT_COUNT}</p>
        </div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;