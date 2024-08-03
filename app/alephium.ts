// Import the necessary modules
import axios from 'axios';
import dotenv from 'dotenv';
import { BalanceData } from './BalanceData';

dotenv.config({ path: './cfg/.env' });

// Function to retrieve balances from an alephium public endpoint
export const getAlephiumAddressBalance = async(address: string) : Promise<BalanceData> => {
    try {
        const alephiumUrl = `${process.env.NEXT_PUBLIC_ALEPHIUM_MAINNET_URL}/addresses/${address}/balance`;
        const response = await axios.get(alephiumUrl);
        return response.data as BalanceData;
    } catch (error) {
        console.error('Error fetching Alephium address balance:', error);
        throw error;
    }
}