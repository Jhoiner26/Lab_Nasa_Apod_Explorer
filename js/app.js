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

