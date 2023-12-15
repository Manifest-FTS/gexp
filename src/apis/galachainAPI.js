const BASE_URL = process.env.NEXT_PUBLIC_GALACHAIN_API_URL;

export const fetchBlocks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/blocks`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
