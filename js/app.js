// Orquestacion principal de la aplicacion

// Inicializa la aplicacion cuando el DOM carga
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
    configurarEventosBotones();
    restaurarEstado();
    configurarBotonReinicioGlobal();
});

// Inicializa el estado y la interfaz
function inicializarAplicacion() {
    // Restaurar estado guardado si existe
    const estadoGuardado = obtenerEstadoGuardado();
    Object.assign(estadoJuego, estadoGuardado);
    
    // Mostrar nivel 1 inicialmente
    mostrarNivel(1);
    
    // Actualizar barra de progreso
    actualizarBarraProgreso();
    
    // Actualizar texto del nivel
    actualizarTextoNivel(1);
}

// Configura los eventos de los botones de navegacion
function configurarEventosBotones() {
    const botones = document.querySelectorAll('.btn-nivel');
    
    botones.forEach((boton, index) => {
        const numero = index + 1;
        boton.addEventListener('click', () => {
            // Verificar que el nivel anterior fue completado
            if (numero === 1 || validarCompletacionNivel(numero - 1)) {
                mostrarNivel(numero);
                actualizarTextoNivel(numero);
            }
        });
    });
}

// Muestra el nivel especificado
function mostrarNivel(numero) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.nivel-seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
    
    // Mostrar seccion del nivel
    const seccionActual = document.getElementById(`seccionNivel${numero}`);
    if (seccionActual) {
        seccionActual.style.display = 'block';
    }
    
    // Actualizar botones activos
    const botones = document.querySelectorAll('.btn-nivel');
    botones.forEach((boton, index) => {
        boton.classList.remove('active');
        if (index + 1 === numero) {
            boton.classList.add('active');
        }
    });
}

// Restaura el estado desde localStorage si existe
function restaurarEstado() {
    const estadoGuardado = obtenerEstadoGuardado();
    
    // Si hay niveles completados, habilitar botones
    if (estadoGuardado.nivel1Completado) {
        habilitarBotonNivel(2);
    }
    if (estadoGuardado.nivel2Completado) {
        habilitarBotonNivel(3);
    }
    if (estadoGuardado.nivel3Completado) {
        habilitarBotonNivel(4);
    }
    if (estadoGuardado.nivel4Completado) {
        habilitarBotonNivel(5);
    }
}

// Valida si se puede avanzar entre niveles
function puedeAvanzarANivel(numeroNivel) {
    if (numeroNivel === 1) {
        return true;
    }
    return validarCompletacionNivel(numeroNivel - 1);
}

// Configura el boton de reinicio global
function configurarBotonReinicioGlobal() {
    const btnReinicioGlobal = document.getElementById('btnReinicioGlobal');
    
    if (btnReinicioGlobal) {
        btnReinicioGlobal.addEventListener('click', function() {
            // Confirmar antes de reiniciar
            if (confirm('¿Estas seguro de que deseas reiniciar el juego? Se perdera todo el progreso.')) {
                reiniciarJuegoCompletamente();
            }
        });
    }
}

// Reinicia el juego completamente
function reiniciarJuegoCompletamente() {
    // Limpiar estado
    Object.keys(estadoJuego).forEach(key => {
        if (key === 'ubicacionActual' || key === 'fotoCapturada' || key === 'resultadoNivel4' || key === 'resultadoNivel5') {
            estadoJuego[key] = null;
        } else {
            estadoJuego[key] = false;
        }
    });
    
    // Limpiar localStorage
    localStorage.removeItem('estadoEscapeRoom');
    localStorage.removeItem('fotoCapturada');
    
    // Limpiar stream si existe
    if (window.streamActual) {
        limpiarStreamVideo();
    }
    
    // Recargar pagina
    location.reload();
}
