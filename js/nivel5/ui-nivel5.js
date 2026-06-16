// Interfaz y control del procesamiento cuantico - Nivel 5

// Maneja el evento del boton procesar cuantico
document.addEventListener('DOMContentLoaded', function() {
    const btnProcesar = document.getElementById('btnProcesarNivel5');
    const btnContinuar = document.getElementById('btnContinuarACompletacion');
    
    if (btnProcesar) {
        btnProcesar.addEventListener('click', manejarProcesarNivel5);
    }
    
    if (btnContinuar) {
        btnContinuar.addEventListener('click', manejarContinuarACompletacion);
    }
});

// Evento principal para procesar datos cuanticos
async function manejarProcesarNivel5() {
    const boton = document.getElementById('btnProcesarNivel5');
    const barraProgreso = document.getElementById('barraProcesoNivel5');
    const progresoBarra = document.getElementById('progresoBarra5');
    const contenedor = document.getElementById('resultadoNivel5');
    
    // Verificar que el nivel anterior fue completado
    if (!estadoJuego.nivel4Completado) {
        mostrarErrorNivel5('Debes completar el Nivel 4 primero');
        return;
    }
    
    // Deshabilitar boton
    boton.disabled = true;
    boton.textContent = 'Portal abierto...';
    
    // Mostrar barra de progreso
    barraProgreso.style.display = 'block';
    limpiarContenedor('resultadoNivel5');
    
    try {
        // Escuchar eventos de progreso del nivel 5
        const manejadorProgreso = function(evento) {
            const porcentaje = evento.detail.porcentaje;
            progresoBarra.style.width = porcentaje + '%';
            progresoBarra.textContent = Math.round(porcentaje) + '%';
        };
        
        document.addEventListener('nivel5Progreso', manejadorProgreso);
        
        // Procesar datos
        const resultado = await procesarDatosNivel5();
        
        // Remover listener de progreso
        document.removeEventListener('nivel5Progreso', manejadorProgreso);
        
        // Mostrar resultado
        mostrarResultadoNivel5(resultado);
        
        // Mostrar boton de continuar
        const botonesContinuar = document.getElementById('botonesContinuarNivel5');
        if (botonesContinuar) {
            botonesContinuar.style.display = 'block';
        }
        
    } catch (error) {
        mostrarErrorNivel5(error.message);
        boton.disabled = false;
        boton.textContent = 'Iniciar Portal Cuantico';
        barraProgreso.style.display = 'none';
    }
}

// Muestra resultado exitoso del nivel 5
function mostrarResultadoNivel5(resultado) {
    const contenedor = document.getElementById('resultadoNivel5');
    
    const resumenCard = crearCardResultado('Estadisticas del Portal Cuantico', [
        {
            label: 'Total de Registros',
            valor: resultado.cantidadTotal
        },
        {
            label: 'Registros Validos',
            valor: resultado.cantidadValidos
        },
        {
            label: 'Registros Filtrados',
            valor: resultado.cantidadFiltrados
        },
        {
            label: 'Promedio General',
            valor: formatearNumero(resultado.promedioGeneral, 4)
        }
    ]);
    
    contenedor.appendChild(resumenCard);
    
    // Top 10 temperaturas
    let htmlTemperaturas = '<div class="tabla-estadisticas"><h5 class="mt-4 mb-3">Top 10 Temperaturas</h5><table>';
    htmlTemperaturas += '<tr><th>Rango</th><th>Temperatura</th><th>ID</th></tr>';
    resultado.top10Temperaturas.forEach((temp, index) => {
        htmlTemperaturas += `<tr><td>${index + 1}</td><td>${formatearNumero(temp.temperatura, 2)}</td><td>${temp.id}</td></tr>`;
    });
    htmlTemperaturas += '</table></div>';
    
    const divTemperaturas = document.createElement('div');
    divTemperaturas.innerHTML = htmlTemperaturas;
    contenedor.appendChild(divTemperaturas);
    
    // Top 10 presiones
    let htmlPresiones = '<div class="tabla-estadisticas"><h5 class="mt-4 mb-3">Top 10 Presiones</h5><table>';
    htmlPresiones += '<tr><th>Rango</th><th>Presion</th><th>ID</th></tr>';
    resultado.top10Presiones.forEach((presion, index) => {
        htmlPresiones += `<tr><td>${index + 1}</td><td>${formatearNumero(presion.presion, 2)}</td><td>${presion.id}</td></tr>`;
    });
    htmlPresiones += '</table></div>';
    
    const divPresiones = document.createElement('div');
    divPresiones.innerHTML = htmlPresiones;
    contenedor.appendChild(divPresiones);
    
    const exito = mostrarExito('Nivel 5 completado! 250,000 registros procesados exitosamente.');
    contenedor.appendChild(exito);
}

// Muestra error en nivel 5
function mostrarErrorNivel5(mensaje) {
    const contenedor = document.getElementById('resultadoNivel5');
    limpiarContenedor('resultadoNivel5');
    
    const error = mostrarError(mensaje);
    contenedor.appendChild(error);
}

// Muestra botones finales cuando se completa el juego
function mostrarBotonesFinal() {
    const seccionNivel5 = document.getElementById('seccionNivel5');
    const seccionCompletado = document.getElementById('seccionCompletado');
    
    if (seccionNivel5) {
        seccionNivel5.style.display = 'none';
    }
    
    if (seccionCompletado) {
        seccionCompletado.style.display = 'block';
    }
    
    // Configurar botones
    const btnExportar = document.getElementById('btnExportarJSON');
    const btnReiniciar = document.getElementById('btnReiniciar');
    
    if (btnExportar) {
        btnExportar.addEventListener('click', manejarExportarJSON);
    }
    
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', manejarReiniciar);
    }
}

// Evento para exportar JSON
function manejarExportarJSON() {
    const datosExportar = crearResultadoJSON();
    descargarJSON(datosExportar, 'escape-room-resultados-' + Date.now() + '.json');
}

// Evento para continuar a la pantalla de completacion
function manejarContinuarACompletacion() {
    const seccionNivel5 = document.getElementById('seccionNivel5');
    const seccionCompletado = document.getElementById('seccionCompletado');
    
    if (seccionNivel5) {
        seccionNivel5.style.display = 'none';
    }
    
    if (seccionCompletado) {
        seccionCompletado.style.display = 'block';
    }
    
    // Configurar botones finales
    const btnExportar = document.getElementById('btnExportarJSON');
    const btnReiniciar = document.getElementById('btnReiniciar');
    
    if (btnExportar) {
        btnExportar.addEventListener('click', manejarExportarJSON);
    }
    
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciarJuegoCompletamente);
    }
}

// Evento para reiniciar el juego
function manejarReiniciar() {
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
    
    // Recargar pagina
    location.reload();
}

// Evento para reiniciar desde la pantalla final
function manejarReiniciarDelFinal() {
    manejarReiniciar();
}
