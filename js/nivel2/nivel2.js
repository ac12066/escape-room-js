// Logica del nivel 2 - Dibujo de mapa

// Dibuja el mapa en el canvas
function dibujarMapa(canvas, ubicacionLatitud, ubicacionLongitud) {
    const validacion = validarMapa(canvas);
    if (!validacion.valido) {
        throw new Error(validacion.mensaje);
    }
    
    const ctx = canvas.getContext('2d');
    const ancho = canvas.width;
    const alto = canvas.height;
    
    // Limpiar canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, ancho, alto);
    
    // Dibujar grilla de fondo
    dibujarGrilla(ctx, ancho, alto);
    
    // Dibujar rectangulos decorativos
    dibujarRectangulos(ctx);
    
    // Dibujar linea de ruta
    dibujarLineaRuta(ctx, ancho, alto);
    
    // Dibujar circulos
    dibujarCirculos(ctx, ancho, alto);
    
    // Dibujar posicion del usuario
    const posicionUsuario = normalizarCoordenadas(ubicacionLatitud, ubicacionLongitud, ancho, alto);
    dibujarMarcadorUbicacion(ctx, posicionUsuario.x, posicionUsuario.y);
    
    return true;
}

// Dibuja una grilla en el canvas
function dibujarGrilla(ctx, ancho, alto) {
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    
    const tamanoCelda = 50;
    
    // Lineas verticales
    for (let x = 0; x < ancho; x += tamanoCelda) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, alto);
        ctx.stroke();
    }
    
    // Lineas horizontales
    for (let y = 0; y < alto; y += tamanoCelda) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ancho, y);
        ctx.stroke();
    }
}

// Dibuja rectangulos en el mapa
function dibujarRectangulos(ctx) {
    ctx.fillStyle = 'rgba(0, 123, 255, 0.3)';
    ctx.strokeStyle = '#0079ff';
    ctx.lineWidth = 2;
    
    // Rectangulo 1
    ctx.fillRect(50, 50, 150, 100);
    ctx.strokeRect(50, 50, 150, 100);
    
    // Rectangulo 2
    ctx.fillRect(350, 150, 180, 120);
    ctx.strokeRect(350, 150, 180, 120);
    
    // Rectangulo 3
    ctx.fillRect(80, 250, 200, 100);
    ctx.strokeRect(80, 250, 200, 100);
}

// Dibuja linea de ruta
function dibujarLineaRuta(ctx, ancho, alto) {
    ctx.strokeStyle = '#00aa00';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 150);
    ctx.lineTo(350, 200);
    ctx.lineTo(500, 300);
    ctx.stroke();
    
    ctx.setLineDash([]);
}

// Dibuja circulos en el mapa
function dibujarCirculos(ctx) {
    // Circulo 1
    ctx.fillStyle = 'rgba(255, 193, 7, 0.3)';
    ctx.strokeStyle = '#ffc107';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(450, 80, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Circulo 2
    ctx.fillStyle = 'rgba(220, 53, 69, 0.3)';
    ctx.strokeStyle = '#dc3545';
    ctx.beginPath();
    ctx.arc(150, 350, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Circulo 3
    ctx.fillStyle = 'rgba(40, 167, 69, 0.3)';
    ctx.strokeStyle = '#28a745';
    ctx.beginPath();
    ctx.arc(520, 250, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

// Dibuja marcador de ubicacion del usuario
function dibujarMarcadorUbicacion(ctx, x, y) {
    // Circulo externo
    ctx.fillStyle = 'rgba(23, 162, 184, 0.5)';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Circulo interno
    ctx.fillStyle = '#17a2b8';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Punto central
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Indicador de direccion
    ctx.strokeStyle = '#17a2b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - 25);
    ctx.lineTo(x, y - 40);
    ctx.stroke();
}

// Normaliza coordenadas de ubicacion real al canvas
function normalizarCoordenadas(latitud, longitud, anchoCanvas, altoCanvas) {
    // Simula una normalizacion basica
    // En produccion, se usarian limites reales de mapa
    const latMin = 40.0;
    const latMax = 41.0;
    const lonMin = -74.0;
    const lonMax = -73.0;
    
    const x = ((longitud - lonMin) / (lonMax - lonMin)) * anchoCanvas;
    const y = ((latMax - latitud) / (latMax - latMin)) * altoCanvas;
    
    return {
        x: Math.max(20, Math.min(anchoCanvas - 20, x)),
        y: Math.max(20, Math.min(altoCanvas - 20, y))
    };
}

// Completa el nivel 2
function completarNivel2() {
    estadoJuego.nivel2Completado = true;
    guardarEstado();
    actualizarBarraProgreso();
}
