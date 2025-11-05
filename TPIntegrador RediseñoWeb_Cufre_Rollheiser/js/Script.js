document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================
    // NAVEGACIÓN MÓVIL (Con control de scroll del body)
    // ==========================================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (menuBtn && mainNav) {
        const navLinks = mainNav.querySelectorAll('a');

        const toggleMenu = () => {
            mainNav.classList.toggle('active');
            const isActive = mainNav.classList.contains('active');
            
            menuBtn.innerHTML = isActive ? '✕' : '☰';
            menuBtn.setAttribute('aria-label', isActive ? 'Cerrar Menú' : 'Abrir Menú');
            
            // Evita el scroll del body cuando el menú está abierto
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        menuBtn.addEventListener('click', toggleMenu);

        // Cierra el menú móvil al hacer clic en cualquier enlace (para anclajes)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    toggleMenu(); 
                }
            });
        });
    }

    // ==========================================================
    // FAQ ACORDEÓN (Con rotación de icono)
    // ==========================================================
    const faqs = document.querySelectorAll(".faq-question");

    faqs.forEach((faq) => {
        // Asumiendo que el HTML del botón FAQ tiene un icono dentro:
        // <button class="faq-question">Pregunta <span>+</span></button>
        // Si no tienes icono, puedes agregarlo a la función: faq.innerHTML += ' <span>&#9660;</span>';
        const icon = faq.querySelector('span'); // Si usas un span para un icono
        
        faq.addEventListener("click", () => {
            const item = faq.parentElement;

            document.querySelectorAll(".faq-item").forEach((el) => {
                // Cierra los demás items y revierte el icono
                if (el !== item && el.classList.contains("active")) {
                    el.classList.remove("active");
                    const otherIcon = el.querySelector('.faq-question span'); // Adaptar selector de icono
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Alternar el actual y rotar el icono (si existe)
            item.classList.toggle("active");
            if (icon) {
                icon.style.transform = item.classList.contains("active") ? 'rotate(180deg)' : 'rotate(0deg)';
                icon.style.transition = 'transform 0.3s ease'; // Animación de rotación
            }
        });
    });

    // ==========================================================
    //  FORMULARIO DE INSCRIPCIÓN (Feedback visual en tiempo real)
    // ==========================================================
    const form = document.getElementById("formInscripcion");
    
    if (form) {
        const btnEnviar = document.getElementById("btnEnviar");
        const mensajeExito = document.getElementById("mensajeExito");
        
        const fields = {
            // ... (mantenemos la lista de campos para la validación) ...
            nombre: document.getElementById("nombre"),
            dni: document.getElementById("dni"),
            fechaNacimiento: document.getElementById("fechaNacimiento"),
            telefono: document.getElementById("telefono"),
            email: document.getElementById("email"),
            anioEgreso: document.getElementById("anioEgreso"),
            promedio: document.getElementById("promedio"),
            terminos: document.getElementById("terminos"),
            datosVeridicos: document.getElementById("datosVeridicos")
        };

        const validarCampo = (input) => {
            // Usa el API de validación nativa de HTML5 para mejor rendimiento
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        };

        const validarFormulario = () => {
            let valido = true;
            const hoy = new Date();
            const anioActual = hoy.getFullYear();

            // Ejecuta la validación nativa en todos los campos (excepto checkboxes)
            Object.values(fields).slice(0, -2).forEach(input => {
                 // Aquí se puede llamar validarCampo para feedback individual,
                 // pero la validación final se hace con el checkValidity global
                 if (!input.checkValidity()) valido = false;
            });
            
            // Validaciones específicas que el checkValidity nativo no cubre del todo
            const fechaNac = new Date(fields.fechaNacimiento.value);
            const edad = anioActual - fechaNac.getFullYear();
            if (edad < 16) valido = false;
            
            const promedio = parseFloat(fields.promedio.value);
            if (promedio < 1 || promedio > 10 || isNaN(promedio)) valido = false;
            
            if (parseInt(fields.anioEgreso.value) > anioActual) valido = false;

            if (!fields.terminos.checked || !fields.datosVeridicos.checked) valido = false;

            btnEnviar.disabled = !valido;
        };
        
        // Agregar feedback visual campo por campo (al perder el foco)
        Object.values(fields).forEach(input => {
            if (input.type !== 'checkbox') {
                input.addEventListener('blur', () => validarCampo(input));
            }
        });
        // También validamos al escribir (input)
        form.addEventListener("input", validarFormulario);

        // Envío del formulario
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            validarFormulario();
            
            if (!btnEnviar.disabled) {
                // Simulación de envío exitoso:
                form.style.opacity = 0;
                setTimeout(() => {
                    form.style.display = "none";
                    if (mensajeExito) mensajeExito.style.display = "block";
                    form.reset();
                }, 300);
            }
        });
    }
});

// ==========================================================
//  BOTÓN SUBIR ARRIBA (Ajuste para usar opacidad y CSS)
// ==========================================================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    // Usamos una clase para controlar el display/opacity vía CSS
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
// ------------------------------------------------------------
// JS para el Header Sticky (Cambio de estilo al hacer scroll)
// ------------------------------------------------------------
const header = document.querySelector('.header');
const SCROLL_THRESHOLD = 50; // Umbral de píxeles para activar el cambio

if (header) {
    window.addEventListener("scroll", () => {
        // Añade la clase 'scrolled' si el scroll es mayor que el umbral
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

