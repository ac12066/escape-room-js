// Interfaz y control de captura - Nivel 3

// Maneja eventos de los botones de camara
document.addEventListener('DOMContentLoaded', function() {
    const btnIniciarCamara = document.getElementById('btnIniciarCamara');
    const btnCapturarFoto = document.getElementById('btnCapturarFoto');
    
    if (btnIniciarCamara) {
        btnIniciarCamara.addEventListener('click', manejarIniciarCamara);
    }
    
    if (btnCapturarFoto) {
        btnCapturarFoto.addEventListener('click', manejarCapturarFoto);
    }
});

// Evento para iniciar la camara
async function manejarIniciarCamara() {
    const boton = document.getElementById('btnIniciarCamara');
    const video = document.getElementById('videoCaptura');
    const btnCapturar = document.getElementById('btnCapturarFoto');
    const contenedor = document.getElementById('resultadoNivel3');
    
    // Verificar que el nivel anterior fue completado
    if (!estadoJuego.nivel2Completado) {
        mostrarErrorNivel3('Debes completar el Nivel 2 primero');
        return;
    }
    
    boton.disabled = true;
    boton.textContent = 'Abriendo camara...';
    limpiarContenedor('resultadoNivel3');
    
    try {
        // Obtener acceso a camara
        const stream = await obtenerAccesoCamara();
        streamActual = stream;
        
        // Iniciar stream en video
        await iniciarStreamVideo(video, stream);
        
        // Mostrar video
        video.style.display = 'block';
        btnCapturar.style.display = 'block';
        boton.textContent = 'Camara iniciada';
        boton.style.display = 'none';
        
    } catch (error) {
        mostrarErrorNivel3(error.message);
        boton.disabled = false;
        boton.textContent = 'Iniciar Camara';
    }
}

// Evento para capturar foto
async function manejarCapturarFoto() {
    const video = document.getElementById('videoCaptura');
    const btnCapturar = document.getElementById('btnCapturarFoto');
    const contenedor = document.getElementById('resultadoNivel3');
    
    btnCapturar.disabled = true;
    btnCapturar.textContent = 'Capturando...';
    limpiarContenedor('resultadoNivel3');
    
    try {
        // Capturar foto
        const fotoData = capturarFoto(video);
        
        // Mostrar foto capturada
        mostrarFotoCapturada(fotoData);
        
        // Guardar en localStorage
        guardarFotoEnLocalStorage();
        
        // Detener stream
        limpiarStreamVideo();
        video.style.display = 'none';
        
        // Completar nivel
        completarNivel3();
        
        // Mostrar resultado
        mostrarResultadoNivel3();
        
        // Permitir avance
        setTimeout(() => {
            mostrarBotonAvance(3, 4);
        }, 500);
        
        btnCapturar.style.display = 'none';
        
    } catch (error) {
        mostrarErrorNivel3(error.message);
        btnCapturar.disabled = false;
        btnCapturar.textContent = 'Capturar Foto';
    }
}

// Muestra resultado exitoso del nivel 3
function mostrarResultadoNivel3() {
    const contenedor = document.getElementById('resultadoNivel3');
    
    const card = crearCardResultado('Foto Capturada', [
        {
            label: 'Estado',
            valor: 'Foto capturada exitosamente'
        },
        {
            label: 'Almacenamiento',
            valor: 'Guardada en localStorage'
        },
        {
            label: 'Tamanio',
            valor: estadoJuego.fotoCapturada.length + ' bytes'
        }
    ]);
    
    const exito = mostrarExito('Nivel 3 completado! Foto capturada y guardada.');
    
    contenedor.appendChild(card);
    contenedor.appendChild(exito);
}

// Muestra error en nivel 3
function mostrarErrorNivel3(mensaje) {
    const contenedor = document.getElementById('resultadoNivel3');
    limpiarContenedor('resultadoNivel3');
    
    const error = mostrarError(mensaje);
    contenedor.appendChild(error);
}
