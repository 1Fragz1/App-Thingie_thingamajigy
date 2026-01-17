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
    const entries = document.getElementsByName("table-text");
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
