// Manejo de captura de fotos y stream de video

// Variable para mantener track del stream activo
let streamActual = null;

// Detiene el stream y limpia
function limpiarStreamVideo() {
    if (streamActual) {
        detenerStreamVideo(streamActual);
        streamActual = null;
    }
}

// Muestra la foto capturada en el contenedor
function mostrarFotoCapturada(fotoData) {
    const contenedor = document.getElementById('contenedorFoto');
    limpiarContenedor('contenedorFoto');
    
    const img = document.createElement('img');
    img.src = fotoData;
    img.className = 'foto-capturada';
    img.alt = 'Foto capturada';
    
    contenedor.appendChild(img);
}

// Descarga la foto capturada
function descargarFotoCapturada() {
    if (!estadoJuego.fotoCapturada) {
        alert('No hay foto para descargar');
        return;
    }
    
    const enlace = document.createElement('a');
    enlace.href = estadoJuego.fotoCapturada;
    enlace.download = 'foto-capturada-' + Date.now() + '.jpg';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

// Guarda la foto en localStorage
function guardarFotoEnLocalStorage() {
    if (estadoJuego.fotoCapturada) {
        try {
            localStorage.setItem('fotoCapturada', estadoJuego.fotoCapturada);
            return true;
        } catch (error) {
            console.error('Error al guardar foto en localStorage:', error);
            return false;
        }
    }
    return false;
}

// Obtiene la foto del localStorage
function obtenerFotoDelLocalStorage() {
    try {
        const foto = localStorage.getItem('fotoCapturada');
        if (foto) {
            estadoJuego.fotoCapturada = foto;
            return foto;
        }
    } catch (error) {
        console.error('Error al obtener foto del localStorage:', error);
    }
    return null;
}
