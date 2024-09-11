import axios from 'axios'

const url = 'https://coinranking1.p.rapidapi.com';
const coin_geko_api = import.meta.env.VITE_API_COINGEKO
const coin_geko_url = 'https://api.coingecko.com/api/v3/coins/'

const cryptoApiHeaders = {
  'x-rapidapi-host': import.meta.env.VITE_HOST,
  'x-rapidapi-key': import.meta.env.VITE_API_KEY,
};

const newApiHeaders={
    'x-rapidapi-host': import.meta.env.VITE_NEWS_HOST,
  'x-rapidapi-key': import.meta.env.VITE_API_NEWS,
  'X-BingApis-SDK': 'true'

}

export const fetchCoins = async () => {
  try {
    const response = await axios.get(`${url}/coins`, {
      headers: cryptoApiHeaders,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const fetchCoinsGeko = async () => {
    try {
      const response = await axios.get(`${coin_geko_url}markets`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': `${coin_geko_api}`,
        },
        params: {
          vs_currency: 'usd', 
        },
      });
      return response.data;
    } catch (error) {
      console.error(error); 
    }
  };



// fetch coin fot coin detail page


export const fetchCoinDetail = async (id) => {
    try {
        const response = await axios.get(`${coin_geko_url}${id}`, {
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': `${coin_geko_api}`,
          },
        });
    
        
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching coin detail:', error);
      }
  };


// fetch history of coins

export const fetchCoinHistory = async (coinId, days = 1) => {
    try {
      const response = await axios.get(`${coin_geko_url}${coinId}/market_chart`, {
        headers: {
          accept: 'application/json',
        },
        params: {
          vs_currency: 'usd', // Fetch data in USD
          days: days,         // Time period (e.g., 1 day, 7 days, etc.)
        },
      });
      return response.data; 
    } catch (error) {
      console.error(error);
    }
  };

//   fetch exchange
export const fetchExchange = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/exchanges`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': coin_geko_api,
        },
      });
      console.log(response.data)
      return response.data; // Return the data if request is successful
    } catch (error) {
      console.error('Error fetching exchange data:', error);
      return null; // Return null in case of an error
    }
  };

// News fetch



export const fetchNews = async (page) => {
    try {
      const response = await axios.get(`https://crypto-news51.p.rapidapi.com/api/v1/crypto/articles`, {
        headers: newApiHeaders,
        params: {
            page: page,
            
          },
      });
      console.log(response)
      return response.data; 
    } catch (error) {
      console.error(error);
    }
  };