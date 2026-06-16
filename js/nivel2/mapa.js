// Interfaz y control del dibujo de mapa - Nivel 2

// Maneja el evento del boton dibujar mapa
document.addEventListener('DOMContentLoaded', function() {
    const btnDibujarMapa = document.getElementById('btnDibujarMapa');
    
    if (btnDibujarMapa) {
        btnDibujarMapa.addEventListener('click', manejarDibujarMapa);
    }
});

// Evento principal para dibujar mapa
async function manejarDibujarMapa() {
    const boton = document.getElementById('btnDibujarMapa');
    const canvas = document.getElementById('canvasMapa');
    const contenedor = document.getElementById('resultadoNivel2');
    
    // Verificar que el nivel anterior fue completado
    if (!estadoJuego.nivel1Completado) {
        mostrarErrorNivel2('Debes completar el Nivel 1 primero');
        return;
    }
    
    // Verificar que tenemos ubicacion
    if (!estadoJuego.ubicacionActual) {
        mostrarErrorNivel2('Ubicacion no disponible. Completa el Nivel 1 primero.');
        return;
    }
    
    // Deshabilitar boton durante proceso
    boton.disabled = true;
    boton.textContent = 'Dibujando mapa...';
    limpiarContenedor('resultadoNivel2');
    
    try {
        // Dibujar mapa
        dibujarMapa(
            canvas,
            estadoJuego.ubicacionActual.latitud,
            estadoJuego.ubicacionActual.longitud
        );
        
        // Esperar un poco para efecto visual
        await esperar(800);
        
        // Completar nivel
        completarNivel2();
        
        // Mostrar resultado
        mostrarResultadoNivel2();
        
        // Permitir avance
        setTimeout(() => {
            mostrarBotonAvance(2, 3);
        }, 500);
        
    } catch (error) {
        mostrarErrorNivel2(error.message);
        boton.disabled = false;
        boton.textContent = 'Dibujar Mapa';
    }
}

// Muestra resultado exitoso del nivel 2
function mostrarResultadoNivel2() {
    const contenedor = document.getElementById('resultadoNivel2');
    
    const card = crearCardResultado('Mapa Dibujado', [
        {
            label: 'Estado',
            valor: 'Mapa creado exitosamente'
        },
        {
            label: 'Ubicacion Marcada',
            valor: `${formatearNumero(estadoJuego.ubicacionActual.latitud, 4)}, ${formatearNumero(estadoJuego.ubicacionActual.longitud, 4)}`
        },
        {
            label: 'Elementos Dibujados',
            valor: 'Grilla, rectangulos, circulos, linea de ruta'
        }
    ]);
    
    const exito = mostrarExito('Nivel 2 completado! Has dibujado el mapa de la ubicacion.');
    
    contenedor.appendChild(card);
    contenedor.appendChild(exito);
}

// Muestra error en nivel 2
function mostrarErrorNivel2(mensaje) {
    const contenedor = document.getElementById('resultadoNivel2');
    limpiarContenedor('resultadoNivel2');
    
    const error = mostrarError(mensaje);
    contenedor.appendChild(error);
}
