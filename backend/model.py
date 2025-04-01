import yfinance as yf

def get_stock_prices(tickers):
    prices = {}
    for ticker in tickers:
        stock = yf.Ticker(ticker)
        prices[ticker] = stock.history(period="1d")["Close"].iloc[-1]
    return prices

def rebalance_portfolio(current_holdings, target_weights):
    prices = get_stock_prices(current_holdings.keys())
    total_value = sum(current_holdings[ticker] * prices[ticker] for ticker in current_holdings)
    
    new_allocations = {}
    for ticker, weight in target_weights.items():
        new_allocations[ticker] = (total_value * weight) / prices[ticker]
    
    return new_allocations


