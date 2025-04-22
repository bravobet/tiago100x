document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dataLayer para GTM
    window.dataLayer = window.dataLayer || [];
    
    // Detectar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Animações e interatividade - otimizadas para mobile
    initAnimations(isMobile);
    initButtonEffects();
    initScrollEffects();
    
    // Reduzir efeitos visuais em dispositivos móveis
    if (!isMobile) {
        initParticles();
    } else {
        // Versão simplificada de partículas para mobile
        initLightParticles();
    }
    
    // Tracking de eventos
    trackButtonClicks();
    
    // Otimização de imagens
    lazyLoadImages();
});

// Inicializar animações
function initAnimations(isMobile) {
    // Animação de entrada dos elementos
    const elementsToAnimate = document.querySelectorAll('.profile, .subtitle, .hero, .feature-box, .benefit-card, .bottom-cta');
    
    // Reduzir atraso entre animações em dispositivos móveis
    const delay = isMobile ? 50 : 100;
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay * index);
    });
    
    // Animação de pulse para os botões CTA após um tempo
    // Verificar se o usuário prefere menos animações
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        setTimeout(() => {
            const ctaButtons = document.querySelectorAll('.cta-button');
            ctaButtons.forEach(button => {
                button.classList.add('pulse');
                
                // Remover a classe após a animação para permitir repetições
                button.addEventListener('animationend', () => {
                    button.classList.remove('pulse');
                    
                    // Repetir a animação periodicamente - menos frequente em mobile
                    const interval = isMobile ? 15000 : 10000;
                    
                    setInterval(() => {
                        button.classList.add('pulse');
                        button.addEventListener('animationend', () => {
                            button.classList.remove('pulse');
                        }, { once: true });
                    }, interval); // Repetir a cada 10-15 segundos
                }, { once: true });
            });
        }, isMobile ? 3000 : 2000); // Atrasar mais em dispositivos móveis
    }
}

// Inicializar efeitos de botões
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .feature-box, .benefit-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    buttons.forEach(button => {
        if (!isTouchDevice) {
            // Efeito de hover apenas para dispositivos não-touch
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
            
            // Efeito de clique
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        } else {
            // Para dispositivos touch, adicionar feedback visual ao toque
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
                
                // Pequeno atraso para mostrar o efeito visual
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        }
    });
}

// Inicializar efeitos de scroll
function initScrollEffects() {
    // Elementos que aparecem com o scroll
    const elementsToShow = document.querySelectorAll('.feature-box, .benefit-card');
    
    // Configurar estilo inicial
    elementsToShow.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Função para verificar posição e mostrar elementos
    function checkPosition() {
        const windowHeight = window.innerHeight;
        
        elementsToShow.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Verificar posição inicial e adicionar listener para scroll
    checkPosition();
    
    // Usar passive: true para melhorar desempenho
    window.addEventListener('scroll', checkPosition, { passive: true });
}

// Inicializar partículas de fundo (versão completa)
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Criar partículas
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

// Inicializar partículas de fundo (versão leve para mobile)
function initLightParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Criar menos partículas para dispositivos móveis
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
}

// Criar uma partícula individual
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Tamanho aleatório - menor em média para melhor desempenho
    const size = Math.random() * 3 + 1;
    
    // Velocidade aleatória - mais lenta para melhor desempenho
    const speedX = (Math.random() - 0.5) * 0.1;
    const speedY = (Math.random() - 0.5) * 0.1;
    
    // Opacidade aleatória
    const opacity = Math.random() * 0.3 + 0.1;
    
    // Aplicar estilos
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    
    // Animar a partícula
    animateParticle(particle, posX, posY, speedX, speedY);
}

// Animar uma partícula
function animateParticle(particle, x, y, speedX, speedY) {
    // Usar requestAnimationFrame para melhor performance
    let rafId;
    
    function update() {
        // Atualizar posição
        x += speedX;
        y += speedY;
        
        // Verificar limites e inverter direção se necessário
        if (x <= 0 || x >= 100) {
            speedX = -speedX;
        }
        
        if (y <= 0 || y >= 100) {
            speedY = -speedY;
        }
        
        // Aplicar nova posição
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Continuar animação
        rafId = requestAnimationFrame(update);
    }
    
    // Iniciar animação
    update();
    
    // Limpar animação quando a página não estiver visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            update();
        }
    });
}

