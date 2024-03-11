
async function fetchRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates;
  }
  
  const exchangeRates = {};
  
  fetchRates().then(rates => {
    Object.keys(rates).forEach(key => {
      exchangeRates[key] = {};
      Object.keys(rates).forEach(toKey => {
        if (key !== toKey) {
          exchangeRates[key][toKey] = rates[toKey] / rates[key];
        }
      });
    });
  });
  
  function convert() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("currency").value;
    const toCurrency = document.getElementById("convertTo").value;
  
    if (amount && fromCurrency && toCurrency) {
      const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);
      document.getElementById("result").innerText = `Result: ${result} ${toCurrency}`;
    } else {
      document.getElementById("result").innerText = "Please enter all fields!";
    }
  }
  