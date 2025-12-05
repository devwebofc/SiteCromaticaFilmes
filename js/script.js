// Função para carregar o vídeo do YouTube
function loadYouTubeVideo(container) {
    const src = container.getAttribute('data-src');
    if (!src) return;
    
    // Criar o iframe apenas uma vez
    if (!container.querySelector('iframe')) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('title', 'Cromática - Música, Filmes e Educação Criativa');
        container.appendChild(iframe);
    }
}

// Observar quando o vídeo estiver visível na tela
function setupVideoObserver() {
    const videoContainer = document.querySelector('.youtube-video-container');
    if (!videoContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadYouTubeVideo(entry.target);
                // Opcional: parar de observar após o carregamento
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '200px', // Carrega quando estiver a 200px de distância da área visível
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    });

    observer.observe(videoContainer);
}


document.addEventListener('DOMContentLoaded', function() {
    // Configurar o carregamento otimizado do vídeo
    setupVideoObserver();
    
    // Configurar os eventos de clique nas fotos secundárias
    const fotosSecundarias = document.querySelectorAll('.fotos-secundarias img');
    fotosSecundarias.forEach(img => {
        img.addEventListener('click', function() {
            trocarMembroAtivo(this);
        });
    });
    
    // Atualizar o ano atual no rodapé
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Adicionar classe 'scrolled' na navbar ao rolar a página
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menu mobile toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Fechar menu ao clicar em um link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Suavizar rolagem para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ativar link ativo na navegação
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Adicionar classe ativa ao primeiro link da navegação por padrão
    if (navLinksItems.length > 0) {
        navLinksItems[0].classList.add('active');
    }
    
    // Inicializar o vídeo do hero
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.play().catch(error => {
            console.log('Erro ao reproduzir o vídeo automaticamente:', error);
        });
    }
    
    // Dados dos depoimentos (mantidos pois são renderizados dinamicamente)
    const depoimentos = [
        {
            texto: 'A Cromática mudou minha vida! Aprendi muito mais do que técnicas musicais, aprendi a me expressar através da arte.',
            autor: 'Ana Clara, aluna de canto',
            curso: 'Curso de Canto',
            estrelas: 5,
            foto: 'assets/imgs/mae-depoimento.jpg'
        },
        {
            texto: 'Incrível como a equipe consegue transformar a teoria em algo tão prático e divertido. Recomendo muito!',
            autor: 'Rafael Mendes, aluno de produção musical',
            curso: 'Produção Musical',
            estrelas: 4,
            foto: 'assets/imgs/pai-depoimento.jpg'
        },
        {
            texto: 'Meu filho desenvolveu habilidades incríveis desde que começou nas aulas de música. A equipe é maravilhosa!',
            autor: 'Patrícia Oliveira, mãe de aluno',
            curso: 'Musicalização Infantil',
            estrelas: 5,
            foto: 'assets/imgs/mae2-depoimento.jpg'
        }
    ];
    
    // Renderizar depoimentos
    const depoimentosSlider = document.querySelector('.depoimentos-slider');
    if (depoimentosSlider) {
        const renderStars = (n) => {
            const total = 5;
            const qty = Math.max(0, Math.min(total, Number(n) || 0));
            let html = '';
            for (let i = 1; i <= total; i++) {
                html += `<i class="${i <= qty ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
            }
            return html;
        };

        depoimentos.forEach(depoimento => {
            const avatar = depoimento.foto && depoimento.foto.trim() !== ''
                ? depoimento.foto
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(depoimento.autor)}&background=E3000B&color=fff&rounded=true`;

            const estrelas = renderStars(depoimento.estrelas || 5);

            const depoimentoHTML = `
                <div class="depoimento-item animate-on-scroll aos-up">
                    <p class="depoimento-texto">${depoimento.texto}</p>
                    <div class="depoimento-footer">
                        <div class="depoimento-header">
                            <img class="depoimento-foto" src="${avatar}" alt="${depoimento.autor}">
                            <div class="depoimento-ident">
                                <span class="depoimento-autor">${depoimento.autor}</span>
                                <small class="depoimento-curso">${depoimento.curso}</small>
                            </div>
                        </div>
                        <div class="depoimento-estrelas" aria-label="${depoimento.estrelas || 5} de 5">
                            ${estrelas}
                        </div>
                    </div>
                </div>
            `;
            depoimentosSlider.innerHTML += depoimentoHTML;
        });
        
        // Inicializar slider de depoimentos
        const depoimentoItems = document.querySelectorAll('.depoimento-item');
        if (depoimentoItems.length > 0) {
            let currentIndex = 0;
            
            function showDepoimento(index) {
                depoimentoItems.forEach((item, i) => {
                    item.style.display = i === index ? 'block' : 'none';
                });
            }
            
            showDepoimento(0);
            
            setInterval(() => {
                currentIndex = (currentIndex + 1) % depoimentoItems.length;
                showDepoimento(currentIndex);
            }, 5000);
        }
    }
    
    // Animações ao rolar a página
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Chamar a função uma vez para verificar elementos visíveis no carregamento
    animateOnScroll();

    // Utilitário: marcar elementos com classes de animação
    function addAosClass(selector, extra = '') {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            if (extra) el.classList.add(extra);
        });
    }

    // Marcar elementos estáticos
    addAosClass('.section-header', 'aos-up');
    addAosClass('.portfolio-grid .portfolio-item', 'aos-zoom');
    addAosClass('.membro-card', 'aos-up');

    // Contadores (#numeros)
    const countersSection = document.getElementById('numeros');
    const counters = document.querySelectorAll('#numeros .counter');
    let countersPlayed = false;

    function animateCounters() {
        if (countersPlayed) return;
        countersPlayed = true;
        const duration = 1400; // ms
        counters.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const start = 0;
            const startTime = performance.now();
            function tick(now) {
                const progress = Math.min(1, (now - startTime) / duration);
                const value = Math.floor(start + (target - start) * progress);
                el.textContent = value.toString();
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target.toString();
                }
            }
            requestAnimationFrame(tick);
        });
    }

    if (countersSection && counters.length) {
        const countersObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    animateCounters();
                    countersObserver.unobserve(entry.target);
                }
            });
        }, { threshold: [0, 0.25, 0.5, 1] });
        countersObserver.observe(countersSection);
    }

    // Áudio do vídeo na seção Sobre: toca som somente quando a seção estiver visível
    const sobreSection = document.getElementById('sobre');
    const sobreVideo = document.querySelector('.sobre-video video');
    let userInteracted = false; // alguns navegadores exigem gesto do usuário para liberar áudio

    function tryPlayWithSound() {
        if (!sobreVideo) return;
        sobreVideo.muted = false;
        const p = sobreVideo.play();
        if (p && typeof p.catch === 'function') {
            p.catch(() => {
                // se o navegador bloquear, mantemos muted até haver interação do usuário
                sobreVideo.muted = true;
            });
        }
    }

    if (sobreVideo && sobreSection) {
        // Fallback: liberar áudio após o primeiro gesto (click/touch)
        const enableOnGesture = () => {
            userInteracted = true;
            document.removeEventListener('click', enableOnGesture);
            document.removeEventListener('touchstart', enableOnGesture, { passive: true });
        };
        document.addEventListener('click', enableOnGesture);
        document.addEventListener('touchstart', enableOnGesture, { passive: true });

        // Botão manual para ativar som (útil no desktop)
        const unmuteBtn = document.querySelector('.sobre-video .unmute-btn');
        if (unmuteBtn) {
            unmuteBtn.addEventListener('click', () => {
                userInteracted = true;
                tryPlayWithSound();
                const wrapper = unmuteBtn.closest('.sobre-video');
                if (wrapper) wrapper.classList.add('sound-on');
            });
        }

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // em destaque: tentar com som (se o navegador permitir)
                    if (userInteracted) {
                        tryPlayWithSound();
                    } else {
                        // sem gesto, mantém mudo porém garante reprodução
                        sobreVideo.muted = true;
                        sobreVideo.play().catch(() => {});
                    }
                } else {
                    // fora de vista: mutar e continuar em loop silencioso
                    sobreVideo.muted = true;
                    const wrapper = document.querySelector('.sobre-video');
                    if (wrapper) wrapper.classList.remove('sound-on');
                }
            });
        }, { threshold: [0, 0.5, 1] });

        obs.observe(sobreSection);
    }
});