// Implementar lazy loading para imagens
function lazyLoadImages() {
    // Verificar se o navegador suporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Observar todas as imagens com atributo data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Função para obter todos os parâmetros da URL de uma vez
function getAllUrlParameters() {
    const params = {};
    
    try {
        // Obter a string de consulta da URL
        const queryString = window.location.search.substring(1);
        
        // Log para depuração
        console.log('Query string completa:', queryString);
        
        if (queryString) {
            // Dividir a string de consulta em pares de chave=valor
            const pairs = queryString.split('&');
            
            // Log para depuração
            console.log('Número de parâmetros encontrados:', pairs.length);
            
            // Processar cada par
            for (let i = 0; i < pairs.length; i++) {
                try {
                    // Dividir o par em chave e valor
                    const pair = pairs[i].split('=');
                    
                    // Decodificar a chave
                    const key = decodeURIComponent(pair[0]);
                    
                    // Decodificar o valor (se existir)
                    const value = pair.length > 1 ? decodeURIComponent(pair[1].replace(/\+/g, ' ')) : '';
                    
                    // Adicionar ao objeto de parâmetros
                    params[key] = value;
                    
                    // Log para depuração
                    console.log(`Parâmetro capturado: ${key} = ${value}`);
                } catch (pairError) {
                    console.error('Erro ao processar par de parâmetros:', pairs[i], pairError);
                }
            }
        }
    } catch (error) {
        console.error('Erro ao processar parâmetros da URL:', error);
    }
    
    // Verificar se algum parâmetro UTM está presente
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'lp'];
    let utmFound = false;
    
    utmParams.forEach(param => {
        if (params[param]) {
            console.log(`Parâmetro ${param} encontrado: ${params[param]}`);
            utmFound = true;
        }
    });
    
    if (!utmFound) {
        console.warn('Nenhum parâmetro UTM ou fbclid encontrado na URL');
    }
    
    // Log final com todos os parâmetros
    console.log('Todos os parâmetros capturados:', JSON.stringify(params));
    
    return params;
}

// Rastrear cliques nos botões e enviar dados para o n8n antes de redirecionar
function trackButtonClicks() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir o comportamento padrão do link
            
            // URL de destino do Telegram
            const telegramUrl = this.getAttribute('href');
            
            // Rastrear evento de clique no Facebook Pixel (Lead)
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: 'Tiago 100x - Grupo de Lives',
                    content_category: 'Telegram Subscription'
                });
            }
            
            // Obter todos os parâmetros da URL de uma vez
            const params = getAllUrlParameters();
            
            // Dados para enviar ao n8n
            const data = {
                expert: 'tiago100x'
            };
            
            // Adicionar todos os parâmetros da URL ao objeto data
            // Usar um método mais direto para garantir que todos os parâmetros sejam incluídos
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    data[key] = params[key];
                    console.log(`Adicionando parâmetro ao objeto de dados: ${key}=${params[key]}`);
                }
            }
            
            console.log('Dados para enviar ao n8n:', data);
            
            // Endpoint do n8n
            const n8nEndpoint = 'https://whkn8n.meumenu2023.uk/webhook/fbclid-landingpage';
            
            // Enviar dados para o n8n via POST
            // Converter para string JSON e registrar no console para depuração
            const jsonData = JSON.stringify(data);
            console.log('JSON a ser enviado:', jsonData);
            
            // Função para tentar novamente o envio em caso de falha
            const sendData = () => {
                fetch(n8nEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=UTF-8',
                    },
                    body: jsonData,
                    mode: 'no-cors'
                })
                .then(response => {
                    console.log('Resposta do servidor recebida');
                    // Redirecionar para o Telegram após o envio dos dados
                    window.location.href = telegramUrl;
                })
                .catch(error => {
                    console.error('Erro ao enviar dados:', error);
                    // Em caso de erro, redirecionar mesmo assim
                    window.location.href = telegramUrl;
                });
            };
            
            // Tentar enviar os dados
            sendData();
            
            // Adicionar efeito visual ao clicar
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    });
}

// Funções de utilidade
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adicionar funcionalidade de smooth scroll para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar contador de pessoas online (simulado)
function initOnlineCounter() {
    const counterElement = document.querySelector('.online-counter');
    
    if (counterElement) {
        // Gerar número aleatório entre 120 e 250
        const baseCount = Math.floor(Math.random() * (250 - 120 + 1)) + 120;
        counterElement.textContent = baseCount;
        
        // Atualizar periodicamente
        setInterval(() => {
            // Adicionar ou subtrair um pequeno número aleatório para simular flutuação
            const change = Math.floor(Math.random() * 7) - 3; // -3 a +3
            const newCount = parseInt(counterElement.textContent) + change;
            
            // Manter dentro de limites razoáveis
            if (newCount >= 110 && newCount <= 260) {
                counterElement.textContent = newCount;
            }
        }, 5000);
    }
}

// Inicializar contador se o elemento existir
if (document.querySelector('.online-counter')) {
    initOnlineCounter();
}

// Adicionar data dinâmica para elementos com a classe 'current-date'
document.querySelectorAll('.current-date').forEach(element => {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    element.textContent = now.toLocaleDateString('pt-BR', options);
});

// Detectar se o usuário está em um dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Ajustar a experiência com base no dispositivo
if (isMobile) {
    document.body.classList.add('mobile-device');
    
    // Otimizações para dispositivos móveis
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.display = 'none';
    });
}

// Adicionar CSS para animações
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.7);
    }
    70% {
        box-shadow: 0 0 0 15px rgba(0, 136, 204, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(0, 136, 204, 0);
    }
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}

.pulse {
    animation: pulse 1s ease-in-out;
}

.particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.particle {
    position: absolute;
    background-color: rgba(0, 136, 204, 0.3);
    border-radius: 50%;
}
</style>
`);
