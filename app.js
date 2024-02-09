//arreglos (arrays) --> datos repetibles, maneja en una caja mayor, multiples cajas pequeñas, pero la referencia es a la caja mayor
//usar corchetes indica a JS que es una variable estructirada
//variable.push me indica que numeros van a ser los sorteados y se va añadiendo a la lista
//variable.length --> me indica el tamaño de la lista
//como accesar a un elemento en particular --> indice (posición) --> el primer elemento/posición es 0, si mis lista es 5,8, la posición 0 (inicial) es 5
//la lista que está en MDN (Manejo de Lista)
//TODOS LOS ARREGLOS INICIAN CON POSICIÓN 0

//letNumerosSorteados[];
//console.log(numerosSorteados); indica que es una lista
//agregar elementos al final de la lista --> numerosSorteados.push(5);
//numerosSorteados.push(8);
//console.log(numerosSorteados.length);
//console.log(numerosSorteados[0]); --> en []se pone la posición
//posición 0 es el primer elemento

//para saber la última posición en la lista se pone lo de abajo
//console.log(numerosSorteados[numerosSorteados.length-1]) --> poner que queres el tamaño d ela lista -1 para la última posición
// Ctrl + F para buscar

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;  //cambiar los 10 por numeroMaximo



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //cuando entre al juego, voy a jugar 3 rondas apachando nuevo juego
        //con cada nuevo juego, me agrega el número anterior a la lista para no volver a sacarlo
        //Si el numero generado está incluido en la lista 
        //includes ve si el número ya está existe en la lista
        //recursividad--> usar la misma función n de veces

        //sin embargo al llegar a generar del 1-10, entra en error y hay que saber quebrar ese ciclo de autollamado
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();  //se llama a si misma para volver a crear un numero aleatorio si saca un número ya existente
        } else {
            listaNumerosSorteados.push(numeroGenerado); //se coloca elemento al final para que quede guardado en lista
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();