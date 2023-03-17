function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,num1,num2){
    if (operator=="+"){
        return add(num1,num2);
    }

    else if (operator=="-"){
        return subtract(num1,num2);
    }

    else if (operator=="×"){
        return multiply(num1,num2);
    }

    else if (operator=="÷"){
        return divide(num1,num2);
    }
}

const numButtons=document.querySelectorAll(".num-button");
const operateButtons=document.querySelectorAll(".operate-button");
const display=document.querySelector(".display");
const displaySave=document.querySelector(".display-save");
const equalButton=document.querySelector(".eqbut");
const clearButton=document.querySelector(".clear");
const backButton=document.querySelector(".back");
const dotButton=document.querySelector(".dotbut");
const array=[];
for (let i = 0; i <= 9; i++){
    array.push(i.toString());
}
const numKeys=array;
let firstNum;
let secNum;
let operator="";
let clearDisplayKey=true;
let maxDisplayKey=false;

document.addEventListener("keydown", keyboardSupport);

clearButton.addEventListener("click",clearScreen);
backButton.addEventListener("click",backScreen);

numButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        attachNum(button.textContent);
    });
});

operateButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        doOper(button.textContent);
    });
});

equalButton.addEventListener("click",doCalc);

dotButton.addEventListener("click",attachDot);

function clearDisplay(Bool){
    if(Bool){
        display.textContent="";
    }
}

function clearScreen(){
    display.textContent="0";
    displaySave.textContent="";
    operator="";
}

function backScreen(){
    if (display.textContent.length==1){
        display.textContent="0";
    }
    else {
        display.textContent=
        display.textContent.substring(0,display.textContent.length-1);
    }
}

function roundToFiveDecimal(x){
    return parseFloat(x.toFixed(5));
}

function calculate(){
    secNum=Number(display.textContent);
    if(!clearDisplayKey){
        if(operator=="÷"&&secNum==0){
            alert("Division by 0 is not possible");
            display.textContent=firstNum;
            displaySave.textContent=firstNum;
            displaySave.textContent+=operator;
            clearDisplayKey=true;
        }
        else{
            display.textContent=roundToFiveDecimal(operate(operator,firstNum,secNum));
            displaySave.textContent="";
            operator="";
        }
    }
}

function attachNum(num){
    if (display.textContent.length<=24 || maxDisplayKey){
        if (display.textContent=="0"){
            clearDisplay(true);
        }
        else{
            clearDisplay(clearDisplayKey);
        }
        display.textContent+=num;
        clearDisplayKey=false;
        maxDisplayKey=false;
    }
}

function attachDot(){
    if(!clearDisplayKey){
        if(!(display.textContent.includes("."))){
            display.textContent+=".";
        }
    }
}

function doOper(oper){
    if (operator!=""){
        calculate();
    }
     firstNum=Number(display.textContent);
     displaySave.textContent=display.textContent;
     displaySave.textContent+=oper;
     operator=oper;
     clearDisplayKey=true;
     maxDisplayKey=true;
}

function doCalc(){
    if (operator!=""){
        calculate();
    }
}

function keyboardSupport(event){
    if (numKeys.includes(event.key)){
        attachNum(event.key);
    }
    else if (event.key=="/"){
        event.preventDefault();
        doOper("÷");
    }
    else if (event.key=="*"){
        doOper("×");
    }
    else if (event.key=="-"|| event.key=="+"){
        doOper(event.key);
    }
    else if (event.key=="="){
        event.preventDefault();
        doCalc();
    }
    else if (event.key=="."){
        attachDot();
    }
    else if (event.key=="Backspace"){
        event.preventDefault();
        backScreen();
    }
    else if (event.key=="Delete"){
        event.preventDefault();
        clearScreen();
    }
}
