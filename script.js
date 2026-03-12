const id_mascota= ["hipodoge", "capipepo", "ratigueya", "langostelvis", "tucapalma", "pydos"];
const ataques= {"agua":"fuego", "fuego":"tierra", "tierra":"agua"};
const IMAGENES_MOKEPON = {
    'hipodoge': './sources/1.png',
    'capipepo': './sources/2.png',
    'ratigueya': './sources/3.png',
    'langostelvis': './sources/4.png',
    'tucapalma': './sources/5.png',
    'pydos': './sources/6.png'
};
const llavesAtaques= Object.keys(ataques);
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {

    let elegirMascotaJugador = document.getElementById("button_seleccionar_mascota")
    elegirMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    let sectionReiniciar = document.getElementById("reiniciar")
    let primeraPantalla = document.getElementById("primerScreen")
    let buttonLog = document.getElementById("button_log")
    let sectionMensajes = document.getElementById("mensajes")
    sectionMensajes.classList.toggle('oculto'); 

    let botonFuego = document.getElementById("button_fuego")
    let botonAgua = document.getElementById("button_agua")
    let botonTierra = document.getElementById("button_tierra")
    let botonReiniciar = document.getElementById("button_reiniciar")
    let buttonAtras = document.getElementById("button_atras")
    let contenedorMensajes = document.getElementById("contenedor_mensajes")
    contenedorMensajes.classList.toggle('oculto');


    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    primeraPantalla.style.display = "none"


    buttonLog.addEventListener("click", toggleLog)
    buttonAtras.addEventListener("click", atrasPantalla)



    botonReiniciar.addEventListener("click", () => location.reload())
 
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
        
    
}

function seleccionarMascotaJugador() {

    let sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    let primeraPantalla = document.getElementById("primerScreen")
    let sectionMensajes = document.getElementById("mensajes")

   
    let inputMascotaSeleccionada= id_mascota.find(mascota => document.getElementById(mascota).checked);
    let indiceRandom  = Math.floor(Math.random() * id_mascota.length);
    const spanMascotaJugador = document.getElementById("nombre_mascota_jugador");
    const spanMascotaEnemigo = document.getElementById("nombre_mascota_oponente");
    
    const imgMascotaJugador = document.getElementById("img_mascota_jugador");
    const imgMascotaEnemigo = document.getElementById("img_mascota_enemigo");

    if (inputMascotaSeleccionada) {   
        sectionSeleccionarMascota.style.display = "none"
        sectionSeleccionarAtaque.style.display = "flex"
        primeraPantalla.style.display = "flex"
     
       spanMascotaJugador.innerHTML = inputMascotaSeleccionada
       spanMascotaEnemigo.innerHTML = id_mascota[indiceRandom]  
       imgMascotaJugador.src = IMAGENES_MOKEPON[inputMascotaSeleccionada]
       imgMascotaEnemigo.src = IMAGENES_MOKEPON[id_mascota[indiceRandom]]
        sectionMensajes.classList.toggle('oculto'); 
    }
        else {  
        alert("Selecciona una mascota ahora ");
       
    }       
}


function ataqueFuego() {    ataqueJugador = "fuego"
    ataqueEnemigo = seleccionadorAtaqueEnemigo()
    combate()
    
}
function ataqueAgua() { ataqueJugador = "agua" 
    ataqueEnemigo = seleccionadorAtaqueEnemigo()
    combate()
    
}             
function ataqueTierra() { ataqueJugador = "tierra" 
    ataqueEnemigo = seleccionadorAtaqueEnemigo()
    combate()
}

function seleccionadorAtaqueEnemigo() {
    return ataques[llavesAtaques[Math.floor(Math.random() * llavesAtaques.length)]]
}   

function crearMensaje(resultado) {
    let sectionMensajes= document.getElementById("contenedor_mensajes")
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu mascota atacó con <b>" + ataqueJugador + "</b>, la mascota del enemigo atacó con " + ataqueEnemigo + " - " + resultado

    sectionMensajes.appendChild(parrafo)
}

