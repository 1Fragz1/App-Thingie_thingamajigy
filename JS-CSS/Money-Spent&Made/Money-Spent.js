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