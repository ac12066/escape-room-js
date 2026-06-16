// Worker para procesar datos cuanticos del nivel 5

// Maneja mensajes del hilo principal
self.onmessage = function(evento) {
    const mensaje = evento.data;
    
    if (mensaje.tipo === 'procesar') {
        const datos = mensaje.datos;
        
        // Procesar datos cuanticos
        const resultado = procesarDatosCuanticos(datos);
        
        // Enviar resultado al hilo principal
        self.postMessage(resultado);
    }
};

// Procesa los datos cuanticos: filtra negativos y calcula estadisticas
function procesarDatosCuanticos(datos) {
    const datosValidos = [];
    let sumaTemperatura = 0;
    let sumaPresion = 0;
    
    // Filtrar datos validos y acumular sumas
    for (let i = 0; i < datos.length; i++) {
        const dato = datos[i];
        
        // Solo incluir datos con valores positivos
        if (dato.temperatura >= 0 && dato.presion >= 0) {
            datosValidos.push(dato);
            sumaTemperatura += dato.temperatura;
            sumaPresion += dato.presion;
        }
        
        // Enviar progreso cada 25000 registros
        if ((i + 1) % 25000 === 0) {
            self.postMessage({
                tipo: 'progreso',
                porcentaje: ((i + 1) / datos.length) * 100
            });
        }
    }
    
    // Calcular promedio general
    let promedioGeneral = 0;
    if (datosValidos.length > 0) {
        promedioGeneral = (sumaTemperatura + sumaPresion) / (datosValidos.length * 2);
    }
    
    // Obtener top 10 temperaturas
    const top10Temperaturas = datosValidos
        .sort((a, b) => b.temperatura - a.temperatura)
        .slice(0, 10)
        .map(d => ({
            temperatura: d.temperatura,
            id: d.id
        }));
    
    // Obtener top 10 presiones
    const top10Presiones = datosValidos
        .sort((a, b) => b.presion - a.presion)
        .slice(0, 10)
        .map(d => ({
            presion: d.presion,
            id: d.id
        }));
    
    // Retornar resultado final
    return {
        tipo: 'resultado',
        promedioGeneral: promedioGeneral,
        top10Temperaturas: top10Temperaturas,
        top10Presiones: top10Presiones,
        cantidadValidos: datosValidos.length,
        cantidadFiltrados: datos.length - datosValidos.length,
        cantidadTotal: datos.length
    };
}