function combate() {

    let spanVidasJugador = document.getElementById("vidas_jugador")
    let spanVidasEnemigo = document.getElementById("vidas_oponente")
    let resultadoRonda=""

    let tarjetaJugador = document.querySelector(".tarjeta_mascota_jugador")
    let tarjetaEnemigo = document.querySelector(".tarjeta_mascota_enemigo")

    tarjetaJugador.classList.add(`animar-${ataqueJugador}`)
    tarjetaEnemigo.classList.add(`animar-${ataqueEnemigo}`);

    mostrarPopUpAtaque("popup_ataque_jugador", "texto_ataque_jugador", ataqueJugador);
    mostrarPopUpAtaque("popup_ataque_enemigo", "texto_ataque_enemigo", ataqueEnemigo);

    setTimeout(() => {
        tarjetaJugador.classList.remove(`animar-${ataqueJugador}`);
        tarjetaEnemigo.classList.remove(`animar-${ataqueEnemigo}`);

        ocultarPopUpAtaque("popup_ataque_jugador");
        ocultarPopUpAtaque("popup_ataque_enemigo");

        if (ataqueJugador == ataqueEnemigo) {
                resultadoRonda = "Empate"
                crearMensaje("Empate")

            }
            else if (ataques[ataqueJugador] == ataqueEnemigo) {
                resultadoRonda = "Ganaste"

                crearMensaje("Ganaste") 
                vidasEnemigo--
                spanVidasEnemigo.innerHTML = vidasEnemigo
            }   
            else{
                resultadoRonda = "Perdiste"
                crearMensaje("Perdiste")
                vidasJugador--
                spanVidasJugador.innerHTML = vidasJugador
                
            }



            // Mostramos el pop-up central
            mostrarPopUp(resultadoRonda);
            // Guardamos el mensaje en el log silenciosamente
            crearMensaje(resultadoRonda);



            // Evaluamos si el juego terminó (dejamos tu función mensajeFinal casi intacta por ahora)
            if (vidasJugador == 0 || vidasEnemigo == 0) {
                // Un pequeño retraso para que veamos el mensaje de ronda antes del mensaje final
                setTimeout(mensajeFinal, 2000); 
            }

        }, 1000);
}

function mensajeFinal() {
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "block"

    let botonFuego = document.getElementById("button_fuego")
    let botonAgua = document.getElementById("button_agua")
    let botonTierra = document.getElementById("button_tierra")

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true



    let sectionMensajes= document.getElementById("mensajes")
    let parrafo = document.createElement("p")
    
            // Mostramos el pop-up central
    
    mostrarPopUp("El juego ha terminado: ");
    setTimeout(() => {  mostrarPopUp(vidasJugador > vidasEnemigo ? "¡Ganaste el juego!" : "¡Perdiste el juego!");}, 1500); 
  

    parrafo.innerHTML = vidasJugador > vidasEnemigo ? "¡Ganaste el juego!" : "¡Perdiste el juego!"
    sectionMensajes.appendChild(parrafo)
}  

function atrasPantalla() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    let sectionReiniciar = document.getElementById("reiniciar")
    let primeraPantalla = document.getElementById("primerScreen")
    let sectionMensajes = document.getElementById("mensajes")
    sectionMensajes.classList.toggle('oculto');


    setElementStyles(sectionSeleccionarMascota, {
        display: 'flex',
        flexDirection: 'column'
    });
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    primeraPantalla.style.display = "none"
}

function setElementStyles(elemento, estilos) {
    Object.assign(elemento.style, estilos);
}


function toggleLog() {
    let sectionMensajes = document.getElementById("contenedor_mensajes");
    let buttonLog = document.getElementById("button_log");

    // Cambiamos la visibilidad
    sectionMensajes.classList.toggle('oculto'); 
    
    // Si el log se acaba de mostrar, nos desplazamos hacia él
    if (!sectionMensajes.classList.contains('oculto')) {
        buttonLog.innerText = "Ocultar Log";
        
        // Esta es la línea mágica de Ingeniería Web:
        sectionMensajes.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        buttonLog.innerText = "Ver Log de Batalla";
    }
}

// --- NUEVA FUNCIÓN PARA CONTROLAR EL POP-UP ---
function mostrarPopUp(resultado) {
    let divMensaje = document.getElementById("mensaje_ronda");
    let textoMensaje = document.getElementById("texto_ronda");

    // Ponemos el texto (Ej: "Ganaste", "Perdiste", "Empate")
    textoMensaje.innerHTML = resultado;

    // Quitamos la clase de oculto y ponemos la visible
    divMensaje.classList.remove("popup-oculto");
    divMensaje.classList.add("popup-visible");

    // Le damos 1.5 segundos (1500ms) para que el jugador lo lea, y lo volvemos a ocultar
    setTimeout(() => {
        divMensaje.classList.remove("popup-visible");
        divMensaje.classList.add("popup-oculto");
    }, 1500);
}


function mostrarPopUpAtaque(idContenedor, idTexto, ataque) {
    let divMensaje = document.getElementById(idContenedor);
    let textoMensaje = document.getElementById(idTexto);
    
    // Le podemos agregar un emoji dependiendo del ataque para que se vea más cool
    let emoji = ataque === "fuego" ? "🔥" : ataque === "agua" ? "💧" : "🍃";
    textoMensaje.innerHTML = `${ataque} ${emoji}`;

    divMensaje.classList.remove("popup-oculto");
    divMensaje.classList.add("popup-visible");
}

function ocultarPopUpAtaque(idContenedor) {
    let divMensaje = document.getElementById(idContenedor);
    divMensaje.classList.remove("popup-visible");
    divMensaje.classList.add("popup-oculto");
}






window.addEventListener("load", iniciarJuego);