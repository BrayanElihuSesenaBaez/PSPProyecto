const nombre_vacante_Input = document.querySelector('#nombre_vacante');
const experiencia_minimaInput = document.querySelector('#experiencia_minima');
const rango_sueldo1Input = document.querySelector('#rango_sueldo1');
const rango_sueldo2Input = document.querySelector('#rango_sueldo2');
const descripcionInput = document.querySelector('#descripcion');
const habilidadesInput = document.querySelector('#habilidades');


const formulario = document.querySelector('#añadir_vacante');
const contenedor_vacantes = document.querySelector('#vacantes');




let editando = false;

// Eventos
eventListeners();

function eventListeners() {
    nombre_vacante_Input.addEventListener('input', datosVacante);
    experiencia_minimaInput.addEventListener('input', datosVacante);
    rango_sueldo1Input.addEventListener('input', datosVacante);
    rango_sueldo2Input.addEventListener('input', datosVacante);
    descripcionInput.addEventListener('input', datosVacante);
    habilidadesInput.addEventListener('input', datosVacante);

    formulario.addEventListener('submit', nuevaVacante);
}

//objeto principal

const vacanteObj = {
    nombre_vacante: '',
    experiencia_minima: '',
    rango_sueldo1: '',
    rango_sueldo2: '',
    descripcion:'',
    habilidades: ''
}


function datosVacante(e) {
    console.log(vacanteObj) // Obtener el Input
     vacanteObj[e.target.name] = e.target.value;
}





// CLasses
class Vacantes {
    constructor() {
        this.vacantes = []
    }
    agregarVacante(vacante) {
        this.vacantes = [...this.vacantes, vacante];
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#añadir_vacante').insertBefore( divMensaje , document.querySelector('#alerta'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

}

const ui = new UI();
const administrarVacantes = new Vacantes();

function nuevaVacante(e) {
    e.preventDefault();

    const {nombre_vacante, experiencia_minima, rango_sueldo1, rango_sueldo2, descripcion, habilidades } = vacanteObj;

    // Validar
    if( nombre_vacante === '' || experiencia_minima === '' || rango_sueldo1 === '' || rango_sueldo2 === ''  || descripcion === '' || habilidades === '' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarVacantes.editarVacante( {...vacanteObj} );

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Vacante';

        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        vacanteObj.id = Date.now();
        
        // Añade la nueva cita
        administrarVacantes.agregarVacante({...vacanteObj});

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Imprimir el HTML de citas
    //ui.imprimirVacantes(administrarVacantes);

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}


function reiniciarObjeto() {
    // Reiniciar el objeto
    vacanteObj.nombre_vacante = '';
    vacanteObj.experiencia_minima = '';
    vacanteObj.rango_sueldo1 = '';
    vacanteObj.rango_sueldo2 = '';
    vacanteObj.descripcion = '';
    vacanteObj.habilidades = '';
}
