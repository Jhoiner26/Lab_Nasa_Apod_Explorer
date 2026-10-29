const inputFecha = document.getElementById("fecha");
const botonFormulario = document.getElementById("buscar");
const imagen = document.getElementById("imagen-nasa");
const fecha = document.getElementById("fecha-imagen");
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

//Recibe la fecha y se le da formato.
function formatearFecha(fecha) {
    let fechaConFormato = dayjs(fecha).format("YYMMDD");
    buscarFoto(fechaConFormato);
}

botonFormulario.addEventListener("click", function (event) {
    event.preventDefault();
    formatearFecha(inputFecha.value);
});
