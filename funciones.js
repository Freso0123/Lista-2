let arregloTareas = new Array();
let elementosGuardados = 0;
let done = new Audio('');
let undone = new Audio('');

function init(){

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js').then(function(registration){
        console.log('sw registrado correctamente');
    }, function(err){
        console.log('sw fallo', err);
    });
    }else{
        console.log("error")
    }
    
    let fecha = new Date();
    //console.log(fecha.getMonth());
    let mesNumero = fecha.getMonth();
    let mes ="";

    // si ya existen tareas guardadas en el LS, las vemos a obtener en la interfaz
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'));

        for(i=0; i< tareas.length; i++){
            arregloTareas.push(tareas[i]);
        }

        //mandar llamr funcion que cargue las tareas en la interfaz
        loadtareas();
    } else{
        // si no hay tareas crear el espacio de memoria en LS
        // creamos el abjeto vacio
        JSONTarea = {};
        localStorage.setItem('tareas', JSON.stringify(JSONTarea));
    }

    switch(mesNumero){
        case 0:
            mes = "Enero"
            break;

            case 1:
                mes = "Febrero"
                break;

                case 2:
                    mes = "Marzo"
                    break;

                    case 3:
                        mes = "Abril"
                        break;

                        case 4:
                            mes = "Mayo"
                            break;

                            case 5:
                                mes = "Junio"
                                break;

                                case 6:
                                    mes = "Julio"
                                    break;

                                    case 7:
                                        mes = "Agosto"
                                        break;

                                        case 8:
                                            mes = "Septiembre"
                                            break;

                                            case 9:
                                                mes = "Octubre"
                                                break;

                                                case 10:
                                                    mes = "Noviembre"
                                                    break;

                                                    case 11:
                                                        mes = "Diciembre"
                                                        break;
    }

    document.getElementById('fecha').innerHTML = fecha.getDate() + " de " + mes;
    //console.log(fecha.getDate()+ "de" + "mes");

}

function loadtareas (){
    document.querySelector('.porhacer').innerHTML = "";
    document.querySelector('.terminado').innerHTML = "";
   // alert("ya hay tarea")

   // cargar las tareas de local storage

   for(i=0; i<tareas.length; i++){
        // crear l0s elementos en el HTML

        elemento = "<div class='subBox2' id='"+i+"' onclick='cambiarEstado(this.id)'>" +
                  "<input class='ckeck' type='checkbox' id='act'>" +
                  "<label class='text' for='act'>"+tareas[i].valor+"</label>" +
                  "</div>"

        //VAMOS DIVIDDIR LAS TAREAS POR SU ESTADO PRA PODERLAS PLASMAR EN EL EESPACIO html CORESPONDIENTE 
        if(tareas[i].estatus == "pendiente"){
            document.querySelector('.porhacer').innerHTML += elemento;

        }else if(tareas[i].estatus == "terminado"){
            document.querySelector('.terminado').innerHTML += elemento;
        }

   }

   elementosGuardados = tareas.length

}

function agregar (){
    //capturar el elemento de la entrada de texto
    tareaTexto = document.getElementById('NuevaTarea');
    console.log(tareaTexto.value);

    //nuevo objeto JS

    JSONTarea= {
        'valor': tareaTexto.value,
        'estatus': 'pendiente'
    }

    //agragar nuevo elemento en la interfaz de usuario
    elemento = "<div class='subBox2' id='"+elementosGuardados+"' onclick='cambiarEstado(this.id)'>" +
    "<input class='ckeck' type='checkbox' id='act"+i+"'>" +
    "<label class='text' for='act"+i+"'>"+JSONTarea.valor+"</label>" +
    "</div>"

    //lo agrego a la interfaz
    document.querySelector('.porhacer'). innerHTML+=elemento;

    //lo agrego al areglo de json la nueva tarea
    arregloTareas.push(JSONTarea);

    //agregar al LS el arreglo JSON en fromato de texto
    localStorage.setItem('tareas',JSON.stringify(arregloTareas));

    //Limpiar cuadro de texto
    tareaTexto.value="";

    //incrementamos los elementos guardados
    elementosGuardados++;
}

function cambiarEstado(id){
    tareas = JSON.parse(localStorage.getItem('tareas'));
    if(tareas[id].estatus == 'terminado'){
        tareas[id].estatus = 'pendiente';
        //ejecutar sonido
        undone.play();
    }else{
        //ejecutar sonido
        done.play();
        tareas[id].estatus = 'terminado';
    }
    //guardarlo nuevamente en LS
    localStorage.setItem('tareas', JSON.stringify(tareas));

    //agregar
    loadtareas();
}