let valueList = [];
let labelList = [];
let topiclist = ["insurance", "savings", "food", "rent", "utilities", "transportation", "entertainment", "clothing", "healthcare", "education", "personal care", "gifts", "donations", "miscellaneous"];
let objectList = [];
let taxList = ["income tax", "federal tax", "property tax", "social security", "medicare", "insurances"];

let closed = true;
let page = 0;
let taxes = 0;
let totalSpendings = 0;
let totalMoney = 0;
const bottomBar = document.getElementById("bottom-bar");
const chartContainer = document.getElementById("chartContainer");
const canvasContainer = document.getElementById("canvasContainer");
const totalContainer = document.getElementById("totalContainer");
const totalMoneyText = document.getElementById("total-money-el");
const moneyLeftEl = document.getElementById("money-left-el");
const salarySelect = document.getElementById("salarySelect");
const moneyMadeInput = document.getElementById("MoneyMade");
const hoursInput = document.getElementById("Hours")
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const moneyLeftContainer = document.getElementById("moneyLeftContainer");

const incomeTax = document.getElementById("IncomeTax");
const federalTax = document.getElementById("FederalTax");
const propertyTax = document.getElementById("PropertyTax");
const socialSecurity = document.getElementById("SocialSecurity");
const medicare = document.getElementById("Medicare");
const insurance = document.getElementById("Insurance");

const taxArray = [incomeTax, federalTax, propertyTax, socialSecurity, medicare, insurance];

page2.style.display = "none";
page1.style.display = "none";
chartContainer.style.display = "none";
moneyLeftContainer.style.display = "none";






function localSave(key, value){
    const save = JSON.stringify(value);
    localStorage.setItem(key, save);
}

function localLoad(key){
    const save = localStorage.getItem(key);
    return JSON.parse(save);
}


