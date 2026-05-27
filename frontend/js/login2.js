document.addEventListener("DOMContentLoaded", () => {

    const codigo = localStorage.getItem("CURRENT_USER");

    if (codigo) {
        window.location.href = "./index.html";
    }
});