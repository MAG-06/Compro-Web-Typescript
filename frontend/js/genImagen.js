const form = document.getElementById("formBanBlanco");

const nombreInput = document.getElementById("nombre");
const montoInput = document.getElementById("monto");
const numeroCuentaInput = document.getElementById("numeroCuenta");
const numeroTuCuentaInput = document.getElementById("numeroTuCuenta");
const templateInput = document.getElementById("template");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const monto = montoInput.value.trim();
  const numeroCuenta = numeroCuentaInput.value.trim();
  const numeroTuCuenta = numeroTuCuentaInput.value.trim();
  const template = templateInput.value;

  if (!nombre || !monto || !numeroCuenta || !numeroTuCuenta) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const codigo = localStorage.getItem("CURRENT_USER");

  if (!codigo) {
    window.location.href = "./login.html";
    return;
  }

  const imagenGenerada = await genImagen(template, nombre, monto, numeroCuenta, numeroTuCuenta);

  if (!imagenGenerada) {
    return;
  }

  const restoTokens = await restarTokens(codigo, 2);

  if (!restoTokens) {
    alert("No se pudieron descontar tokens");
    return;
  }

  window.location.href = "./index.html";
});

async function genImagen(template, nombre, monto, numeroCuenta, numeroTuCuenta) {
  try {
    const response = await fetch("https://compro-web-qxhk.onrender.com/api/generar-imagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template,
        nombre,
        monto,
        numeroCuenta,
        numeroTuCuenta,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      alert("Error: " + data.error);
      return false;
    }

    alert(data.message);
    form.reset();

    return true;
  } catch (error) {
    console.error(error);
    alert("Error conectando con el servidor");
    return false;
  }
}

async function restarTokens(codigo, tokensARestar) {
  try {
    const response = await fetch("https://compro-web-qxhk.onrender.com/api/usuario/restarTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo,
        tokens: tokensARestar,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      alert("Error: " + data.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    alert("Error conectando con el servidor");
    return false;
  }
}