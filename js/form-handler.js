// Formulário de contato otimizado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("contato-form");
    const overlay = document.getElementById("success-overlay");

    if (form && overlay) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Desabilita os campos
            const fields = form.querySelectorAll("input, textarea, select, button");
            fields.forEach(el => el.disabled = true);

            // Envia o formulário via fetch
            await fetch(form.action, {
                method: form.method,
                body: new FormData(form)
            });

            // Exibe a mensagem
            overlay.style.display = "flex";
            overlay.style.opacity = "1";

            // Remove após 3s
            setTimeout(() => {
                overlay.style.opacity = "0";

                setTimeout(() => {
                    overlay.style.display = "none";
                    form.reset();
                    fields.forEach(el => el.disabled = false);
                }, 300); // espera animação terminar
            }, 3000);
        });
    }
});
