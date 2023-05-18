import { simbolos, mainLexico, tablaDeSimbolos } from "./analizadorLexico.js";
import { mainSintactico, tablaDeFunciones, tablaDeVariables } from "./analizadorSintactico.js";
import { mainSemantico } from "./analizadorSemantico.js";

//Variables Globales para trabajar nuestro lenguaje de programacion
const form = document.querySelector(".form");
const textarea = document.querySelector(".form textarea");

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if(textarea.value.trim() === "") {
        showAlert("No se puede analizar un texto vacío");
    } else {
        limpiarFlujoDeTrabajo();
        mainLexico();
        mainSintactico();
        mainSemantico();
    }
});

document.addEventListener("DOMContentLoaded", init());
function init() {
    limpiarFlujoDeTrabajo();
}

function showAlert(message) {
    const errorAlert = document.getElementById('errorAlert');
    errorAlert.classList.remove('hidden');
    errorAlert.textContent = message;

    setTimeout(() => {
        errorAlert.classList.add('hidden');
    }, 3000);
}

//Funcion para limpiar la consola de errores Sintacticos
function limpiarFlujoDeTrabajo() {
    document.getElementById("error").value = "";
    document.getElementById("error").style.borderColor = "transparent";
    tablaDeFunciones.length = 0;
    tablaDeVariables.length = 0;
    tablaDeSimbolos.length = 0;

    //var consola = document.getElementById("consola");
    //Limpiar consola
    //consola.value = "";

    var srowCount = simbolos.rows.length;

    let i = 1;
    while (srowCount - 1 != i) {
        simbolos.deleteRow(srowCount - i);
        i++;
    }
}
