// Logica del nivel 1 - Obtencion de ubicacion

// Obtiene la ubicacion actual del dispositivo
function obtenerUbicacionActual() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation no soportado en este navegador'));
            return;
        }

        const opciones = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (posicion) => {
                const { latitude, longitude, accuracy } = posicion.coords;
                
                const ubicacion = {
                    latitud: latitude,
                    longitud: longitude,
                    precision: accuracy,
                    timestamp: new Date().toISOString()
                };
                
                // Validar datos
                const validacion = validarUbicacion(latitude, longitude);
                if (!validacion.valido) {
                    reject(new Error(validacion.mensaje));
                    return;
                }
                
                estadoJuego.ubicacionActual = ubicacion;
                resolve(ubicacion);
            },
            (error) => {
                let mensaje = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        mensaje = 'Permiso de ubicacion denegado. Habilita los permisos en tu navegador.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensaje = 'Ubicacion no disponible. Verifica tu conexion GPS.';
                        break;
                    case error.TIMEOUT:
                        mensaje = 'Tiempo de espera agotado al obtener ubicacion.';
                        break;
                    default:
                        mensaje = 'Error desconocido al obtener ubicacion.';
                }
                reject(new Error(mensaje));
            },
            opciones
        );
    });
}

// Procesa el resultado de ubicacion y actualiza estado
function procesarUbicacion(ubicacion) {
    estadoJuego.nivel1Completado = true;
    guardarEstado();
    actualizarBarraProgreso();
    return ubicacion;
}
