// Obtener elementos del formulario
const nombreInput = document.getElementById('nombre');
const numeroInput = document.getElementById('numero');
const fechaInput = document.getElementById('fecha');
const cvvInput = document.getElementById('cvv');
const enviarButton = document.querySelector('input[type="submit"]');

// Expresiones regulares
const regexName = /(MasterCard|Visa|American Express)/i;
let tarjetaValidada;
let regexMasterCard = /^(51|52|53|54|55)\d{14}$/;
let regexVisa = /^4\d{12}(\d{3})?$/;
let regexAE = /^(34|37)\d{13}$/;
const regexFecha = /^(0[1-9]|1[0-2])\/\d{2}$/;
const regexCVV = /^[0-9]{3}$/;
let regexNumero;

// Mensajes de comprobación
const mensajes = {nombre: "Solo tendrá letras y espacios en blanco, un total de 20 carácteres",
                  numero: "El número de tarjeta debe ser valido para MasterCard, Visa, American Express",
                  fecha: "Debe ser en formato MM/AA",
                  cvv: "Solo se pueden 3 dígitos"};

// Aplica estilos a los inputs
function estilos(campo, validado){
    campo.style.border= validado ? '2px solid green' : '2px solid red';
}

function habilitarFormulario() {
    const nombreValidado = regexName.test(nombreInput.value);

    if (nombreInput.value.toUpperCase() == "MASTERCARD"){
        tarjetaValidada = regexMasterCard.test(numeroInput.value);
    } else if (nombreInput.value.toUpperCase() == "VISA"){
        tarjetaValidada = regexVisa.test(numeroInput.value);
    } else if (nombreInput.value.toUpperCase() == "AMERICAN EXPRESS"){
        tarjetaValidada = regexAE.test(numeroInput.value);
    }

    const fechaValidada = regexFecha.test(fechaInput.value);

    const cvvValidado = regexCVV.test(cvvInput.value);


    if (nombreValidado && tarjetaValidada && cvvValidado && fechaValidada) {
        enviarButton.disabled = false;
    } else {
        enviarButton.disabled = true;
    }
}

function validarNombre(){
    const nombreValidado = regexName.test(nombreInput.value);

    estilos(nombreInput, nombreValidado);

    mostrarMensaje(nombreInput, nombreValidado, "nombre");

    habilitarFormulario();

}

function validarNumero(){
    if (nombreInput.value.toUpperCase() == "MASTERCARD"){
        tarjetaValidada = regexMasterCard.test(numeroInput.value);
    } else if (nombreInput.value.toUpperCase() == "VISA"){
        tarjetaValidada = regexVisa.test(numeroInput.value);
    } else if (nombreInput.value.toUpperCase() == "AMERICAN EXPRESS"){
        tarjetaValidada = regexAE.test(numeroInput.value);
    }

    estilos(numeroInput, tarjetaValidada);

    mostrarMensaje(numeroInput, tarjetaValidada, "numero");

    habilitarFormulario();
}

function validarFecha(){
    const fechaValidada = regexFecha.test(fechaInput.value);

    estilos(fechaInput, fechaValidada);

    mostrarMensaje(fechaInput, fechaValidada, "fecha");
    
    habilitarFormulario();
}

function validarCVV(){
    const cvvValidado = regexCVV.test(cvvInput.value);

    estilos(cvvInput, cvvValidado);

    mostrarMensaje(cvvInput, cvvValidado, "cvv");

    habilitarFormulario();
}


function mostrarMensaje(input, esValidado, campo) {

    //input.parentNode.appendChild(document.createElement("small")).innerHTML = esValidado ? "" : mensajes[campo];

    let smallElement = input.parentNode.querySelector("small");
    if (!esValidado) {
        if (!smallElement) {
            smallElement = document.createElement("small");
            input.parentNode.appendChild(smallElement);
        }
        smallElement.innerHTML = mensajes[campo];
    } else {
        if (smallElement) {
            smallElement.remove();
        }
    }

}

nombreInput.addEventListener('blur', validarNombre);
numeroInput.addEventListener('blur', validarNumero);
fechaInput.addEventListener('blur', validarFecha);
cvvInput.addEventListener('blur',validarCVV);

// Deshabilitar el botón de envío al cargar la página
enviarButton.disabled = true;