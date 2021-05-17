<>
  <svg ref={svgRef}></svg>
  {selectedList &&
    selectedList.map((ticker) => {
      return (
        <div key={ticker}>
          <img src={coinData[ticker].imagePath} width="20px" alt="ticker" />
          <span>{ticker}&nbsp;&nbsp;</span>
          {coinSet[ticker] && (
            <>
              <span>
                $
                {changeNumberFormat(
                  coinSet[ticker].amount * coinData[ticker].price.price
                )}
              </span>
              <span>
                &nbsp;&nbsp;
                {totalValue !== 0
                  ? (
                      ((coinSet[ticker].amount * coinData[ticker].price.price) /
                        totalValue) *
                      100
                    ).toFixed(2)
                  : 0.0}
                %
              </span>
            </>
          )}
        </div>
      );
    })}
  <div>
    <span>Total</span>
    <span>${changeNumberFormat(totalValue)}</span>
  </div>
</>;
