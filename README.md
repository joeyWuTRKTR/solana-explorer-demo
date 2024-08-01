## Introduction 
It's a full-stack project for simulation of a Solana explorer.

## Completed features:
1. show block list in main page
2. search block by slot
3. search transaction by signature
4. show block detail
5. show transaction detail
6. show transaction list in block detail

# Architecture
### Frontend
- Node.js => v18
- React => ^18.3.1
- Next.js => ^14.2.5
- Tailwind CSS => ^3.4.6

Next is a React framework providing multiple features like server-side rendering and dymanic routing

Tailwind CSS is a utility-first CSS framework for styling.  


### Backend
- Node.js => v18
- Express => ^4.19.2
- @solana/web3.js => ^1.95.1

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

@solana/web3.js is a JavaScript library for interacting with the Solana blockchain.  


## How to install & build
no configuration needed, just run the following command to start the project.
```bash

git clone https://github.com/joeyWuTRKTR/solana-explorer-demo.git

docker compose up
```

## Demo
### 1. main page: http://localhost:8080  
It's a bit slow to get the data from the Solana third-party API for block list.  
Click "Solana Explorer" will return main page.  
<img src="/static/main-page.png" width=400>  

### 2. block detail: http://localhost:8080/block/280758703  
<img src="/static/block-page.png" width=400>  

### 3. transaction detail: http://localhost:8080/transaction/65kpZSVrudyqnUX6yS4ukvAmfsybgYfmsL6bMKH1xSP9xcoScqwpoDveSXQZGiko5PctWk8po9GGEdPYD5i2ZK8w  
<img src="/static/tx-page.png" width=400>  

