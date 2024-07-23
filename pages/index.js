import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [total, setUSD_Balance] = useState(undefined);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const getUSD_Balance = async () => {
    if (atm) {
      setUSD_Balance((await atm.getUSD_Balance()).toNumber());
    }
  };

  const getTransactionTimestamp = async () => {
    if (atm) {
      const timestamp = await atm.getTransactionTimestamp();
      return timestamp.toNumber();
    }
  };

  const getTransactionStatus = async (status) => {
    if (atm){
      return await atm.getTransactionStatus(status);
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
        getUSD_Balance();
        const timestamp = await getTransactionTimestamp();
        const status = await getTransactionStatus("Deposit");
        setTransactionHistory([...transactionHistory, { timestamp, status }]);
      } catch (error) {
        console.error("Deposit error: ", error.message);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
        getUSD_Balance();
        const timestamp = await getTransactionTimestamp();
        const status = await getTransactionStatus("Withdraw");
        setTransactionHistory([...transactionHistory, { timestamp, status }]);
      } catch (error) {
        console.error("Withdraw error: ", error.message);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    if (balance === undefined && total === undefined) {
      getBalance();
      getUSD_Balance();
    }

    return (
      <div style={{display:"flex",flexDirection:"column", width: "100%",justifyContent:"center"}}>
        <h3>ACCOUNT DEITAILS</h3>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance!== undefined? balance.toString() : 'Loading...'}</p>
        <p>Your Balance in USD: $ {total!== undefined? total.toString() : 'Loading...'}</p>
        <div>
          <button style={{width:"100px", height:"35px"}} onClick={deposit}>Deposit 1 ETH</button>
          <button style={{width:"100px", height:"35px"}} onClick={withdraw}>Withdraw 1 ETH</button>
        </div>
        <h3>TRANSACTION HISTORY</h3>
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
          <table style={{ textAlign: "center", width:"500px"}}>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={index}>
                  <td>1</td>
                  <td>{new Date(transaction.timestamp * 1000).toLocaleString()}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet(); // call getWallet function here
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
