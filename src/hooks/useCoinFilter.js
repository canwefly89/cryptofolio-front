import { useState, useEffect, useCallback } from "react";

/**
 *
 * @param {String} message
 * @returns error message & show message func
 */
const useCoinFilter = (coinData, setSearchTerm) => {
  const [coinList, setCoinList] = useState([]);

  const handleSearch = useCallback(
    (input) => {
      setSearchTerm(input);

      const filtered = Object.values(coinData).filter(
        (coin) =>
          coin.name.toLowerCase().includes(input.toLowerCase()) ||
          coin.ticker.toLowerCase().includes(input.toLowerCase())
      );

      setCoinList(filtered);
    },
    [coinData]
  );

  const handleFilter = useCallback(
    (value, type) => {
      let filtered = [];

      switch (type) {
        case "all":
          filtered = Object.values(coinData);
          break;

        case "exchange":
          filtered = Object.values(coinData).filter((v) =>
            v.exchanges.includes(value)
          );
          break;

        case "category":
          filtered = Object.values(coinData).filter((v) => {
            return v.categories.includes(value);
          });
          break;

        case "portfolio":
          filtered = Object.values(coinData).filter((v) => {
            return v.portfolios.includes(value);
          });
          break;

        default:
          filtered = Object.values(coinData);
          break;
      }

      setCoinList(filtered);
    },
    [coinData]
  );

  useEffect(() => {
    if (coinData) {
      const coins = Object.values(coinData);
      setCoinList(coins);
    }
  }, [coinData]);

  return {
    coinList,
    handleSearch,
    handleFilter,
  };
};

export default useCoinFilter;
