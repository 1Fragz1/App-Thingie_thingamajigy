let valueList = [];
let labelList = [];
let topiclist = ["insurance", "savings", "food", "rent", "utilities", "transportation", "entertainment", "clothing", "healthcare", "education", "personal care", "gifts", "donations", "miscellaneous"];
let objectList = [];
let taxList = ["income tax", "federal tax", "property tax", "social security", "medicare", "insurances"];

let page = 0;
let taxes = 0;
let totalSpendings = 0;
let totalMoney = 0;
const chartContainer = document.getElementById("chartContainer");
const canvasContainer = document.getElementById("canvasContainer");
const totalContainer = document.getElementById("totalContainer");
const totalMoneyText = document.getElementById("total-money-el");
const moneyLeftEl = document.getElementById("money-left-el");
const salarySelect = document.getElementById("salarySelect");
const moneyMadeInput = document.getElementById("MoneyMade");
const hoursInput = document.getElementById("Hours")

const incomeTax = document.getElementById("IncomeTax");
const federalTax = document.getElementById("FederalTax");
const propertyTax = document.getElementById("PropertyTax");
const socialSecurity = document.getElementById("SocialSecurity");
const medicare = document.getElementById("Medicare");
const insurance = document.getElementById("Insurance");

const taxArray = [incomeTax, federalTax, propertyTax, socialSecurity, medicare, insurance];

// Bar colors
const barColors = [
"#6092e0",
"#7065eb",
"#ae65eb",
"#e18ee8",
"#e892bf",
"#cc5454",
"#d67f69",
"#d6914b",
"#f0e8aa",
"#cef0aa",
"#aaf0ba",
"#aaf0d6",
"#aaedf0",
"#aad7f0",
];



class moneyObject {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

function onStart(){
    updatePage();
    createObjects();
}

function createObjects(){
    for(let i = 0; i < topiclist.length; i++){
        const coolMoneyObject = new moneyObject(topiclist[i], 0);
        objectList.push(coolMoneyObject);
    }
    for(let i = 0; i < taxList.length; i++){
        const taxObject = new moneyObject(taxList[i], 0);
        objectList.push(taxObject);
    }
}

window.onload = onStart();

//const NumberInput = document.getElementById("moneyValue");

const canvas = document.getElementById("canvas");

let chart = new Chart(canvas, {
    type: "pie",
    data: {
        labels: labelList,
        datasets: [
            {
                backgroundColor: barColors,
                data: valueList,
            }]
        },
    options: {
        plugins: {
            legend: { display: true},
            title: {
                display: true,
                text: "Spending Chart",
                font: { size: 24 },
            }
        }
    }


});

function updateChart(){
    totalSpendings = 0;
    //const nameValue = nameInput.value;
    const entries = document.getElementsByName("tabletext");
    resetChart();

    //ADD NEW MONEY
    for(let i = 0; i < entries.length; i++){
        if(entries[i].value != ""){
            objectList[i].value += parseFloat(entries[i].value);
        }
    }

    //GET ALL MONEY
    let moneyTotal = 0;
    for(let i = 0; i < objectList.length; i++){
        moneyTotal += objectList[i].value;
    }

    //Put everything into the pie chart
    for(let i = 0; i < objectList.length; i++){
        if(objectList[i].value != 0){
            //Add it to the chart
            labelList.push(objectList[i].name + ": " + ((objectList[i].value/moneyTotal)*100).toFixed(2) + "%");
            valueList.push(objectList[i].value);
        }
    }
    totalMoneyText.innerText = "$" + moneyTotal;
    totalSpendings = moneyTotal;
    showMoney();

chart.update();
//nameInput.value = "";
//NumberInput.value = "";
}

function resetChart(){
    totalSpendings = 0;
    const labelLength = labelList.length;
    for(let i = 0; i < labelLength; i++){
        labelList.pop();
        valueList.pop();
    }
    //Reset objects lateeeeeeeer
    showMoney();
    chart.update();
}

function resetAll(){
    for(let i = 0; i < objectList.length; i++){
        objectList[i].value = 0;
    }
    resetChart();
}

function pageBack(){
    page--;
    if(page < 0){
        page = 2;
    }
    updatePage();
}

function pageNext(){
    page++;
    if(page > 2){
        page = 0;
    }
    updatePage();
}

function updatePage(){
    if(page == 0){
        totalContainer.style.display = "block";
        canvasContainer.style.display = "none";
        chartContainer.style.display = "none";
    } else if (page == 1){
        totalContainer.style.display = "none";
        canvasContainer.style.display = "none";
        chartContainer.style.display = "block";
    } else if (page == 2){
        totalContainer.style.display = "none";
        canvasContainer.style.display = "block";
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

function showHoursInput(){
    const hoursInput = document.getElementById("Hours");

    hoursInput.style.display = (salarySelect.value == "hourly" ? "inline-block" : "none");
}

function calculateTotalMoney(){
    //Add up all the money


    if(salarySelect.value === "hourly"){
        //OVERTIME
        const hoursWorked = hoursInput.value;
        if(hoursWorked > 40){
            const overtimeHours = hoursWorked - 40;
            const overtimePay = parseFloat(moneyMadeInput.value)*overtimeHours*1.5;
            const normalPay = parseFloat(moneyMadeInput.value)*40;
            totalMoney = (overtimePay + normalPay)*52/12;
        } else {
            totalMoney = parseFloat(moneyMadeInput.value)*parseFloat(hoursWorked) * 52/12;
        }


        totalMoney = parseFloat(moneyMadeInput.value)*parseFloat(hoursInput.value) * 52/12;
    } else if (salarySelect.value === "weekly") {
        totalMoney = parseFloat(moneyMadeInput.value) *52/12;
    } else if (salarySelect.value === "monthly") {
        totalMoney = parseFloat(moneyMadeInput.value);
    } else if (salarySelect.value === "yearly") {
        totalMoney = parseFloat(moneyMadeInput.value)/12;
    } 

    totalMoneyText.textContent = "$" + totalMoney.toFixed(2);
}

function calculateMoneyLeft(){
    //Taxes
    let moneyLeft = totalMoney;
    taxes = 0;
    
    for(let i = 0; i < taxArray.length; i++){
        let taxAmount = 0;

        if(taxArray[i].value == "" || taxArray[i].value == null){
            continue;
        }

        if(taxArray[i].value.includes("%")){
            let percent = parseFloat(taxArray[i].value)/100;
            taxAmount = totalMoney*percent;
            taxes += taxAmount;
        } else {
            taxAmount = parseFloat(taxArray[i].value);
            taxes += taxAmount;
        }

        objectList.find(object => object.name == taxList[i]).value = taxAmount;
    }

    if(isNaN(taxes)){
        taxes = 0;
    }

    //moneyLeft -= taxes;
    moneyLeft -= totalSpendings;
    moneyLeftEl.textContent = `$ ${moneyLeft.toFixed(2)}`;
}

function showMoney(){
    if(moneyMadeInput.value != "" || hoursInput.value != ""){
        calculateTotalMoney();
    }

    calculateMoneyLeft();
}
