// Funciones de validacion para cada nivel

// Valida que la ubicacion sea correcta
function validarUbicacion(latitud, longitud) {
    if (!latitud || !longitud) {
        return {
            valido: false,
            mensaje: 'Ubicacion no disponible'
        };
    }
    
    if (typeof latitud !== 'number' || typeof longitud !== 'number') {
        return {
            valido: false,
            mensaje: 'Datos de ubicacion invalidos'
        };
    }
    
    if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
        return {
            valido: false,
            mensaje: 'Coordenadas fuera de rango'
        };
    }
    
    return {
        valido: true,
        mensaje: 'Ubicacion valida'
    };
}

// Valida el canvas del mapa
function validarMapa(canvas) {
    if (!canvas) {
        return {
            valido: false,
            mensaje: 'Canvas no encontrado'
        };
    }
    
    const contexto = canvas.getContext('2d');
    if (!contexto) {
        return {
            valido: false,
            mensaje: 'Contexto de canvas invalido'
        };
    }
    
    return {
        valido: true,
        mensaje: 'Mapa valido'
    };
}

// Valida que una foto haya sido capturada
function validarFoto(fotoData) {
    if (!fotoData) {
        return {
            valido: false,
            mensaje: 'No se ha capturado ninguna foto'
        };
    }
    
    if (typeof fotoData !== 'string') {
        return {
            valido: false,
            mensaje: 'Formato de foto invalido'
        };
    }
    
    if (fotoData.length === 0) {
        return {
            valido: false,
            mensaje: 'Foto vacia'
        };
    }
    
    return {
        valido: true,
        mensaje: 'Foto valida'
    };
}

// Valida datos de temperatura y humedad
function validarDatosTemperatura(datos) {
    if (!Array.isArray(datos)) {
        return {
            valido: false,
            mensaje: 'Datos deben ser un array'
        };
    }
    
    if (datos.length === 0) {
        return {
            valido: false,
            mensaje: 'Array de datos vacio'
        };
    }
    
    for (const dato of datos) {
        if (!dato.temperatura || !dato.humedad) {
            return {
                valido: false,
                mensaje: 'Datos incompletos: falta temperatura o humedad'
            };
        }
    }
    
    return {
        valido: true,
        mensaje: 'Datos de temperatura validos'
    };
}

// Valida datos de temperatura y presion
function validarDatosCuanticos(datos) {
    if (!Array.isArray(datos)) {
        return {
            valido: false,
            mensaje: 'Datos deben ser un array'
        };
    }
    
    if (datos.length === 0) {
        return {
            valido: false,
            mensaje: 'Array de datos vacio'
        };
    }
    
    for (const dato of datos) {
        if (dato.temperatura === undefined || dato.presion === undefined) {
            return {
                valido: false,
                mensaje: 'Datos incompletos: falta temperatura o presion'
            };
        }
    }
    
    return {
        valido: true,
        mensaje: 'Datos cuanticos validos'
    };
}

// Valida que los estadisticos sean validos
function validarEstadisticos(estadisticos) {
    if (!estadisticos) {
        return {
            valido: false,
            mensaje: 'Estadisticos no disponibles'
        };
    }
    
    const campos = ['promedio', 'maximo', 'minimo'];
    for (const campo of campos) {
        if (estadisticos[campo] === undefined) {
            return {
                valido: false,
                mensaje: `Campo ${campo} faltante`
            };
        }
    }
    
    return {
        valido: true,
        mensaje: 'Estadisticos validos'
    };
}

// Valida los resultados del nivel 5
function validarResultadosNivel5(resultados) {
    if (!resultados) {
        return {
            valido: false,
            mensaje: 'Resultados no disponibles'
        };
    }
    
    const campos = ['promedioGeneral', 'top10Temperaturas', 'top10Presiones', 'cantidadValidos'];
    for (const campo of campos) {
        if (resultados[campo] === undefined) {
            return {
                valido: false,
                mensaje: `Campo ${campo} faltante`
            };
        }
    }
    
    return {
        valido: true,
        mensaje: 'Resultados del nivel 5 validos'
    };
}

// Valida un nivel completo antes de habilitar siguiente
function validarCompletacionNivel(numero) {
    switch(numero) {
        case 1:
            return estadoJuego.nivel1Completado;
        case 2:
            return estadoJuego.nivel2Completado;
        case 3:
            return estadoJuego.nivel3Completado;
        case 4:
            return estadoJuego.nivel4Completado;
        case 5:
            return estadoJuego.nivel5Completado;
        default:
            return false;
    }
}

// Valida que todos los niveles esten completados
function validarTodosNivelesCompletados() {
    return (
        estadoJuego.nivel1Completado &&
        estadoJuego.nivel2Completado &&
        estadoJuego.nivel3Completado &&
        estadoJuego.nivel4Completado &&
        estadoJuego.nivel5Completado
    );
}
