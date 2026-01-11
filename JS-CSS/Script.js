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




// pages:

function updatePage(){

     if (page == 1){
        totalContainer.style.display = "none";
        chartContainer.style.display = "block";
    } else if (page == 2){
        totalContainer.style.display = "none";
        chartContainer.style.display = "none";
    }
}

function localSave(key, value){
    const save = JSON.stringify(value);
    localStorage.setItem(key, save);
}

function localLoad(key){
    const save = localStorage.getItem(key);
    return JSON.parse(save);
}


function toggleBottomBar(){
    if(closed){

        bottomBar.style.transition = "height 1s ease";
        bottomBar.style.height = "1vw";
        canvasContainer.style.transition = "height 1s ease, width 1s ease";
        canvasContainer.style.height = "40vw", canvasContainer.style.width = "40vw";
        closed = !closed;
    } else if (!closed && page === 1 || !closed && page == 2){
        bottomBar.style.transition = "height 1s ease";
        bottomBar.style.height = "21vw";
    canvasContainer.style.transition = "height 1s ease, width 1s ease";
        canvasContainer.style.height = "18vw", canvasContainer.style.width = "18vw";
        closed = !closed;
    }
}

function goToPage(pageNumber){
    if(page == pageNumber){
        toggleBottomBar();
    } else {
    
        page = pageNumber;
        if(page == 1){
            page1.style.display = "block";
            page2.style.display = "none";
            chartContainer.style.display = "none";
        } else if (page == 2){
            page1.style.display = "none";
            page2.style.display = "block";
            chartContainer.style.display = "block";
        }
    }
}