// Logica del nivel 4 - Procesamiento de datos con Worker

// Crea e inicializa el Worker del nivel 4
function crearWorkerNivel4() {
    if (typeof(Worker) !== 'undefined') {
        return new Worker('js/nivel4/worker-nivel4.js');
    } else {
        throw new Error('Web Workers no soportados en este navegador');
    }
}

// Inicia el procesamiento de datos del nivel 4
function procesarDatosNivel4() {
    return new Promise((resolve, reject) => {
        try {
            // Generar datos de temperatura y humedad
            const datos = generarDatos(20000, true);
            
            // Validar datos
            const validacion = validarDatosTemperatura(datos);
            if (!validacion.valido) {
                reject(new Error(validacion.mensaje));
                return;
            }
            
            // Crear worker
            const worker = crearWorkerNivel4();
            
            // Manejar respuesta del worker
            worker.onmessage = function(evento) {
                const resultado = evento.data;
                
                // Ignorar mensajes de progreso
                if (resultado.tipo === 'progreso') {
                    // Disparar evento para que UI pueda actualizar barra
                    const eventoProgreso = new CustomEvent('nivel4Progreso', {
                        detail: { porcentaje: resultado.porcentaje }
                    });
                    document.dispatchEvent(eventoProgreso);
                    return;
                }
                
                // Solo procesar mensajes de resultado
                if (resultado.tipo === 'resultado') {
                    // Validar estadisticos
                    const validacionResultado = validarEstadisticos(resultado);
                    if (!validacionResultado.valido) {
                        reject(new Error(validacionResultado.mensaje));
                        worker.terminate();
                        return;
                    }
                    
                    // Guardar resultado
                    estadoJuego.resultadoNivel4 = resultado;
                    
                    // Completar nivel
                    completarNivel4();
                    
                    worker.terminate();
                    resolve(resultado);
                }
            };
            
            // Manejar errores del worker
            worker.onerror = function(error) {
                reject(new Error('Error en Worker: ' + error.message));
                worker.terminate();
            };
            
            // Enviar datos al worker
            worker.postMessage({
                datos: datos,
                tipo: 'procesar'
            });
            
        } catch (error) {
            reject(error);
        }
    });
}

// Completa el nivel 4
function completarNivel4() {
    estadoJuego.nivel4Completado = true;
    guardarEstado();
    actualizarBarraProgreso();
}
