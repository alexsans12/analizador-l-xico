export const simbolos = document.getElementById("table-data");
export const tablaDeSimbolos = [];
export let numberOfLines;

//Metodo que se encarga recuperar el texto (codigo) que hay en la etiqueta <textarea> del documento html
function getTextOfHMTL() {
    //Recuperamos el texto del documento html
    const texto = document.getElementById("code");
    //Organiza el texto en un array donde cada posicion es una linea
    const lineasCodigo = texto.value.split("\n");
    //Recuperamos los cadenaDeCodigo de cada linea
    tokenConstructor(lineasCodigo);
}

//Metodo para recuperar los cadenaDeCodigo de cada linea de texto
function tokenConstructor(lineasCodigo) {
    //Limpiamos todo dato que exista anteriormente
    //Recorremos cada linea
    numberOfLines = lineasCodigo.length;
    //console.log("El codigo tiene: " + numberOfLines + " lineas");
    for (var i = 0; i < lineasCodigo.length; i++) {
        //console.log("Se esta recorriendo la linea: " + i);
        //Recuperamos cada caracter de la linea
        for (var j = 0; j < lineasCodigo[i].length; j++) {
            //Si la cadena empieza con espacios o tabulaciones, se eliminan
            while (lineasCodigo[i][j] == " " || lineasCodigo[i][j] == "\t") {
                //Borrar espacios y tabulaciones
                lineasCodigo[i] = lineasCodigo[i].substring(1);
            }

            //! Si la linea empieza con un main, es una palabra reservada para inicio de la clase principal del programa
            if (lineasCodigo[i].substring(0, j + 4) == "main") {
                //Se agrega la palabra reservada a la tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "main",
                    "cmi"
                );
                j = j + 3;
                continue;
            }

            //! Si la linea empieza con un class, es una palabra reservada
            if (lineasCodigo[i].substring(0, j + 5) == "class") {
                //Recuperamos la palabra reservada
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "class",
                    "c"
                );
                j = j + 4;
                continue;
            }

            //! Si la linea empieza con un function, es una palabra reservada para crear funciones
            if (lineasCodigo[i].substring(0, j + 8) == "function") {
                //Recuperamos la palabra reservada
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "function",
                    "mi"
                );
                j = j + 7;
                continue;
            }

            //! Si existe la palabra reservada _init, indica el comienzo de una funcion o una clase
            if (lineasCodigo[i].substring(j, j + 5) == "_init") {
                //Recuperamos la palabra reservada
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "_init",
                    "ci"
                );
                j = j + 4;
                continue;
            }

            //! Si existe la palabra reservada args, entonces se refiere a los argumentos de una clase
            if (lineasCodigo[i].substring(j, j + 4) == "args") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "args",
                    "arg"
                );
                j = j + 3;
                continue;
            }
            //! Si la linea empieza con la palabra var, es una palabra reservada
            if (lineasCodigo[i].substring(j, j + 3) == "var") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "var",
                    "iVar"
                );
                j = j + 2;
                continue;
            }

            //! Si existe la palabra reservada end_class, entonces se refiere al final de la clase
            if (lineasCodigo[i].substring(j, j + 9) == "end_class") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "end_class",
                    "fc"
                );
                j = j + 8;
                continue;
            }

            //! Si se encuentra la palabra end_for, es el fin de la estructura de control "for"
            if (lineasCodigo[i].substring(j, j + 7) == "end_for") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "estructura de control",
                    "end_for",
                    "edcFR"
                );
                j = j + 6;
                continue;
            }

            //! Si la linea empieza con la palabra end_ife, es el fin de la estructura de control "if else"
            if (lineasCodigo[i].substring(j, j + 7) == "end_ife") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "estructura de control",
                    "end_ife",
                    "edcFS"
                );
                j = j + 6;
                continue;
            }

            //! Si existe la palabra reservada end, entonces se refiere a el termino de declaracion de variables, funciones, etc
            if (lineasCodigo[i].substring(j, j + 3) == "end") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "end",
                    "fcm"
                );
                j = j + 2;
                continue;
            }

            //! Si se encuentra el caracter f y, este indicara los ciclos de un for
            if (lineasCodigo[i].substring(j, j + 1) == "f" && lineasCodigo[i].substring(j + 1, j + 2) == "&") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "f para fin de ripetere",
                    "fRip"
                );
                continue;
            }

            // ******************* FUNCIONES PREDEFINIDAS ***********************/
            //! Si la linea empieza con la palabra print, es una funcion predefinida
            if (lineasCodigo[i].substring(j, j + 5) == "print") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "funcion",
                    "print",
                    "mfSt"
                );
                j = j + 4;
                continue;
            }

            //! Si la linea empieza con la palabra ricevere, es una funcion predefinida
            if (lineasCodigo[i].substring(j, j + 5) == "input") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "funcion",
                    "input",
                    "mfRi"
                );
                j = j + 4;
                continue;
            }

            //! Si la linea empieza con la palabra call, es una funcion predefinida
            if (lineasCodigo[i].substring(j, j + 4) == "call") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "funcion",
                    "call",
                    "mfCh"
                );
                j = j + 3;
                continue;
            }
            //!Si la linea empieza con la palabra pow, es una funcion predefinida
            if (lineasCodigo[i].substring(j, j + 3) == "pow") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "funcion",
                    "pow",
                    "mfPo"
                );
                j = j + 2;
                continue;
            }

            //**********************Estructuras de control -  Sentencias******************************/
            //!Si la linea empieza con la palabra for, es la estructura de control "for"
            if (lineasCodigo[i].substring(j, j + 3) == "for") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "estructura de control",
                    "for",
                    "edcR"
                );
                j = j + 2;
                continue;
            }

            //!Si la linea empieza con la palabra se, es la estructura de control "if"
            if (lineasCodigo[i].substring(j, j + 2) == "if") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "estructura de control",
                    "if",
                    "edcSe"
                );
                j = j + 1;
                continue;
            }
            //!Si la linea empieza con la palabra else, es la estructura de control "else"
            if (lineasCodigo[i].substring(j, j + 4) == "else") {
                //Guardamos la palabra reservada en nuestra tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "estructura de control",
                    "else",
                    "edcAl"
                );
                j = j + 3;
                continue;
            }

            //******************************OPERADORES ARITMETICOS**************************************
            //!Si encuentra el simbolo +, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == "+") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    "+",
                    "oa+"
                );
                continue;
            }
            //!Si encuentra el simbolo -, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == "-") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    "-",
                    "oa-"
                );
                continue;
            }
            //!Si encuentra el simbolo *, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == "*") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    "*",
                    "oa*"
                );
                continue;
            }
            //!Si encuentra el simbolo /, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == "/") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    "/",
                    "oa/"
                );
                continue;
            }
            //!Si encuentra el simbolo %, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == "%") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    "%",
                    "oa%"
                );
                continue;
            }
            //!Si encuentra el simbolo (, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == "(") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    "(",
                    "oa("
                );
                continue;
            }
            //!Si encuentra el simbolo (, es un operador aritmetico
            if (lineasCodigo[i].charAt(j) == ")") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador aritmetico",
                    ")",
                    "oa)"
                );
                continue;
            }
            //******************************OPERADORES RELACIONALES**************************************
            //!Si encuentra el simbolo <=, es un operador relacional
            if (lineasCodigo[i].substring(j, j + 2) == "<=") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador relacional",
                    "<=",
                    "or<="
                );
                j = j + 1;
                continue;
            }
            //!Si encuentra el simbolo >=, es un operador relacional
            if (lineasCodigo[i].substring(j, j + 2) == ">=") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador relacional",
                    ">=",
                    "or>="
                );
                j = j + 1;
                continue;
            }

            //!Si encuentra el simbolo <, es un operador relacional
            if (lineasCodigo[i].charAt(j) == "<") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador relacional",
                    "<",
                    "or<"
                );
                continue;
            }
            //!Si encuentra el simbolo >, es un operador relacional
            if (lineasCodigo[i].charAt(j) == ">") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador relacional",
                    ">",
                    "or>"
                );
                continue;
            }
            //!Si encuentra el simbolo ==, es un operador relacional
            if (lineasCodigo[i].charAt(j) == "==") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador relacional",
                    "==",
                    "or=="
                );
                continue;
            }
            //!Si encuentra el simbolo !=, es un operador relacional
            if (lineasCodigo[i].charAt(j) == "!=") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador relacional",
                    "!=",
                    "or!="
                );
                continue;
            }

            //******************************OPERADOR DE ASIGNACION**************************************

            //!Si encuentra el simbolo =, es una asignacion
            if (lineasCodigo[i].charAt(j) == "=") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "asignacion",
                    "=",
                    "asig="
                );
                continue;
            }

            //*******************************OPERADORES LOGICOS******************************* */
            //! Si encuentra el simbolo &&, es un operador logico
            if (lineasCodigo[i].charAt(j) == "&") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador logico",
                    "&&",
                    "ol&"
                );
                continue;
            }

            //! Si encuentra el simbolo ||, es un operador logico
            if (lineasCodigo[i].charAt(j) == "||") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador logico",
                    "||",
                    "ol|"
                );
                continue;
            }

            //! Si encuentra el simbolo !, es un operador logico
            if (lineasCodigo[i].charAt(j) == "!") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "operador logico",
                    "!",
                    "ol!"
                );
                continue;
            }
            //*******************************CARACTERES VARIADOS******************************* */

            //! Si encuentra el simbolo (
            if (lineasCodigo[i].charAt(j) == "[") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "remp parentesis",
                    "[",
                    "rp:"
                );
                continue;
            }

            //! Si encuentra el simbolo )
            if (lineasCodigo[i].charAt(j) == "]") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "remp parentesis",
                    "]",
                    "rp:"
                );
                continue;
            }

            //!Si la linea tiene una :, es el comienzo de una funcion o clase
            if (lineasCodigo[i].charAt(j) == ":") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "I/O de metod o class",
                    ":",
                    "io"
                );
                continue;
            }
            //!Si encuentra el simbolo ;, es el fin de una linea de codigo
            if (lineasCodigo[i].charAt(j) == ";") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "fin de linea",
                    ";",
                    "fin?"
                );
                continue;
            }
            //!Si encuentra el simbolo ,, es la separacion de variables o parametros
            if (lineasCodigo[i].charAt(j) == ",") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "separacion",
                    ",",
                    "sep,"
                );
                continue;
            }
            //!Si la linea empieza con un #, es un comentario
            if (lineasCodigo[i].substring(j, j + 1) === "#") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "comentario",
                    "#",
                    "com"
                );
                break;
            }

            //****************************TIPOS DE DATO***************************************** */
            //!Si encuentra la palabra int, es una palabra reservada para definir enteros
            if (lineasCodigo[i].substring(j, j + 3) == "int") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "int",
                    "tdT"
                );
                j = j + 2;
                continue;
            }
            //!Si encuentra la palabra float, es una palabra reservada para definir flotantes
            if (lineasCodigo[i].substring(j, j + 5) == "float") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "float",
                    "tdP"
                );
                j = j + 4;
                continue;
            }
            //!Si encuentra la palabra string, es una palabra reservada para definir cadenas
            if (lineasCodigo[i].substring(j, j + 6) == "string") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "string",
                    "tdC"
                );
                j = j + 5;
                continue;
            }
            //!Si encuentra la palabra bool, es una palabra reservada para definir booleanos
            if (lineasCodigo[i].substring(j, j + 4) == "bool") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "bool",
                    "tdB"
                );
                j = j + 3;
                continue;
            }

            //!Si encuentra la palabra TRUE, es una palabra reservada para definir booleanos verdaderos
            if (lineasCodigo[i].substring(j, j + 4) == "TRUE") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "TRUE",
                    "tdV"
                );
                j = j + 3;
                continue;
            }
            //!Si encuentra la palabra FALSE, es una palabra reservada para definir booleanos falsos
            if (lineasCodigo[i].substring(j, j + 5) == "FALSE") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "FALSE",
                    "tdF"
                );
                j = j + 4;
                continue;
            }
            //! Si encuentra la palabra return, es una palabra reservada para definir retornos
            if (lineasCodigo[i].substring(j, j + 6) == "return") {
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "palabra reservada",
                    "return",
                    "tdR"
                );
                j = j + 5;
                continue;
            }

            //******************* CONSTANTES, VARIABLES, NOMBRES Y CADENAS***********************/
            //!Si se encuentran numeros, entonces es un numero
            if (/[0-9]/.test(lineasCodigo[i].charAt(j))) {
                //Recuperamos el numero
                let numero = "";
                let puntos = 0;
                while (/[0-9.]/.test(lineasCodigo[i].charAt(j))) {
                    //Recuperamos el numero

                    numero += lineasCodigo[i][j];
                    //!Si encuentra un punto, es un flotante
                    //Si encuentra mas de un punto el programa ciclo finaliza
                    if (lineasCodigo[i].charAt(j) == ".") {
                        puntos++;
                    }
                    j++;
                }
                if (puntos > 1) {
                    //console.error("Error: Existe mas de un punto");
                    construirTablaDeSimbolos(
                        i + 1,
                        j + 1,
                        "token no reconocido",
                        numero,
                        "tokenErr"
                    );

                    j--;
                    continue;
                }
                //Guardamos el numero en la tabla de simbolos
                if (puntos == 1) {
                    construirTablaDeSimbolos(
                        i + 1,
                        j + 1,
                        "numero Flotante",
                        numero,
                        "numF"
                    );
                } else {
                    construirTablaDeSimbolos(
                        i + 1,
                        j + 1,
                        "numero Entero",
                        numero,
                        "numE"
                    );
                }
                j--;
                continue;
            }

            //!Si encuentra el simbolo $, es el inicio del nombre de una variable que solo contiene letras y numeros
            if (lineasCodigo[i].charAt(j) == "$") {
                let nombreVariable = "$";
                while (/[a-zA-Z0-9]/.test(lineasCodigo[i].charAt(j + 1))) {
                    j++;
                    nombreVariable += lineasCodigo[i].charAt(j);
                }
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "nombre de variable",
                    nombreVariable,
                    "nVar"
                );
                continue;
            }

            //!Si encuentra el simbolo ", es una cadena de texto
            if (lineasCodigo[i].charCodeAt(j) == 34) {
                let cadena = "";
                while (lineasCodigo[i].charAt(j + 1) != '"') {
                    j++;
                    cadena += lineasCodigo[i].charAt(j);
                }
                construirTablaDeSimbolos(
                    i + 1,
                    j + 1,
                    "cadena de texto",
                    cadena,
                    "cad"
                );
                j++;
                continue;
            }

            //!Si existen letras en la linea y no empiezan con $ o #, entonces es el nombre de la clase o metodo
            if (
                lineasCodigo[i][j] != "$" &&
                lineasCodigo[i][j] != "#" &&
                /[a-zA-Z]/.test(lineasCodigo[i].charAt(j))
            ) {
                let nombreClaseMetodo = "";
                while (/[a-zA-Z0-9]/.test(lineasCodigo[i].charAt(j))) {
                    //Recuperamos el nombre de la clase o metodo
                    nombreClaseMetodo += lineasCodigo[i][j];
                    j++;
                }
                //Guardamos el nombre de la clase o metodo en la tabla de simbolos
                construirTablaDeSimbolos(
                    i + 1,
                    j - nombreClaseMetodo.length,
                    "nombre de clase o metodo",
                    nombreClaseMetodo,
                    "nCM"
                );
                j = j-1;
                continue;
            }
            //******************* ELIMINADOR DE ESPACIOS ***********************/

            if (lineasCodigo[i] == " ") {
                continue;
            }

            //!Si encuentra un caracter no reconocido, es un token no reconocido
            //Entra en un ciclo hasta que el siguiente caracter sea un espacio un tabulador un salto de linea o el final de la linea
            let tokenNoReconocido = "";
            while (
                lineasCodigo[i].charAt(j) != " " &&
                lineasCodigo[i].charAt(j) != "\t" &&
                lineasCodigo[i].charAt(j) != "\n" &&
                j < lineasCodigo[i].length &&
                lineasCodigo[i].charAt(j) != ""
            ) {
                tokenNoReconocido += lineasCodigo[i][j];
                j++;
            }
            construirTablaDeSimbolos(
                i + 1,
                j + 1,
                "token no reconocido",
                tokenNoReconocido,
                "tokenErr"
            );
        }
    }
    //console.log("Termino de recorrer el texto y recuperar tokens");
    //console.log(tablaDeSimbolos);
}

