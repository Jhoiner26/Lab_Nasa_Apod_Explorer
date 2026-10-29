/* Este código lo hizo Jesu */

const CLAVE_FAVORITOS = "favoritosApod";

// Lee los favoritos guardados; si no hay nada, arranca con []
function obtenerFavoritos() {
  const guardados = localStorage.getItem(CLAVE_FAVORITOS);
  if (guardados === null) {
    return [];
  }
  return JSON.parse(guardados);
}

// localStorage solo guarda texto, por eso se convierte a JSON
function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
}

// Guarda solo date y title de la APOD, sin duplicados
function agregarFavorito(apod) {
  if (!apod) {
    alert("Todavía no hay ninguna APOD cargada");
    return;
  }

  const favoritos = obtenerFavoritos();
  const yaExiste = favoritos.some((favorito) => favorito.date === apod.date);

  if (yaExiste) {
    alert("Esta APOD ya está en tus favoritos");
    return;
  }

  favoritos.push({ date: apod.date, title: apod.title });
  guardarFavoritos(favoritos);
  mostrarFavoritos();
}

// Pinta la lista; al hacer clic en un favorito se carga esa APOD
function mostrarFavoritos() {
  const listado = document.getElementById("listado-favoritas");
  const favoritos = obtenerFavoritos();
  listado.innerHTML = "";

  if (favoritos.length === 0) {
    listado.innerHTML = "<li>Aún no tienes favoritos</li>";
    return;
  }

  favoritos.forEach((favorito) => {
    const item = document.createElement("li");
    item.textContent = `${favorito.title} (${favorito.date})`;
    item.style.cursor = "pointer";
    item.addEventListener("click", () => cargarApod(favorito.date));
    listado.appendChild(item);
  });
}

document.getElementById("btn-favorito").addEventListener("click", () => {
  agregarFavorito(apodActual);
});

// Al abrir o recargar la página se muestran los favoritos guardados
mostrarFavoritos();

/* ===================== Fin código de Jesu ==================== */
