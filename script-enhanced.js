// Configuración de la fecha del cumpleaños
const birthdayDate = new Date('2025-09-21T00:00:00');

// Elementos del DOM
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownContainer = document.getElementById("countdown-container");
const birthdayMessage = document.getElementById("birthday-message");
const particlesContainer = document.getElementById("particles");
const confettiContainer = document.getElementById("confetti");
const personalMessageElement = document.getElementById("personal-message");
const birthdayAudio = document.getElementById("birthday-audio");
const playPauseButton = document.getElementById("play-pause-button");

// Frase personalizada del usuario
const userPersonalMessage = "✨ “Feliz cumpleaños, Briggitte 🎂🌻 Que este nuevo año de vida te regale tantos motivos para sonreír como estrellas hay en el cielo. Sigue brillando con tu luz única. Con cariño, Ren ✨”";

// Variables para animaciones
let countdownInterval;
let particlesInterval;
let particleTypes = ['circle', 'star', 'heart'];

// Función para crear partículas mejoradas con diferentes formas
function createEnhancedParticles() {
    const particleCount = isMobile() ? 3 : 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        
        particle.className = `particle ${type}`;
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio según el tipo
        let size;
        switch(type) {
            case 'star':
                size = Math.random() * 8 + 6;
                break;
            case 'heart':
                size = Math.random() * 6 + 4;
                break;
            default:
                size = Math.random() * 5 + 3;
        }
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Duración y delay aleatorios
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.6 + 0.3;
        
        particlesContainer.appendChild(particle);
        
        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }
}

// Función para crear confeti mejorado con formas variadas
function createEnhancedConfetti() {
    const colors = [
        'linear-gradient(45deg, #FFD700, #FF69B4)',
        'linear-gradient(45deg, #00CED1, #9370DB)',
        'linear-gradient(45deg, #FF4500, #FFD700)',
        'linear-gradient(45deg, #FF69B4, #00CED1)',
        'linear-gradient(45deg, #9370DB, #FFD700)'
    ];
    
    for (let i = 0; i < 80; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.background = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 4 + 's';
        confettiPiece.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Tamaño aleatorio
        const size = Math.random() * 8 + 8;
        confettiPiece.style.width = size + 'px';
        confettiPiece.style.height = size + 'px';
        
        confettiContainer.appendChild(confettiPiece);
    }
}

// Función para formatear números con ceros a la izquierda
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Función para crear efecto de escritura en el título - CORREGIDA
function typeWriterEffect(element, text, speed = 100) {
    if (!element) return; // Verificar que el elemento existe
    
    element.textContent = '';
    element.style.width = 'auto';
    element.style.overflow = 'visible';
    element.style.whiteSpace = 'normal';
    element.style.display = 'block';
    element.style.visibility = 'visible';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Función para actualizar el contador regresivo
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate.getTime() - now;
    
    console.log('Tiempo restante:', distance); // Debug
    
    // Si ya es el cumpleaños o ya pasó
    if (distance < 0) {
        console.log('¡Es hora del cumpleaños!'); // Debug
        showBirthdayMessage();
        return;
    }
    
    // Calcular tiempo restante
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Actualizar elementos del DOM con animación
    updateNumberWithAnimation(daysElement, formatNumber(days));
    updateNumberWithAnimation(hoursElement, formatNumber(hours));
    updateNumberWithAnimation(minutesElement, formatNumber(minutes));
    updateNumberWithAnimation(secondsElement, formatNumber(seconds));
    
    // Añadir efecto especial cuando quedan menos de 10 segundos
    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
        document.querySelectorAll('.countdown-number').forEach(el => {
            el.style.animation = 'pulse 0.3s infinite, numberGlow 0.5s infinite';
            el.style.transform = 'scale(1.2)';
        });
        
        // Añadir efecto de parpadeo al contenedor
        countdownContainer.style.animation = 'pulse 0.5s infinite';
    }
}

// Función para actualizar números con animación
function updateNumberWithAnimation(element, newValue) {
    if (element && element.textContent !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
        }, 100);
    }
}

