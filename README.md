# Project Title

Smart Contract Management Project

## Description

The project revolves around integrating a frontend design for a smart contract and connecting to a metamask account to perform simple functions such as withdraw and deposit of ETH. Functions such as getUSD_Balance() was added to this project to display the USD equivalent of the balance extracted by the getBalance() function

## Getting Started

### Executing program

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

NOTE:
YOU MUST CREATE A METAMASK ACCOUNT AS IT REQUIRES YOU TO CONNECT TO ONE FOR DEMONSTRATION PURPOSES.

## Authors
Hans Matthew N. Gan (hansmatthewniervagan@gmail.com)
