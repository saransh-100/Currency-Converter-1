const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"; 
;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for (code in countryList){
//     console.log(code, countryList[code]);
// }

let i =0;

for (let select of dropdowns){
    for (currCode in countryList){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        if (select.name === "from" && currCode === "AUD"){
        option.selected = "selected";
        }
        if (select.name === "to" && currCode === "NPR"){
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input")
    let amntVal = amount.value;
    if (amntVal === "" || amntVal < 1){
        amntVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data [fromCurr.value.toLowerCase()] [toCurr.value.toLowerCase()];
    let finalAmount = (amntVal * rate).toFixed(2);
    msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

 const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
 }

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})


window.addEventListener("load", ()=>{
    updateExchangeRate();
})