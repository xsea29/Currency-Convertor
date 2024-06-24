import "./App.css";
import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [resultShown, setResultShown] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  async function convertCurrency() {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
    );
    const data = await res.json();
    setConverted(data.rates[toCur]);
    setResultShown(true); // Set resultShown to true after conversion
  }

  function handleClick(event) {
    event.preventDefault(); // Prevent form submission

    if (fromCur === toCur) {
      setConverted(amount); // If same currency selected, show the same amount
      setResultShown(true); // Set resultShown to true
    } else {
      convertCurrency(); // Otherwise, perform the conversion
    }
  }

  return (
    <div className="container">
      <div className="currency-container">
        <div
          className="container-title"
          style={{ color: "black", fontSize: "24px" }}
        >
          Currency Calculator
        </div>
        {/* Form Container */}
        <form className="form-container">
          <label className="form-label">Amount</label>
          <div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              // disabled={isLoading}
              className="form-input"
              placeholder="Enter amount..."
            ></input>
          </div>
          <label className="form-label">From</label>
          <div>
            <select
              className="form-select"
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
              // disabled={isLoading}
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - European Currency</option>
              <option value="CAD">CAD - Canadian Currency</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>
          <label>To</label>
          <div>
            <select
              className="form-select"
              value={toCur}
              onChange={(e) => setToCur(e.target.value)}
              // disabled={isLoading}
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - European Currency</option>
              <option value="CAD">CAD - Canadian Currency</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>
          <button className="btn" onClick={handleClick}>
            Calculate
          </button>
          {resultShown && <p>{amount > 0 ? `${converted} ${toCur}` : ""}</p>}
        </form>
      </div>
    </div>
  );
}
