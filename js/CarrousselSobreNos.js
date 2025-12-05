export function iniciarCarrousselSobreNos() {
    const carrossel = document.querySelector(".historia-carrossel");
    if (!carrossel) return;

    const track = carrossel.querySelector(".historia-cards");
    const cards = Array.from(carrossel.querySelectorAll(".historia-card"));

    const indicadores = Array.from(carrossel.querySelectorAll(".indicador"));
    const prevSeta = carrossel.querySelector(".prev-seta");
    const nextSeta = carrossel.querySelector(".next-seta");

    if (!track || !cards.length || !indicadores.length || !prevSeta || !nextSeta) {
        return;
    }

    let index = 0;
    const total = cards.length;

    function atualizar() {
        track.style.transform = `translateX(-${index * 100}%)`;

        indicadores.forEach((dot, i) =>
            dot.classList.toggle("active", i === index)
        );
    }

    prevSeta.addEventListener("click", () => {
        index = index === 0 ? total - 1 : index - 1;
        atualizar();
    });

    nextSeta.addEventListener("click", () => {
        index = index === total - 1 ? 0 : index + 1;
        atualizar();
    });

    indicadores.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            atualizar();
        });
    });

    setInterval(() => {
        index = (index + 1) % total;
        atualizar();
    }, 5000);

    atualizar();
}
