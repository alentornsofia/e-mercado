mostrarDatos ()

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("guardarperfil").addEventListener("click",function() {
        
    
        let nombre = document.getElementById("nombre");     
        let apellido = document.getElementById("apellido");
        let edad = document.getElementById("edad");
        let email = document.getElementById("email");
        let telefono = document.getElementById("telefono");

            let perfil = {
                nombre: nombre.value,
                apellido: apellido.value,
                edad: edad.value,
                email: email.value,
                telefono: telefono.value, 
            
            }

            let perfiljson = JSON.stringify(perfil)

            localStorage.setItem('Perfil', perfiljson); 

    })
    
    });

    mostrarDatos ()

    //MOSTRAR LOS DATOS EN LOS IINPUT
    function mostrarDatosInput() {
        let perfil = localStorage.getItem('Perfil'); 
        perfil = JSON.parse(perfil)
        document.getElementById("nombre").value = perfil.nombre; 
        document.getElementById("apellido").value = perfil.apellido;
        document.getElementById("edad").value = perfil.edad;
        document.getElementById("email").value = perfil.email;
        document.getElementById("telefono").value = perfil.telefono;


    }

 function mostrarDatos () {

        let datos = localStorage.getItem('Perfil');

        if (datos) {
      
        datos = JSON.parse(datos)
    
        document.getElementById("pnombre").innerHTML = `<strong>Nombre</strong><br>` + datos.nombre
        document.getElementById("papellido").innerHTML =`<strong>Apellido</strong><br>` +datos.apellido
        document.getElementById("pedad").innerHTML = `<strong>Edad</strong><br>` + datos.edad
        document.getElementById("pemail").innerHTML = `<strong>Email</strong><br>` + datos.email
        document.getElementById("ptelefono").innerHTML =`<strong>Teléfono</strong><br>`  + datos.telefono

          
    }

    }


    //EDITAR PERFIL
    document.addEventListener("DOMContentLoaded", function() {

        document.getElementById("editar").addEventListener("click",function() {
            
            document.getElementById("datos").classList.add("ocultar")
            document.getElementById("formulario").classList.remove("ocultar")
            mostrarDatosInput()
            
    
        })
    });
   