// Worker para procesar datos del nivel 4

// Maneja mensajes del hilo principal
self.onmessage = function(evento) {
    const mensaje = evento.data;
    
    if (mensaje.tipo === 'procesar') {
        const datos = mensaje.datos;
        
        // Procesar datos
        const resultado = procesarDatos(datos);
        
        // Enviar resultado al hilo principal
        self.postMessage(resultado);
    }
};

// Procesa los datos de temperatura y humedad
function procesarDatos(datos) {
    let sumaTemperatura = 0;
    let sumaHumedad = 0;
    let maximoTemperatura = datos[0].temperatura;
    let minimoTemperatura = datos[0].temperatura;
    let maximoHumedad = datos[0].humedad;
    let minimoHumedad = datos[0].humedad;
    
    // Iterar sobre los datos
    for (let i = 0; i < datos.length; i++) {
        const dato = datos[i];
        
        // Sumar temperaturas y humedades
        sumaTemperatura += dato.temperatura;
        sumaHumedad += dato.humedad;
        
        // Encontrar maximos y minimos de temperatura
        if (dato.temperatura > maximoTemperatura) {
            maximoTemperatura = dato.temperatura;
        }
        if (dato.temperatura < minimoTemperatura) {
            minimoTemperatura = dato.temperatura;
        }
        
        // Encontrar maximos y minimos de humedad
        if (dato.humedad > maximoHumedad) {
            maximoHumedad = dato.humedad;
        }
        if (dato.humedad < minimoHumedad) {
            minimoHumedad = dato.humedad;
        }
        
        // Enviar progreso cada 2000 registros
        if ((i + 1) % 2000 === 0) {
            self.postMessage({
                tipo: 'progreso',
                porcentaje: ((i + 1) / datos.length) * 100
            });
        }
    }
    
    // Calcular promedios
    const promedioTemperatura = sumaTemperatura / datos.length;
    const promedioHumedad = sumaHumedad / datos.length;
    
    // Retornar resultado final
    return {
        tipo: 'resultado',
        promedioTemperatura: promedioTemperatura,
        promedioHumedad: promedioHumedad,
        maximoTemperatura: maximoTemperatura,
        minimoTemperatura: minimoTemperatura,
        maximoHumedad: maximoHumedad,
        minimoHumedad: minimoHumedad,
        cantidadRegistros: datos.length,
        promedio: promedioTemperatura,
        maximo: maximoTemperatura,
        minimo: minimoTemperatura
    };
}
