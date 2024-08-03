"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import Head from 'next/head';
import { getAlephiumAddressBalance } from './alephium'; // Import the Alephium library
import { BalanceData } from './BalanceData'; // Import the BalanceData type

const Home: React.FC = () => {
  // Define state with appropriate types
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle checking balance
  const handleCheckBalance = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const balanceData: BalanceData = await getAlephiumAddressBalance(address);
      setBalance(balanceData.balance / 1e18); // Convert balance to ALPH units
    } catch (err: unknown) {
      // Type guard for error handling
      if (err instanceof Error) {
        setError(`Failed to fetch balance: ${err.message}`);
      } else {
        setError('An unknown error occurred');
      }
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Alephium Balance Checker</title>
      </Head>
      <div
        className="w-full p-8 bg-white rounded-lg shadow-md"
        style={{ maxWidth: '672px' }} // Set the max-width to 672px (150% of 448px)
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Alephium Balance Checker</h1>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Alephium address"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
        />
        <button
          onClick={handleCheckBalance}
          className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span>⏳ Retrieving balance...</span>
          ) : (
            'Check Balance'
          )}
        </button>
        {balance !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-green-500">Balance: {balance} ALPH</h2>
          </div>
        )}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default Home;