// This app gets BTC exchange rates and outputs them
// every 30 seconds from:
//https://api.coindesk.com/v1/bpi/currentprice/vnd.json;

// getting and setting global vars
let currencies = {
  usd: 0,
  jpy: 0,
  vnd: 0
};


document.addEventListener("DOMContentLoaded", () => {
  let alertbox = document.querySelector(".alert.checking")
  console.log(alertbox);
  let i = 30;
  setInterval(() => {
    if(i == 3) {
      // alert user that currency check will happen
      alertbox.style.opacity = "1";
    } else if (i <= 0) {
      alertbox.style.opacity = "0";
      updateCurrencies();
      i = 30;
    }
    outputTimer(i);
    i--;
  }, 1000);

})



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
    outputCurrency(result, currency);
  }
  xhr.send();
}


// General functions for output

function outputCurrency(result, currency) {
  let newval = result.bpi[currency.toUpperCase()].rate_float;
  let outputel = document.querySelector(`.${currency}`);
  let theclass = "";
  if(newval >= currencies[currency]) {
    theclass = "green"
  } else {
    theclass = "red";
  }
  outputel.classList = `${currency} ${theclass}`;
  newval = Math.round(newval);
  currencies[currency] = newval;
  outputel.innerText = newval.toLocaleString() + " " + currency.toUpperCase();
}

function outputTimer(time) {
  let target = document.querySelector("span.time");
  target.innerText = time;
}

// Helper functions
