// Logica del nivel 3 - Captura de foto

// Obtiene acceso a la camara del dispositivo
async function obtenerAccesoCamara() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        
        return stream;
    } catch (error) {
        let mensaje = '';
        
        if (error.name === 'NotAllowedError') {
            mensaje = 'Permiso de camara denegado. Habilita los permisos en tu navegador.';
        } else if (error.name === 'NotFoundError') {
            mensaje = 'Camara no encontrada en este dispositivo.';
        } else if (error.name === 'NotReadableError') {
            mensaje = 'Camara no disponible. Puede estar siendo usada por otra aplicacion.';
        } else {
            mensaje = 'Error al acceder a la camara: ' + error.message;
        }
        
        throw new Error(mensaje);
    }
}

// Inicia el stream de video
function iniciarStreamVideo(videoElemento, stream) {
    videoElemento.srcObject = stream;
    return new Promise((resolve) => {
        videoElemento.onloadedmetadata = () => {
            videoElemento.play();
            resolve();
        };
    });
}

// Captura una foto del video
function capturarFoto(videoElemento) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;
    
    const contexto = canvas.getContext('2d');
    contexto.drawImage(videoElemento, 0, 0);
    
    const fotoData = canvas.toDataURL('image/jpeg', 0.9);
    
    // Guardar foto en estado
    estadoJuego.fotoCapturada = fotoData;
    
    // Validar foto
    const validacion = validarFoto(fotoData);
    if (!validacion.valido) {
        throw new Error(validacion.mensaje);
    }
    
    return fotoData;
}

// Detiene el stream de video
function detenerStreamVideo(stream) {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

// Completa el nivel 3
function completarNivel3() {
    estadoJuego.nivel3Completado = true;
    guardarEstado();
    actualizarBarraProgreso();
}
