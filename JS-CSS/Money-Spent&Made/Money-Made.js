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

