const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://alentornsofia.github.io/jsonsinfoprod/PRODUCTS.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const PROD1 = "https://alentornsofia.github.io/jsonsinfoprod/1.json"
const PROD2 = "https://alentornsofia.github.io/jsonsinfoprod/2.json"
const PROD3 = "https://alentornsofia.github.io/jsonsinfoprod/3.json"
const PROD4 = "https://alentornsofia.github.io/jsonsinfoprod/4.json"





var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

let userLogged = localStorage.getItem('User-Logged');               //TRAIGO EL ELEMENTO DEL LOCAL STORAGE
let mostrarUsuario = document.getElementById("mostrarUsuario");     // TRAIGO EL DIV QUE ESTÁ EN EL NAV
let drop = document.getElementById("drop");
let iniciarsesion = document.getElementById("iniciarsesion");

if(userLogged) {                                                    //SI HAY DATOS INGRESADOS
  userLogged = JSON.parse(userLogged);                              //TRASNFORMO EL DATO A OBJETO DE JS
  mostrarUsuario.innerText = mostrarUsuario.innerText + userLogged.email;      //AGREGO EL DATO AL DIV 
  mostrarUsuario.style = "display: inline-block";             //MODIFICO EL ESTILO PARA MOSTRAR EL DATO EN NAV
  drop.classList.remove("d-none")
  iniciarsesion.classList.remove("d-md-inline-block")
  iniciarsesion.style = "display: none";
} 

});


//CERRAR SESIÓN
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("cerrarsesion").addEventListener("click",function() {
    localStorage.removeItem('User-Logged');
    window.location= "index.html"
  })

});