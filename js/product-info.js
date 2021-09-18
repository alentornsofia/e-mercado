var listaComentarios;     //VARIABLE PARA ARRAY DE COMENTARIOS

function mostrarProductos(producto) {           //FUNCIÓN PARA MOSTRAR DATOS DEL PRODUCTO -- titulo-imagen-precio-desripción

    let info = "";

    info += `

    <main role="main" class="pb-5">
    <div class="text-center p-4">

  <br>    <h2>`+ producto.name + `</h2> <br>

        </div> 
<div class="row">                                                     
        <div class="w-50">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">

          <div class="carousel-item active">
            <img class="d-block w-100" src="` + producto.images[0] + `" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="` + producto.images[1] + `" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="` + producto.images[2] + `" alt="Third slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="` + producto.images[3] + `" alt="Third slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="` + producto.images[4] + `" alt="Third slide">
          </div>

        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      </div>

      <div class= "w-50 col list-group-item list-group-item-action">
                  
                <div class="col list-group-item-action">    
                <br>   <h4 class="mb-1">` + producto.currency + ` ` + producto.cost + ` </h4> <br> <br>
                    <p class="mb-1">` + producto.description + `</p>
                </div>
            </div>
            </div>

            <p class= "p-4">Desliza para ver las imágenes</p>

       </div>`


    document.getElementById("infoproducto").innerHTML = info;         //CARGO LA INFORMACIÓN AL DIV EN HTML

}


//MOSTRAR COMENTARIOS
function mostrarComentarios(comentarios) {

    let listaComentarios = "";          //variable de comentarios vacía


    comentarios.forEach(function (comentario) {
        puntaje = "";



        for (let i = 1; i <= comentario.score; i++) {              //ITERACIÓN PARA SUMAR ESTRELLAS SEGÚN PUNTAJE
            puntaje += `<span class="fa fa-star checked"></span>`;

        }


        for (let i = comentario.score + 1; i <= 5; i++) {
            puntaje += `<span class="fa fa-star"></span>`;

        }

        listaComentarios +=            //AGREGO A LA LISTA DE COMENTARIOS LOS DATOS Y EL PUNTAJE
            `  
<div class= "col list-group-item-action">
       <div>
       
           <div>
               <div>
                   <h5>`+ comentario.user + `</h5>
 <small class="text-muted">` + comentario.dateTime + `</small>
                   
               
               <p>` + comentario.description + `</p> 
          
    
           <div >${puntaje}</div>
           </div>
           </div>
       </div>
       <hr>
   </div> `

    })

    document.getElementById("comentario").innerHTML = listaComentarios;               //AGREGO EL ARRAY QUE ACABO DE FORMAR AL HTML


}


//MOSTRAR CADA PRODUCTO

document.addEventListener("DOMContentLoaded", function (e) {


    if (JSON.parse(localStorage.getItem('id')).prodId == 1)        //SI EL ID DEL LOCAL STORAGE CORRESPONDE A 1

    getJSONData(PROD1).then(function (resultObj) {                 //PASO POR PARÁMETRO LA URL DEL JSON ESPECÍFICO
        if (resultObj.status === "ok") {

            mostrarProductos(resultObj.data);
        }
    });

    if (JSON.parse(localStorage.getItem('id')).prodId == 2)

    getJSONData(PROD2).then(function (resultObj) {
        if (resultObj.status === "ok") {

            mostrarProductos(resultObj.data);
        }
    });

    if (JSON.parse(localStorage.getItem('id')).prodId == 3)

    getJSONData(PROD3).then(function (resultObj) {
        if (resultObj.status === "ok") {

            mostrarProductos(resultObj.data);
        }
    });

    if (JSON.parse(localStorage.getItem('id')).prodId == 4)

    getJSONData(PROD4).then(function (resultObj) {
        if (resultObj.status === "ok") {

            mostrarProductos(resultObj.data);
        }
    });

});



//MOSTRAR COMENTARIOS

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {      //TRAIGO LA URL QUE CONTIENE LOS COMENTARIOS
        if (resultObj.status === "ok") {

            listaComentarios = resultObj.data
            mostrarComentarios(listaComentarios);                           //LE PASO POR PARÁMETRO LA VARIABLE GLOBAL
        }
    });


});


//MOSTRAR CONTROLES DE COMENTARIO SI EL USUARIO ESTA LOGUEADO

document.addEventListener("DOMContentLoaded", function (e) {

    let userLogged = localStorage.getItem('User-Logged');            //TRAIGO EL ITEM DEL LOCAL STORAGE
    if (userLogged) {
        document.getElementById("nuevoComentario").style = "display: inline-block"         //SI EL USUARIO ESTÁ LOGUEADO MODIFICO EL DISPLAY
    }

});


//AGREGAR COMENTARIO NUEVO A LISTA DE COMENTARIOS

document.getElementById("enviarComentario").addEventListener("click", function(){      //BOTON PARA ENVIAR COMENTARIO

let nuevoComentario = {                          //CREO UN OBJETO NUEVO QUE CONTENGA LOS DATOS DEL NUEVO COMENTARIO

        user : JSON.parse(localStorage.getItem('User-Logged')).email,      //NOMBRE DE USUARIO EN LOCAL STORAGE
        description : document.getElementById("nuevoCom").value,           //VALUE DEL TEXTAREA 
        score : getRating()                                                //FUNCIÓN PARA PUNTUAR COMENTARIO
}

if (document.getElementById("nuevoCom").value != "") {      //AGREGO CONDICIÓN, SI EL TEXTAREA TIENE ALGUN VALOR

listaComentarios.push(nuevoComentario);                     //AGREGO EL COMENTARIO AL ARRAY

mostrarComentarios(listaComentarios)                        //LLAMO A LA FUNCION

document.getElementById("nuevoCom").value = "";

} else {
    alert("Para poder comentar, debes escribir algo!");
}

})



//AÑADIR COMENTARIOS COMO ESTRELLAS

function getRating() {
    var elements = document.getElementsByName("rating");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }

    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("estrellas").innerHTML = `
    
    <div class="star-rating">
    <input id="star-1" type="radio" name="rating" value="1" checked/>
    <label for= "star-1" title="1 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-2" type="radio" name="rating" value="2"/>
    <label for= "star-2" title="2 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-3" type="radio" name="rating" value="3"/>
    <label for= "star-3" title="3 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-4" type="radio" name="rating" value="4"/>
    <label for= "star-4" title="4 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-5" type="radio" name="rating" value="5" />
    <label for= "star-5" title="5 stars">
    <i class= "active fa fa-star"></i>
    </label>

    </div>
    
    `

});


