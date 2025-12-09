/**
 * Integración Culqi Checkout v4 - DEMO
 * Módulo para tokenización de tarjetas
 */

// Configuración Culqi (DEMO)
const CULQI_CONFIG = {
    publicKey: "pk_test_XXXXXXXXXXXXXXXX", // Reemplazar con tu clave pública de prueba
    title: "Dulce Aroma Ica",
    currency: "PEN",
    amount: 0 // Se actualiza dinámicamente
};

/**
 * Inicializar Culqi con la configuración
 */
export function inicializarCulqi(monto) {
    if (!window.Culqi) {
        console.error("❌ Culqi no se ha cargado. Verifica que el script esté en el <head>");
        return false;
    }

    // Configurar clave pública
    Culqi.publicKey = CULQI_CONFIG.publicKey;

    // Configurar opciones del modal
    Culqi.settings({
        title: CULQI_CONFIG.title,
        currency: CULQI_CONFIG.currency,
        amount: monto * 100 // Culqi usa centavos
    });

    console.log("✔ Culqi inicializado correctamente");
    return true;
}

/**
 * Abrir modal de Culqi
 */
export function abrirCulqi() {
    if (!window.Culqi) {
        console.error("❌ Culqi no está disponible");
        return false;
    }

    try {
        Culqi.open();
        return true;
    } catch (error) {
        console.error("❌ Error al abrir Culqi:", error);
        return false;
    }
}

/**
 * FUNCIÓN OBLIGATORIA: culqi()
 * Culqi llama automáticamente a esta función cuando el usuario genera un token
 */
window.culqi = function() {
    if (Culqi.token) {
        // Token generado exitosamente
        const token = Culqi.token;
        console.log("✔ Token generado:", token);
        console.log("📋 Token completo:", Culqi.token);
        
        // Mostrar token en alert
        alert(`✔ Token generado exitosamente:\n\n${token}`);

        
    } else if (Culqi.error) {
        // Error en la tokenización
        console.error("❌ Error de Culqi:", Culqi.error);
        alert(`❌ Error: ${Culqi.error}`);
    }
};

/**
 * Validar si Culqi está listo
 */
export function esCulqiDisponible() {
    return window.Culqi !== undefined;
}
