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

  const response = await fetch("http://localhost:3000/api/generar-imagen", {
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

  if (!response.ok) {
    const error = await response.json();
    alert("Error: " + error.error);
    return;
  }

  const data = await response.json();
  alert(data.message);

  form.reset();
});