// Interfaz y renderizado del nivel 1

// Maneja el evento del boton obtener ubicacion
document.addEventListener('DOMContentLoaded', function() {
    const btnObtenerUbicacion = document.getElementById('btnObtenerUbicacion');
    
    if (btnObtenerUbicacion) {
        btnObtenerUbicacion.addEventListener('click', manejarObtenerUbicacion);
    }
});

// Evento principal para obtener ubicacion
async function manejarObtenerUbicacion() {
    const boton = document.getElementById('btnObtenerUbicacion');
    const contenedor = document.getElementById('resultadoNivel1');
    
    // Deshabilitar boton durante proceso
    boton.disabled = true;
    boton.textContent = 'Obteniendo ubicacion...';
    limpiarContenedor('resultadoNivel1');
    
    try {
        // Obtener ubicacion
        const ubicacion = await obtenerUbicacionActual();
        
        // Procesar resultado
        procesarUbicacion(ubicacion);
        
        // Mostrar resultado
        mostrarResultadoNivel1(ubicacion);
        
        // Permitir avance
        setTimeout(() => {
            mostrarBotonAvance(1, 2);
        }, 1000);
        
    } catch (error) {
        mostrarErrorNivel1(error.message);
        boton.disabled = false;
        boton.textContent = 'Obtener Ubicacion';
    }
}

// Muestra resultado exitoso del nivel 1
function mostrarResultadoNivel1(ubicacion) {
    const contenedor = document.getElementById('resultadoNivel1');
    
    const card = crearCardResultado('Ubicacion Obtenida', [
        {
            label: 'Latitud',
            valor: formatearNumero(ubicacion.latitud, 6)
        },
        {
            label: 'Longitud',
            valor: formatearNumero(ubicacion.longitud, 6)
        },
        {
            label: 'Precision',
            valor: formatearNumero(ubicacion.precision, 2) + ' metros'
        },
        {
            label: 'Timestamp',
            valor: ubicacion.timestamp
        }
    ]);
    
    const exito = mostrarExito('Nivel 1 completado! Tu ubicacion ha sido registrada.');
    
    contenedor.appendChild(card);
    contenedor.appendChild(exito);
}

// Muestra error en nivel 1
function mostrarErrorNivel1(mensaje) {
    const contenedor = document.getElementById('resultadoNivel1');
    const error = mostrarError(mensaje);
    contenedor.appendChild(error);
}

// Muestra boton para avanzar al siguiente nivel
function mostrarBotonAvance(nivelActual, nivelSiguiente) {
    const contenedor = document.getElementById(`resultadoNivel${nivelActual}`);
    
    const boton = document.createElement('button');
    boton.className = 'btn btn-success w-100 mt-3';
    boton.textContent = `Avanzar al Nivel ${nivelSiguiente}`;
    boton.addEventListener('click', () => {
        cambiarSeccion(nivelActual, nivelSiguiente);
        document.getElementById(`btnNivel${nivelSiguiente}`).classList.add('active');
        actualizarTextoNivel(nivelSiguiente);
    });
    
    contenedor.appendChild(boton);
}

// Actualiza el texto descriptivo del nivel
function actualizarTextoNivel(numero) {
    const textos = {
        1: 'Obten tu ubicacion actual',
        2: 'Dibuja el mapa con tu ubicacion',
        3: 'Captura una foto con tu camara',
        4: 'Procesa 20,000 registros de datos',
        5: 'Procesa 250,000 registros cuanticos'
    };
    
    const elemento = document.getElementById('textoNivel');
    if (elemento && textos[numero]) {
        elemento.textContent = `Nivel ${numero}: ${textos[numero]}`;
    }
}
