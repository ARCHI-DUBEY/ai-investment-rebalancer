import React, { useState } from "react";
import axios from "axios";

const PortfolioRebalancer = () => {
    const [result, setResult] = useState(null);
    const [portfolio, setPortfolio] = useState({ AAPL: 10, TSLA: 5 });
    const [targetWeights, setTargetWeights] = useState({ AAPL: 0.6, TSLA: 0.4 });

    const handleRebalance = async () => {
        console.log("Sending request with:", { portfolio, targetWeights });
        try {
            const response = await axios.post("http://127.0.0.1:5000/rebalance", {
                portfolio,
                target_weights: targetWeights
            });
            setResult(response.data);
            console.log("Rebalanced Portfolio:", response.data);
        } catch (error) {
            console.error("Error rebalancing portfolio:", error);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
            <h2>AI-Based Smart Investment Rebalancer</h2>

            <button onClick={handleRebalance} style={{ padding: "10px", marginTop: "15px", cursor: "pointer" }}>
                Rebalance Portfolio
            </button>

            {result && (
                <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <h3>Rebalanced Portfolio:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PortfolioRebalancer;
