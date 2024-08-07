# FUNCTION FRONTEND- ETH AVAX PROJECT

Add or modify a function for smart contract management project with front-end functionality

## Description

The project revolves around integrating a frontend design for a smart contract and connecting to a metamask account to perform simple functions such as withdraw and deposit of ETH. Functions such as getUSD_Balance() was added to this project to display the USD equivalent of the balance extracted by the getBalance()function.

The Assessment.sol file defines the smart contract, you'll find numerous functions here, the main interactive functions here that you can use is the deposit and withdraw. These functions, from the name itself allows you to deposit or withdraw ETH from your metamask. As a requirement for this project, an additional function was included in the contract and this is the getUSD_Balance() which is an informative function to allow the user to view the equivelent amount of balance he/she currently has to USD. At the time of this making, 1 ETH was equivalent to approximately 3383 USD. 

On the other hand, the index.js is responsible for the front-end allowing the user to interact with the smart contract graphically. This was updated to compensate for the changes in the smart contract which is the addition of getUSD_Balance() function. 

To extract the data from the function this was implemented:
``const getUSD_Balance = async() => {
    if(atm){
      setUSD_Balance((await atm.getUSD_Balance()).toNumber())
    }
  }  ``

To display the output of the function this was added:
``<p>Your Balance in USD: $ {total} </p>``

For further details, check the source code from line 63 to 110

Additionally, I also added a transaction list to keep track of all transaction made during a session. Two functions were made in the smart contract, the getTransactionTimestamp() and getTransactionStatus() functions which extracts the time and the status or type of transaction (withdrawal or deposit). 

To extract the data from the function this was implemented in the frontend:

``const getTransactionTimestamp = async () => {
    if (atm) {
      const timestamp = await atm.getTransactionTimestamp();
      return timestamp.toNumber();
    }
  };``

  ``const getTransactionStatus = async (status) => {
    if (atm){
      return await atm.getTransactionStatus(status);
    }
  };``
  
To display the output of the function this was added:

``<h3>TRANSACTION HISTORY</h3>
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
        </div>``

For further details, check the source code from line 68 to 158
## Getting Started

### Executing program

Choose an IDE to run the code. In this case, I utilized Visual Studio Code as my IDE (You may download the IDE at https://code.visualstudio.com/Download). Clone this repository and you will want to do the following to get the code running on your computer. 

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

If you face issues in connecting to your metamask account refer to the following video 
(Timestamp: 21:00): 
https://youtu.be/e_4-Q77XJkw

NOTE:
YOU MUST CREATE A METAMASK ACCOUNT AS IT REQUIRES YOU TO CONNECT TO ONE FOR DEMONSTRATION PURPOSES.

## Authors
Hans Matthew N. Gan (hansmatthewniervagan@gmail.com)