// Función para mostrar el mensaje de cumpleaños - CORREGIDA
function showBirthdayMessage() {
    console.log('Mostrando mensaje de cumpleaños...'); // Debug
    clearInterval(countdownInterval);
    
    // Verificar que los elementos existen
    if (!birthdayMessage) {
        console.error('No se encontró el elemento birthday-message');
        return;
    }
    
    // Ocultar contador con animación mejorada
    if (countdownContainer) {
        countdownContainer.style.animation = 'fadeOut 1s ease-out forwards';
    }
    
    setTimeout(() => {
        if (countdownContainer) {
            countdownContainer.style.display = 'none';
        }
        
        // Mostrar el mensaje de cumpleaños
        birthdayMessage.style.display = 'block';
        birthdayMessage.classList.add('show');
        
        console.log('Mensaje de cumpleaños mostrado'); // Debug
        
        createEnhancedConfetti();
        
        // Efecto de escritura en el título de cumpleaños
        const birthdayTitle = document.querySelector(".birthday-title");
        if (birthdayTitle) {
            console.log('Aplicando efecto de escritura al título'); // Debug
            typeWriterEffect(birthdayTitle, "¡Feliz Cumpleaños!", 150);
        }

        // Mostrar frase personalizada - CORREGIDO
        if (personalMessageElement) {
            console.log('Mostrando mensaje personalizado:', userPersonalMessage); // Debug
            personalMessageElement.style.display = 'block';
            personalMessageElement.style.visibility = 'visible';
            
            setTimeout(() => {
                typeWriterEffect(personalMessageElement, userPersonalMessage, 50);
            }, 2000); // Esperar 2 segundos después del título
        } else {
            console.error('No se encontró el elemento personal-message');
        }
        
        // Reproducir música de fondo
        if (birthdayAudio) {
            birthdayAudio.volume = 0.5;
            birthdayAudio.play().catch(e => console.log("Error al reproducir audio: ", e));
            
            // Control de play/pause
            if (playPauseButton) {
                playPauseButton.style.display = 'block';
                playPauseButton.addEventListener("click", () => {
                    if (birthdayAudio.paused) {
                        birthdayAudio.play();
                        playPauseButton.textContent = "⏸️";
                    } else {
                        birthdayAudio.pause();
                        playPauseButton.textContent = "▶️";
                    }
                });
            }
        }
        
        // Cambiar el título de la página
        document.title = "🎉 ¡Feliz Cumpleaños Briggitte! 🎂";
        
        // Añadir efectos de vibración (si está disponible)
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }
        
    }, 1000);
}

// Función para añadir efectos de hover mejorados
function addEnhancedHoverEffects() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
            item.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)';
            
            // Añadir efecto de brillo
            const number = item.querySelector('.countdown-number');
            if (number) {
                number.style.filter = 'brightness(1.3) drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '';
            
            const number = item.querySelector('.countdown-number');
            if (number) {
                number.style.filter = '';
            }
        });
        
        // Efecto de click
        item.addEventListener('click', () => {
            item.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                item.style.animation = '';
            }, 300);
        });
    });
}

// Función para detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para ajustar animaciones según el dispositivo
function adjustAnimations() {
    if (isMobile()) {
        // Reducir la cantidad de partículas en móviles
        particlesInterval = setInterval(createEnhancedParticles, 3000);
    } else {
        particlesInterval = setInterval(createEnhancedParticles, 1500);
    }
}

// Función para crear efecto de paralaje en el fondo
function createParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        if (!isMobile()) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const decorations = document.querySelectorAll('.balloon, .star');
            decorations.forEach((decoration, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                decoration.style.transform += ` translate(${x}px, ${y}px)`;
            });
        }
    });
}

// Función de inicialización mejorada
function init() {
    console.log('Inicializando aplicación...'); // Debug
    
    // Verificar si ya es el cumpleaños
    const now = new Date();
    
    // CORRECCIÓN: Usar la fecha exacta configurada
    console.log('Fecha actual:', now);
    console.log('Fecha del cumpleaños:', birthdayDate);
    
    // Verificar si hoy es el cumpleaños (para testing)
    const isToday = now.toDateString() === birthdayDate.toDateString();
    if (isToday) {
        console.log('¡Hoy es el cumpleaños!');
        showBirthdayMessage();
        return;
    }
    
    // Efecto de escritura en el título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        typeWriterEffect(mainTitle, originalText, 100);
    }
    
    // Iniciar contador regresivo
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Iniciar animaciones
    adjustAnimations();
    addEnhancedHoverEffects();
    createParallaxEffect();
    
    // Ajustar animaciones al cambiar el tamaño de ventana
    window.addEventListener('resize', () => {
        clearInterval(particlesInterval);
        adjustAnimations();
    });
    
    // Añadir efecto de carga suave mejorado
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Precargar efectos de sonido
    if (window.AudioContext || window.webkitAudioContext) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // Preparar contexto de audio
    }
}

// FUNCIÓN DE TESTING - Eliminar en producción
function testBirthdayMessage() {
    console.log('Probando mensaje de cumpleaños...');
    showBirthdayMessage();
}

// Añadir estilos CSS adicionales para animaciones mejoradas
const enhancedStyles = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
        }
    }
    
    .countdown-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    body {
        transition: opacity 1.5s ease-in-out;
    }
    
    .main-title {
        overflow: hidden;
        white-space: nowrap;
    }
    
    #birthday-message {
        display: none;
        visibility: hidden;
    }
    
    #birthday-message.show {
        display: block !important;
        visibility: visible !important;
    }
    
    #personal-message {
        display: none;
        visibility: hidden;
    }
`;

// Añadir estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Limpiar intervalos al cerrar la página
window.addEventListener('beforeunload', () => {
    clearInterval(countdownInterval);
    clearInterval(particlesInterval);
});

// Añadir efectos de teclado para interactividad
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        // Crear efecto especial al presionar espacio
        createEnhancedParticles();
    }
    
    // PARA TESTING: Presiona 'T' para probar el mensaje de cumpleaños
    if (e.code === 'KeyT') {
        testBirthdayMessage();
    }
});

