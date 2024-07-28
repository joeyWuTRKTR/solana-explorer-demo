docker build -t solana-explorer-frontend .

docker run -d -p 8080:8080 solana-explorer-frontend
