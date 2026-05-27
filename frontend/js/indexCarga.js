document.addEventListener("DOMContentLoaded", async () => {

    const pTokens = document.getElementById("tokenCount");
    const codigo = localStorage.getItem("CURRENT_USER");

    if (!codigo) {
        window.location.href = "./login.html";
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/api/usuario/${codigo}`);
        const data = await response.json();

        if (!response.ok || !data.ok) {
            alert(data.error || "Usuario no encontrado");
            window.location.href = "./login.html";
            return;
        }

        if (pTokens) {
            pTokens.textContent = data.usuario.tokens;
        }

    } catch (error) {

        console.error(error);
        alert("Error conectando con el servidor");

    }

});