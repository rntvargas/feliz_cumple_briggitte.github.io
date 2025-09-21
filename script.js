// Configuración de la fecha del cumpleaños
const birthdayDate = new Date('2025-09-21T00:00:00');

// Elementos del DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const countdownContainer = document.getElementById('countdown-container');
const birthdayMessage = document.getElementById('birthday-message');
const particlesContainer = document.getElementById('particles');
const confettiContainer = document.getElementById('confetti');

// Variables para animaciones
let countdownInterval;
let particlesInterval;

// Función para crear partículas de fondo
function createParticles() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Duración de animación aleatoria
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// Función para crear confeti
function createConfetti() {
    const colors = ['#F8B500', '#FF6B9D', '#C44569', '#FFFFFF'];
    
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 3 + 's';
        confettiPiece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confettiPiece);
    }
}

// Función para formatear números con ceros a la izquierda
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Función para actualizar el contador regresivo
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate.getTime() - now;
    
    // Si ya es el cumpleaños o ya pasó
    if (distance < 0) {
        showBirthdayMessage();
        return;
    }
    
    // Calcular tiempo restante
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Actualizar elementos del DOM
    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);
    
    // Añadir efecto de pulso cuando quedan menos de 10 segundos
    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
        document.querySelectorAll('.countdown-number').forEach(el => {
            el.style.animation = 'pulse 0.5s infinite';
        });
    }
}

// Función para mostrar el mensaje de cumpleaños
function showBirthdayMessage() {
    clearInterval(countdownInterval);
    
    // Ocultar contador con animación
    countdownContainer.style.animation = 'fadeOut 0.5s ease-out forwards';
    
    setTimeout(() => {
        countdownContainer.style.display = 'none';
        birthdayMessage.classList.add('show');
        createConfetti();
        
        // Reproducir sonido de celebración (si está disponible)
        playBirthdaySound();
        
        // Cambiar el título de la página
        document.title = '¡Feliz Cumpleaños Briggitte! 🎉';
        
    }, 500);
}

// Función para reproducir sonido de celebración
function playBirthdaySound() {
    // Crear un contexto de audio simple para generar un sonido de celebración
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // Mi
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // Sol
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
        console.log('Audio no disponible');
    }
}

// Función para añadir efectos de hover a los elementos del contador
function addHoverEffects() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
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
        particlesInterval = setInterval(createParticles, 2000);
    } else {
        particlesInterval = setInterval(createParticles, 1000);
    }
}

// Función de inicialización
function init() {
    // Verificar si ya es el cumpleaños
    const now = new Date();
    const currentYear = now.getFullYear();
    const thisYearBirthday = new Date(currentYear, 8, 21); // Septiembre es mes 8 (0-indexado)
    
    // Si ya pasó el cumpleaños este año, mostrar para el próximo año
    if (now > thisYearBirthday) {
        birthdayDate.setFullYear(currentYear + 1);
    }
    
    // Iniciar contador regresivo
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Iniciar animaciones
    adjustAnimations();
    addHoverEffects();
    
    // Ajustar animaciones al cambiar el tamaño de ventana
    window.addEventListener('resize', () => {
        clearInterval(particlesInterval);
        adjustAnimations();
    });
    
    // Añadir efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
}

// Añadir estilos CSS adicionales para animaciones
const additionalStyles = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .countdown-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    body {
        transition: opacity 1s ease-in-out;
    }
`;

// Añadir estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
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

