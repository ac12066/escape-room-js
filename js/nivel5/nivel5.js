// Logica del nivel 5 - Procesamiento cuantico con grandes volumenes

// Crea e inicializa el Worker del nivel 5
function crearWorkerNivel5() {
    if (typeof(Worker) !== 'undefined') {
        return new Worker('js/nivel5/worker-nivel5.js');
    } else {
        throw new Error('Web Workers no soportados en este navegador');
    }
}

// Inicia el procesamiento cuantico del nivel 5
function procesarDatosNivel5() {
    return new Promise((resolve, reject) => {
        try {
            // Generar 250,000 datos con valores negativos aleatorios
            const datos = generarDatos(250000, false);
            
            // Validar datos
            const validacion = validarDatosCuanticos(datos);
            if (!validacion.valido) {
                reject(new Error(validacion.mensaje));
                return;
            }
            
            // Crear worker
            const worker = crearWorkerNivel5();
            
            // Manejar respuesta del worker
            worker.onmessage = function(evento) {
                const resultado = evento.data;
                
                // Ignorar mensajes de progreso
                if (resultado.tipo === 'progreso') {
                    // Disparar evento para que UI pueda actualizar barra
                    const eventoProgreso = new CustomEvent('nivel5Progreso', {
                        detail: { porcentaje: resultado.porcentaje }
                    });
                    document.dispatchEvent(eventoProgreso);
                    return;
                }
                
                // Solo procesar mensajes de resultado
                if (resultado.tipo === 'resultado') {
                    // Validar resultado
                    const validacionResultado = validarResultadosNivel5(resultado);
                    if (!validacionResultado.valido) {
                        reject(new Error(validacionResultado.mensaje));
                        worker.terminate();
                        return;
                    }
                    
                    // Guardar resultado
                    estadoJuego.resultadoNivel5 = resultado;
                    
                    // Completar nivel
                    completarNivel5();
                    
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

// Completa el nivel 5
function completarNivel5() {
    estadoJuego.nivel5Completado = true;
    guardarEstado();
    actualizarBarraProgreso();
}
