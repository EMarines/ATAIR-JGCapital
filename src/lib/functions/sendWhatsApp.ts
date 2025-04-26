// c:\Users\Propietario\OneDrive\AB GrupoUrbania\OneDrive\Escritorio\Web Projects\ATAIR\src\lib\functions\sendWhatsApp.ts

// Variable para almacenar referencia a la ventana/tab abierta
let whatsappWindow: Window | null = null;

/**
 * Envía un mensaje a un número de WhatsApp usando la URL universal wa.me/.
 * Intenta abrir WhatsApp en una nueva ventana popup (escritorio/móvil).
 * El sistema operativo/navegador decidirá qué app de WhatsApp usar si hay varias.
 * Si la apertura falla con un error, intenta redirigir la pestaña actual como fallback.
 * Si la apertura es bloqueada (window.open devuelve null), informa en consola.
 *
 * @param fullTel Número de teléfono COMPLETO (con código de país).
 * @param msg Mensaje a enviar.
 * @returns Un objeto con un método `close` para intentar cerrar la ventana/tab de WhatsApp abierta (útil en escritorio).
 */
export function sendWhatsApp(fullTel: string, msg: string) {
  // 1. Verificar entorno de navegador
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    console.warn("sendWhatsApp: No se puede ejecutar fuera de un navegador.");
    return { close: () => {} };
  }

  // 2. Validar número
  if (!fullTel || !/^\d+$/.test(fullTel)) {
      console.error("sendWhatsApp: Número de teléfono inválido:", fullTel);
      return { close: () => {} };
  }

  // 3. Cerrar ventana previa (si aplica y es posible)
  if (whatsappWindow && !whatsappWindow.closed) {
    try {
        whatsappWindow.close();
        console.log("sendWhatsApp: Ventana de WhatsApp anterior cerrada.");
    } catch (e) {
        console.warn("sendWhatsApp: No se pudo cerrar la ventana anterior.", e);
    }
    whatsappWindow = null;
  }

  // 4. Codificar mensaje
  const encodedMsg = encodeURIComponent(msg);

  // 5. Construir URL universal
  const whatsappUrl = `https://wa.me/${fullTel}?text=${encodedMsg}`;

  // 6. Definir características para la ventana popup
  const windowFeatures = 'popup=yes,width=300,height=500,noopener,noreferrer,scrollbars=yes,resizable=yes'; // Ajusta tamaño si quieres
  const windowName = 'whatsappPopup';

  // 7. Intentar abrir la ventana popup
  try {
    whatsappWindow = window.open(whatsappUrl, windowName, windowFeatures);

    if (!whatsappWindow) {
         console.warn("sendWhatsApp: window.open devolvió null/falsy (posiblemente bloqueado). No se redirige.");
         // Opcional: alert("Parece que tu navegador bloqueó la ventana de WhatsApp...");
         return { close: () => console.warn("sendWhatsApp: No se abrió ventana debido a posible bloqueo.") };
    } else {
        console.log("sendWhatsApp: Ventana popup de WhatsApp abierta o intento iniciado.");
        try {
            whatsappWindow.focus();
        } catch (focusError) {
            console.warn("sendWhatsApp: No se pudo enfocar la ventana popup.", focusError);
        }
    }
  } catch (error) {
    console.error("sendWhatsApp: Error durante window.open:", error);
    console.log("sendWhatsApp: Intentando redirección directa como fallback final...");
    window.location.href = whatsappUrl;
    return { close: () => console.warn("sendWhatsApp: No se puede cerrar ventana/tab (redirección directa).") };
  }

  // 8. Devolver método close para la ventana abierta (si aplica)
  return {
    close: () => {
      if (whatsappWindow && !whatsappWindow.closed) {
        try {
            whatsappWindow.close();
            console.log("sendWhatsApp: Cierre de ventana/tab ejecutado vía close().");
            whatsappWindow = null;
        } catch (e) {
            console.warn("sendWhatsApp: Error al cerrar ventana/tab vía close().", e);
            whatsappWindow = null;
        }
      } else {
        console.log("sendWhatsApp: No hay ventana/tab para cerrar o ya estaba cerrada.");
        if (whatsappWindow) whatsappWindow = null;
      }
    }
  };
}

// La función closeWhatsAppWindow sigue igual
export function closeWhatsAppWindow(): boolean {
  // ... (código sin cambios) ...
  if (typeof window === 'undefined') {
      console.warn("closeWhatsAppWindow: No se puede ejecutar fuera de un navegador.");
      return false;
  }

  if (whatsappWindow && !whatsappWindow.closed) {
    try {
        whatsappWindow.close();
        console.log("closeWhatsAppWindow: Intento de cierre de ventana/tab de WhatsApp ejecutado.");
        whatsappWindow = null;
        return true;
    } catch (e) {
        console.warn("closeWhatsAppWindow: Error al intentar cerrar la ventana/tab.", e);
        whatsappWindow = null;
        return false;
    }
  } else {
    console.log("closeWhatsAppWindow: No hay ventana/tab de WhatsApp referenciada o ya estaba cerrada.");
    if (whatsappWindow) whatsappWindow = null;
    return false;
  }
}
