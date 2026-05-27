const formLogin = document.getElementById("login");
const inputCodigo = document.getElementById("codigo");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const codigo = inputCodigo.value.trim();

  if (!codigo) {
    alert("Ingresa tu código");
    return;
  }

  try {
    const response = await fetch(`https://compro-web-qxhk.onrender.com/api/usuario/${codigo}`);
    const data = await response.json();

    if (!response.ok || !data.ok) {
      alert(data.error || "Usuario no encontrado");
      return;
    }

    localStorage.setItem("CURRENT_USER", data.usuario.codigo);

    window.location.href = "./index.html";

  } catch (error) {
    console.error(error);
    alert("Error conectando con el servidor");
  }
});