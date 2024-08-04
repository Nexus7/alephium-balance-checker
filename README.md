# Alephium Balance Checker

This simple NextJS single page app which query the balance of an Alephium address and return it to the screen.

## Getting Started

1. Clone  the repo

2. Install all required packages

```
npm i
```

3. Create a simple environment variable file called .env with the URL of the Alephium mainnet API:

```
touch .env.local
echo NEXT_PUBLIC_ALEPHIUM_MAINNET_URL="https://node.mainnet.alephium.org"org" >> .env.local
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.