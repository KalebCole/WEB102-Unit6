import React from 'react';
import CoinInfo from "./CoinInfo";

const CoinList = ({ list, searchInput, filteredResults }) => {
  return (
    <ul>
      {searchInput.length > 0
        ? filteredResults && (
            filteredResults.map((coin) => (
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
          ))
        )
        : list && (
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )
            
            )
        }
    </ul>
  );
};

export default CoinList;