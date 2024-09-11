import { useEffect, useState } from "react";
import { fetchCoins, fetchCoinsGeko } from "../services/fetchapi";
import HeroComponent from "../components/HeroComponent";
import CoinCard from "../components/CoinCard";
import GlobalCryptoStats from "../components/GlobalCryptoStat";

const HomePage = () => {
    const [coins, setCoins] = useState([]);
    const [globalStats, setGlobalStats] = useState({});
    const [loading, setLoading] = useState(true); // Set to true initially

    useEffect(() => {
        const loadCoins = async () => {
            setLoading(true); // Start loading

            try {
                const coinsDataGloblaStat = await fetchCoins();
                const coinsData = await fetchCoinsGeko();

                if (coinsData) {
                    setCoins(coinsData);
                }

                if (coinsDataGloblaStat?.data?.coins) {
                    setGlobalStats(coinsDataGloblaStat?.data?.stats);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        loadCoins();
    }, []);

    return (
        <>
            <HeroComponent />
            <GlobalCryptoStats globalStats={globalStats} />
            <CoinCard coins={coins} loading={loading} />
        </>
    );
};

export default HomePage;
