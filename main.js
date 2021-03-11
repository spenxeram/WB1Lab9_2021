// This app gets BTC exchange rates and outputs them
// every 30 seconds from:
//https://api.coindesk.com/v1/bpi/currentprice/vnd.json;

// getting and setting global vars
let currencies = {
  usd: {
    prev: 0,
    current: 0
  },
  jpy: {
    prev: 0,
    current: 0
  },
  vnd: {
    prev: 0,
    current: 0
  }
}

// on page load
function updateCurrencies() {
Object.keys(currencies).forEach((currency) => {
  getBTCVal(currency);
});
}

updateCurrencies();
// Event Listeners

// AJAX call to exchange
function getBTCVal(currency) {
  let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    url,
    true
  );
  xhr.onload = function() {
    let result = JSON.parse(this.responseText);
    console.log(result);
  }
  xhr.send();
}


// General functions for output


// Helper functions
