// Interfaz y control del procesamiento - Nivel 4

// Maneja el evento del boton procesar
document.addEventListener('DOMContentLoaded', function() {
    const btnProcesar = document.getElementById('btnProcesarNivel4');
    
    if (btnProcesar) {
        btnProcesar.addEventListener('click', manejarProcesarNivel4);
    }
});

// Evento principal para procesar datos
async function manejarProcesarNivel4() {
    const boton = document.getElementById('btnProcesarNivel4');
    const barraProgreso = document.getElementById('barraProcesoNivel4');
    const progresoBarra = document.getElementById('progresoBarra4');
    const contenedor = document.getElementById('resultadoNivel4');
    
    // Verificar que el nivel anterior fue completado
    if (!estadoJuego.nivel3Completado) {
        mostrarErrorNivel4('Debes completar el Nivel 3 primero');
        return;
    }
    
    // Deshabilitar boton
    boton.disabled = true;
    boton.textContent = 'Procesando...';
    
    // Mostrar barra de progreso
    barraProgreso.style.display = 'block';
    limpiarContenedor('resultadoNivel4');
    
    try {
        // Escuchar eventos de progreso del nivel 4
        const manejadorProgreso = function(evento) {
            const porcentaje = evento.detail.porcentaje;
            progresoBarra.style.width = porcentaje + '%';
            progresoBarra.textContent = Math.round(porcentaje) + '%';
        };
        
        document.addEventListener('nivel4Progreso', manejadorProgreso);
        
        // Procesar datos
        const resultado = await procesarDatosNivel4();
        
        // Remover listener de progreso
        document.removeEventListener('nivel4Progreso', manejadorProgreso);
        
        // Mostrar resultado
        mostrarResultadoNivel4(resultado);
        
        // Permitir avance
        setTimeout(() => {
            mostrarBotonAvance(4, 5);
        }, 500);
        
    } catch (error) {
        mostrarErrorNivel4(error.message);
        boton.disabled = false;
        boton.textContent = 'Iniciar Procesamiento';
        barraProgreso.style.display = 'none';
    }
}

// Muestra resultado exitoso del nivel 4
function mostrarResultadoNivel4(resultado) {
    const contenedor = document.getElementById('resultadoNivel4');
    
    const card = crearCardResultado('Estadisticas del Procesamiento', [
        {
            label: 'Cantidad de Registros',
            valor: resultado.cantidadRegistros
        },
        {
            label: 'Promedio Temperatura',
            valor: formatearNumero(resultado.promedioTemperatura, 2) + ' C'
        },
        {
            label: 'Promedio Humedad',
            valor: formatearNumero(resultado.promedioHumedad, 2) + ' %'
        },
        {
            label: 'Maximo Temperatura',
            valor: formatearNumero(resultado.maximoTemperatura, 2) + ' C'
        },
        {
            label: 'Minimo Temperatura',
            valor: formatearNumero(resultado.minimoTemperatura, 2) + ' C'
        },
        {
            label: 'Maximo Humedad',
            valor: formatearNumero(resultado.maximoHumedad, 2) + ' %'
        },
        {
            label: 'Minimo Humedad',
            valor: formatearNumero(resultado.minimoHumedad, 2) + ' %'
        }
    ]);
    
    const exito = mostrarExito('Nivel 4 completado! 20,000 registros procesados exitosamente.');
    
    contenedor.appendChild(card);
    contenedor.appendChild(exito);
}

// Muestra error en nivel 4
function mostrarErrorNivel4(mensaje) {
    const contenedor = document.getElementById('resultadoNivel4');
    limpiarContenedor('resultadoNivel4');
    
    const error = mostrarError(mensaje);
    contenedor.appendChild(error);
}
