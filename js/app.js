//Variables de control de la primera operacion y guardado de operacion actual y valor acumulado
var firstOperation = true;
var partialResult;
var currentOperation = {
    operation: "",
    isDivision: false
}; 

//Funciones para obtener elementos del formulario
var errorMessage = document.getElementById("errorMessage");
var operationResult = document.getElementById("operationResult");
var operand = document.getElementById("firstOperand")
var op1 = () => parseInt(operand.value);
var setOp1 = (fieldValue) => operand.value = fieldValue;

//Guarda la operacion actual
var setCurrentOperation = (operation, isDivision) => {
    currentOperation.operation = operation;
    currentOperation.isDivision = isDivision;
}

// Funciones para realizar operaciones aritmeticas
var add = (operand1, operand2) => operand1 + operand2;
var substract = (operand1, operand2) => operand1 - operand2;
var multiply = (operand1, operand2) => operand1 * operand2;
var divide = (operand1, operand2) => operand1 / operand2;

// Funciones visualizacion resultado  
var setResult = (result) => operationResult.innerText = result; 
var setError = (error) => errorMessage.innerText = error; 

//Funciones validacion de los operandos
var validOperand = (operand) => isNaN(operand) ? false : true;
var validDividend = (dividend) => dividend == 0 ? false : true; 

// Funcion que valida operando y ejecuta operacion aritmetica si es correcto
function performOperation(operation, isDivision = false, isResult = false)  {

    var operand = op1();    

    setError("");

    if (!validOperand(operand)) {
        setError("Se debe informar el operando con valor numerico");
    } else if (firstOperation) {
        if (isResult) {
            setResult(operand);
        } else {
            firstOperation = false;
            partialResult = operand;
            setCurrentOperation(operation, isDivision);
            setResult("");
        }
        setOp1("");
    } else if(currentOperation.isDivision && !validDividend(operand)) {
        setError("Dividendo no puede ser 0 en una division");
    } else { 
        if(isResult) {
            setResult(currentOperation.operation(partialResult, operand));
            firstOperation = true;
            setCurrentOperation("", false);
        } else {
            partialResult = currentOperation.operation(partialResult, operand);
            setCurrentOperation(operation, isDivision);
        }      
        setOp1("");
    }
}   

// Asocia eventos a botones de operaciones aritmeticas y lanza la validacion/operacion
document.getElementById("op-add").addEventListener("click", function() {performOperation(add)});
document.getElementById("op-substract").addEventListener("click", function() {performOperation(substract)});
document.getElementById("op-multiply").addEventListener("click", function() {performOperation(multiply)});
document.getElementById("op-divide").addEventListener("click", function() {performOperation(divide, true)});
document.getElementById("op-result").addEventListener("click", function() {performOperation(null, false, true)});