//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var listaComentarios;

function mostrarProductos(producto) {

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

            <p class= "p-4">Deslizá para ver las imágenes</p>

       </div>`


    document.getElementById("infoproducto").innerHTML = info;

}


//MOSTRAR COMENTARIOS
function mostrarComentarios(comentarios) {

    let listaComentarios = "";


    comentarios.forEach(function (comentario) {
        puntaje = "";



        for (let i = 1; i <= comentario.score; i++) {
            puntaje += `<span class="fa fa-star checked"></span>`;

        }


        for (let i = comentario.score + 1; i <= 5; i++) {
            puntaje += `<span class="fa fa-star"></span>`;

        }

        listaComentarios +=
            `
       
<div class= "col list-group-item-action">
       <div>
       
           <div>
               <div>
                   <h4>`+ comentario.user + `</h4> 
 <small class="text-muted">` + comentario.dateTime + `</small>
                   
               
               <p>` + comentario.description + `</p> 
           
           <div>${puntaje}</div>
           </div>
           </div>
       </div>
       <hr>
   </div> `

    })

    document.getElementById("comentario").innerHTML = listaComentarios;


}




//MOSTRAR INFO PRODUCTO

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            mostrarProductos(resultObj.data);
        }
    });


});



//MOSTRAR COMENTARIOS

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            listaComentarios = resultObj.data
            mostrarComentarios(listaComentarios);
        }
    });


});



//MOSTRAR CONTROLES DE COMENTARIO SI EL USUARIO ESTA LOGUEADO

document.addEventListener("DOMContentLoaded", function (e) {



    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById("nuevoComentario").style = "display: inline-block"
    }

});



//AGREGAR COMENTARIO NUEVO A LISTA DE COMENTARIOS

document.getElementById("enviarComentario").addEventListener("click", function(){

let nuevoComentario = {

        user : JSON.parse(localStorage.getItem('User-Logged')).email,
        description : document.getElementById("nuevoCom").value,
        score : getRating()
}

listaComentarios.push(nuevoComentario);

mostrarComentarios(listaComentarios)

document.getElementById("nuevoCom").value = "";



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
    <input id="star-5" type="radio" name="rating" value="5"/>
    <label for= "star-5" title="5 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-4" type="radio" name="rating" value="4"/>
    <label for= "star-4" title="4 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-3" type="radio" name="rating" value="3"/>
    <label for= "star-3" title="3 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-2" type="radio" name="rating" value="2"/>
    <label for= "star-2" title="2 stars">
    <i class= "active fa fa-star"></i>
    </label>

    <div class="star-rating">
    <input id="star-1" type="radio" name="rating" value="1"/>
    <label for= "star-1" title="1 stars">
    <i class= "active fa fa-star"></i>
    </label>

    </div>
    
    `

});




















/*<dd>
        <div class="row text-center text-lg-left pt-2">

            <div class="col-lg-3 col-md-4 col-6">
             <div class="d-block mb-4 h-100">
                 <img class="img-fluid img-thumbnail" src="` + producto.images[0] + `" alt="">
             </div>
         </div>

         <div class="col-lg-3 col-md-4 col-6">
         <div class="d-block mb-4 h-100">
             <img class="img-fluid img-thumbnail" src="` + producto.images[1] + `" alt="">
         </div>
         </div>

         <div class="col-lg-3 col-md-4 col-6">
         <div class="d-block mb-4 h-100">
             <img class="img-fluid img-thumbnail" src="` + producto.images[2] + `" alt="">
         </div>
         </div>

         <div class="col-lg-3 col-md-4 col-6">
         <div class="d-block mb-4 h-100">
             <img class="img-fluid img-thumbnail" src="` + producto.images[3] + `" alt="">
         </div>
         </div>

         <div class="col-lg-3 col-md-4 col-6">
         <div class="d-block mb-4 h-100">
             <img class="img-fluid img-thumbnail" src="` + producto.images[4] + `" alt="">
         </div>
         </div>

         </dd>
         </div>
         */






/*




         `

    <div class= "col list-group-item list-group-item-action" >
            <div class="row ">

                <div class="col  list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ comentario.user +
        `</h4> <small class="text-muted">` + comentario.dateTime + `</small>

                    </div>
                    <p class="mb-1">` + comentario.description + `</p>
                </div>

                <div style= "text-align: right;">${puntaje}</div>;
            </div>
        </div>`
    */