//Metodo para construir los objetos de la tabla de simbolos
function construirTablaDeSimbolos(_linea, _columna, _tipo, _token, _opCode) {
    //insertamos un nuevo objeto en la tabla de simbolos
    tablaDeSimbolos.push({
        linea: _linea,
        columna: _columna,
        tipo: _tipo,
        token: _token,
        opCode: _opCode,
    });
}

//Metodo para imrpimir la tabla de simbolos en una tabla html
function showTablesOnHTML() {
    let tabla = document.getElementById("table-data");
    //Recorremos la tabla de simbolos
    for (let i = 0; i < tablaDeSimbolos.length; i++) {
        let linea = tablaDeSimbolos[i].linea;
        let columna = tablaDeSimbolos[i].columna;
        let tipo = tablaDeSimbolos[i].tipo;
        let token = tablaDeSimbolos[i].token;
        let opCode = tablaDeSimbolos[i].opCode;

        tabla.insertRow(-1).innerHTML =
            "<td>" +
            linea +
            "</td><td>" +
            tipo +
            "</td><td>" +
            token +
            "</td>" +
            "<td>" +
            opCode +
            "</td>";
    }
}

//Metodo para limpiar la tabla de simbolos y de datos de el html
function cleanTables() {
    var srowCount = simbolos.rows.length;

    let i = 1;
    while (srowCount - 1 != i) {
        simbolos.deleteRow(srowCount - i);
        i++;
    }
}

//funcion principal que llama a todas las funciones
export function mainLexico() {
    numberOfLines = 0;
    //Recuperamos el texto del editor
    getTextOfHMTL();
    //Recuperamos los tokens, este metodo se manda a llamar desde el anterior

    //Mostramos las tablas en el html
    showTablesOnHTML();
}
