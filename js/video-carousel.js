// Carrossel de vídeos da section festival
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.video-indicators .indicator');
    const slides = document.querySelectorAll('.video-slide');
    
    if (indicators.length === 0 || slides.length === 0) return;
    
    function showVideo(index) {
        // Remove classe active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao vídeo selecionado
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // Adiciona evento de clique aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showVideo(index);
        });
    });
    
    // Auto-troca a cada 8 segundos
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showVideo(currentIndex);
    }, 8000);
});
