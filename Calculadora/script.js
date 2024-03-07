const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll(".botoes button");

let numAtual = "";
let primOperando = null;
let operador = null;
let reset = false;

function attResultado(originClear = false)
{ resultado.innerText = originClear ? 0 : numAtual.replace(".", ","); }

function addDigito(digit){
    if (digit === "," && (numAtual.includes(",") || !numAtual)) 
    {return;}

    if (reset){
        numAtual = digit;
        reset = false;
    }

    else
    {numAtual += digit;}

    attResultado();
}

function setOperador(newOperador){

    if(numAtual){
        calcular();

        primOperando = parseFloat(numAtual.replace(",", "."));
        numAtual = "";
    }

    operador = newOperador;
}

// Calcular
function calcular(){

    // 0 na tela
    if (operador === null || primOperando === null)
        {return;} 

    let segOperando = parseFloat(numAtual.replace(",", "."));
    let resValor;

    // Operações
    switch (operador)
    {
        case "+":
            resValor = primOperando + segOperando;
            break;
        case "-":
            resValor = primOperando - segOperando;
            break;
        case "*":
            resValor = primOperando * segOperando;
            break;    
        case "/":
            resValor = primOperando / segOperando;
            break;    
        
        default: return;
    }


    if(resValor.toString().split(".")[1]?.length > 5)
    {numAtual = parseFloat(resValor.toFixed(5).toString());}

    else
    {numAtual = resValor.toString();}


    // Limpar Tela
    operador = null;
    primOperando = null;
    reset = true;
    setarPorcentagem = null;
    attResultado();
}

// Botão C

function resetCalc() {
    numAtual = "";
    primOperando = null;
    operador = null;
    attResultado(true);
}

// Botão %

function setarPorcentagem(){
    let resultado = parseFloat(numAtual) / 100;

    if (["+", "-"].includes(operador))
    {resultado = resultado * (primOperando || 1);}

    if (resultado.toString().split(".") ?.lenght > 5)
    {resultado = resultado.toFixed(5).toString();}

    numAtual = resultado.toString();
    attResultado();
}


// FUNÇÃO MAIN

botoes.forEach((button) => {
    button.addEventListener("click", () => 
    {
        const botaoTXT = button.innerText;

        if (/^[0-9,]+$/.test(botaoTXT)) 
        {addDigito(botaoTXT);}

        else if (["+", "-", "*", "/"].includes(botaoTXT)) 
        {setOperador(botaoTXT);}

        else if (botaoTXT === "=")
        {calcular();}

        else if (botaoTXT === "C")
        {resetCalc();}

        else if (botaoTXT === "±"){
            numAtual = (parseFloat(numAtual || primOperando) * -1).toString();
            attResultado();
        }

        else if (botaoTXT === "%")
        {setarPorcentagem();}

    });
});


