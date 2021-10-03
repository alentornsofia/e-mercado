//validación LogIn
document.addEventListener("DOMContentLoaded", function() {

document.getElementById("botonsubmit").addEventListener("click",function() {

    let inputEmail = document.getElementById("inputEmail");       //TRAIGO LOS CAMPOS POR ID
    let inputPassword = document.getElementById("inputPassword");
    let datosIngresados = true;                                   

    if(inputEmail.value === "") {                //SI EL CAMPO ESTÁ VACÍO
        inputEmail.classList.add("empty");       //AGREGO LA CLASE PARA MOSTRAR QUE FALTA COMPLETAR
        datosIngresados = false;                 //LA VARIABLE PASA A SER FALSE
    } else {
        inputEmail.classList.remove("empty");    //SI ESTA OK, SACO LA CLASE EMPTY
    }

    if(inputPassword.value === ""){
        inputPassword.classList.add("empty");
        datosIngresados = false;
    } else{
        inputPassword.classList.remove("empty");
    }

    if(datosIngresados) {                        //SI LOS DATOS FUERON INGRESADOS
        localStorage.setItem('User-Logged', JSON.stringify({email: inputEmail.value})); //Dato del email en Local Storage
        window.location = "inicio.html"          //REDIRIJO A INICIO.HTML
    } else {
        alert("Falta ingresar datos");           //SI DATOS INGRESADOS ES FALSE, ALERTA DE INCOMPLETO
    }
})

});