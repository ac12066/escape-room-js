// Utilidades globales y funciones reutilizables

// Almacena los estados del juego
const estadoJuego = {
    nivel1Completado: false,
    nivel2Completado: false,
    nivel3Completado: false,
    nivel4Completado: false,
    nivel5Completado: false,
    ubicacionActual: null,
    fotoCapturada: null,
    resultadoNivel4: null,
    resultadoNivel5: null
};

// Obtiene el estado del localStorage
function obtenerEstadoGuardado() {
    const estado = localStorage.getItem('estadoEscapeRoom');
    if (estado) {
        return JSON.parse(estado);
    }
    return estadoJuego;
}

// Guarda el estado en localStorage
function guardarEstado() {
    localStorage.setItem('estadoEscapeRoom', JSON.stringify(estadoJuego));
}

// Actualiza el indicador de progreso general
function actualizarBarraProgreso() {
    const nivelesCompletados = [
        estadoJuego.nivel1Completado,
        estadoJuego.nivel2Completado,
        estadoJuego.nivel3Completado,
        estadoJuego.nivel4Completado,
        estadoJuego.nivel5Completado
    ].filter(Boolean).length;

    const porcentaje = (nivelesCompletados / 5) * 100;
    const barra = document.getElementById('barraProgreso');
    barra.style.width = porcentaje + '%';
    barra.textContent = Math.round(porcentaje) + '%';
}

// Muestra una alerta de exito
function mostrarExito(mensaje) {
    const div = document.createElement('div');
    div.className = 'exito-mensaje';
    div.textContent = mensaje;
    return div;
}

// Muestra una alerta de error
function mostrarError(mensaje) {
    const div = document.createElement('div');
    div.className = 'error-mensaje';
    div.textContent = mensaje;
    return div;
}

// Genera datos simulados para procesamiento
function generarDatos(cantidad, tipoTemperatura = false) {
    const datos = [];
    for (let i = 0; i < cantidad; i++) {
        if (tipoTemperatura) {
            datos.push({
                id: i + 1,
                temperatura: Math.random() * 100,
                humedad: Math.random() * 100
            });
        } else {
            datos.push({
                id: i + 1,
                temperatura: (Math.random() * 200) - 100,
                presion: (Math.random() * 200) - 100
            });
        }
    }
    return datos;
}

// Convierte objeto a JSON descargable
function descargarJSON(datos, nombreArchivo = 'datos.json') {
    const json = JSON.stringify(datos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
}

// Espera un tiempo determinado (util para demostraciones)
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Formatea numeros a dos decimales
function formatearNumero(numero, decimales = 2) {
    return Number(numero).toFixed(decimales);
}

// Obtiene la fecha y hora actual como string
function obtenerFechaActual() {
    const ahora = new Date();
    return ahora.toLocaleString('es-ES');
}

// Limpia un contenedor HTML
function limpiarContenedor(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.innerHTML = '';
    }
}

// Crea una card de resultado
function crearCardResultado(titulo, datos) {
    const div = document.createElement('div');
    div.className = 'resultado-card';
    
    let html = `<h4>${titulo}</h4>`;
    
    if (Array.isArray(datos)) {
        datos.forEach(dato => {
            html += `<div class="resultado-dato"><strong>${dato.label}:</strong> ${dato.valor}</div>`;
        });
    } else {
        for (const [clave, valor] of Object.entries(datos)) {
            html += `<div class="resultado-dato"><strong>${clave}:</strong> ${valor}</div>`;
        }
    }
    
    div.innerHTML = html;
    return div;
}

// Habilita un boton de nivel
function habilitarBotonNivel(numero) {
    const boton = document.getElementById(`btnNivel${numero}`);
    if (boton) {
        boton.disabled = false;
    }
}

// Desactiva seccion y habilita siguiente
function cambiarSeccion(nivelActual, nivelSiguiente) {
    const seccionActual = document.getElementById(`seccionNivel${nivelActual}`);
    const seccionSiguiente = document.getElementById(`seccionNivel${nivelSiguiente}`);
    
    if (seccionActual) {
        seccionActual.style.display = 'none';
    }
    
    if (seccionSiguiente) {
        seccionSiguiente.style.display = 'block';
    }
    
    habilitarBotonNivel(nivelSiguiente);
}

// Determina el nivel completado actual
function obtenerNivelActual() {
    if (estadoJuego.nivel1Completado && !estadoJuego.nivel2Completado) return 2;
    if (estadoJuego.nivel2Completado && !estadoJuego.nivel3Completado) return 3;
    if (estadoJuego.nivel3Completado && !estadoJuego.nivel4Completado) return 4;
    if (estadoJuego.nivel4Completado && !estadoJuego.nivel5Completado) return 5;
    if (estadoJuego.nivel5Completado) return 'completado';
    return 1;
}

// Crea resultado en formato JSON para exportar
function crearResultadoJSON() {
    return {
        fechaCompletacion: obtenerFechaActual(),
        nivel1: {
            completado: estadoJuego.nivel1Completado,
            ubicacion: estadoJuego.ubicacionActual
        },
        nivel2: {
            completado: estadoJuego.nivel2Completado
        },
        nivel3: {
            completado: estadoJuego.nivel3Completado,
            fotoCapturada: estadoJuego.fotoCapturada ? true : false
        },
        nivel4: {
            completado: estadoJuego.nivel4Completado,
            resultados: estadoJuego.resultadoNivel4
        },
        nivel5: {
            completado: estadoJuego.nivel5Completado,
            resultados: estadoJuego.resultadoNivel5
        }
    };
}
