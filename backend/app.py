from flask import Flask, request, jsonify
import yfinance as yf
from model import rebalance_portfolio

app = Flask(__name__)

@app.route('/get-price/<ticker>', methods=['GET'])
def get_stock_price(ticker):
    stock = yf.Ticker(ticker)
    price = stock.history(period="1d")["Close"].iloc[-1]
    return jsonify({"ticker": ticker, "price": float(price)})

@app.route('/rebalance', methods=['POST'])
def rebalance():
    data = request.json
    new_allocations = rebalance_portfolio(data["portfolio"], data["target_weights"])
    return jsonify(new_allocations)

if __name__ == '__main__':
    app.run(debug=True)
