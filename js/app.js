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

const inputFecha = document.getElementById("fecha");
const botonFormulario = document.getElementById("buscar");
const imagen = document.getElementById("imagen-nasa");
const descripcion = document.getElementById("explicacion-imagen");

dayjs.locale("es");
let URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/";

async function buscarFoto(fechaConFormato) {
    const urlConsulta = URL + fechaConFormato;
    const respuesta = await fetch(urlConsulta);
    if (!respuesta.ok) {
        console.log(respuesta.status);
        console.log("Hubo un error obteniendo la info");
        return null;
    } else {
        let infoFecha = await respuesta.json();
        imagen.src = infoFecha.hdurl;
        fecha.textContent = infoFecha.date;
        descripcion.innerHTML = infoFecha.explanation;
    }
}



/*Sección Natalia Buscador */

//Activar el idioma español para Dayjs
dayjs.locale("es");

//Validar que funciona Dayjs
//console.log(dayjs().format("D [de] MMMM [de] YYYY"));

//Capturar los datos de html con el id
const fecha = document.getElementById("input_fecha");
const guardar_Busquedabtn = document.getElementById("btn_buscar");
const mensaje = document.getElementById("mensaje_de_error");

//Fecha maxima permitida (Hoy)
const fechaHoy = dayjs().format("YYYY-MM-DD");
console.log("Fecha Hoy Validar" + fechaHoy);
fecha.setAttribute("max", fechaHoy);

//Activar el boton
guardar_Busquedabtn.addEventListener("click", () => {
    const fechaSeleccion = fecha.value;

    //Limpiar contenedor en caso de que hayan errores antes de validad
    mensaje.textContent = "";

    //Validar si el campo esta vacío
    if (!fechaSeleccion) {
        mensaje.textContent = "Seleccione una fecha valida";
        return;
    }

    //Verificar la fecha (que no se pase del dia actual)
    const fechaFuturo = dayjs(fechaSeleccion).isAfter(dayjs(), "day");
    if (fechaFuturo) {
        mensaje.textContent = "No puede seleccionar una fecha superior a hoy";
        return;
    }

    //Fecha anterior al 16 de junio de 1995 PRIMERA PUBLICACIÓN DE LA NASA EN LA API
    //ACLARACIÓN: en el bootstrap se puede poner el limite, pero se hace esta validación
    //en caso tal de que el bootstrap falle
    const fechaAntes = dayjs("1995-06-16");
    const muyAntigua = dayjs(fechaSeleccion).isBefore(fechaAntes, "day");
    if (muyAntigua) {
        mensaje.textContent = "La fecha no puede ser anterior al 16 de junio de 1995.";
        return;
    }

    // Si pasa todas las validaciones, transformar el formato para la API (AAAA-MM-DD a AAMMDD)
    const fechaFormateadaApi = dayjs(fechaSeleccion).format("YYMMDD");

// Llamamos a la función encargada de consultar la API con la fecha construida
  buscarFoto(fechaFormateadaApi);
});

