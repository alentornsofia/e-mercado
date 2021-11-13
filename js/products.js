const ASCENDENTE = "AZ";
const DESCENDENTE = "ZA";
const RELEVANCIA = "Relevancia";
var arrayProductos = [];
var criterioActual = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar;

//FUNCION PARA ORDENAR PRODUCTOS POR CRITERIO
function sortProductos(criterio, array) {
    let result = [];
    if (criterio === ASCENDENTE) {                         //ASCENDENTE
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === DESCENDENTE) {               //ASCENDENTE
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === RELEVANCIA) {                //RELEVANCIA
        result = array.sort(function (a, b) {
            let aCount = a.soldCount;
            let bCount = b.soldCount;

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//FUNCION PARA MOSTRAR PRODUCTOS EN PANTALLA
function mostrarProductos() {
    let htmlContentToAppend = "";
    for (i = 0; i < arrayProductos.length; i++) {

        let category = arrayProductos[i];

        
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
                if (buscar == undefined || category.name.toLowerCase().indexOf(buscar) != -1){
            htmlContentToAppend += `   

                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                  <a onclick="guardarId(`+category.id+` )" style="cursor: pointer" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top"  src="`+ category.imgSrc +`">
                    <h3 class="m-3">`+ category.name +`</h3>
                    
                    <div class="card-body" >
                    <small>` + category.soldCount + ` artículos</small>
                    <p class="card-text">` + category.description + `</p>
                    <p class="mb-1"><strong>` + category.currency + ` ` + category.cost + ` </strong></p>
                      
                    </div>
                  </a>
                </div>`


        }}
    }
       
        document.getElementById("listaproductos").innerHTML = htmlContentToAppend;
        
    }

    
//FUNCION PARA GUARDAR ID DEL PRODUCTO

function guardarId (id) {

    localStorage.setItem ('id', JSON.stringify({prodId:id}));
    window.location = 'product-info.html'
}


//FUNCION PARA FILTRAR LOS PRODUCTOS
function filtrarProductos(criterio, array) {
    criterioActual = criterio;

    if (array != undefined) {
        arrayProductos = array;
    }

    //ACÁ GUARDO EN LA VARIABLE ARRAYPRODUCTOS EL RESULTADO DE LA FUNCION SEGUN CRITERIO
    arrayProductos = sortProductos(criterioActual, arrayProductos);  //MODIFICACION DEL ARRAY POR CRITERIO

    //Muestro las categorías ordenadas
    mostrarProductos();
};


document.getElementById("buscador").addEventListener('input', function(){

    buscar = document.getElementById("buscador").value.toLowerCase();

    mostrarProductos();

});


//GETJSONDATA
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            filtrarProductos(ASCENDENTE, resultObj.data);
        }
    });

    document.getElementById("ascendente").addEventListener("click", function () {    //LLAMADO A FUNCIÓN ASCENDENTE
        filtrarProductos(ASCENDENTE);
    });

    document.getElementById("descendente").addEventListener("click", function () {    //LLAMADO A FUNCIÓN DESCENDENTE
        filtrarProductos(DESCENDENTE);
    });

    document.getElementById("relevancia").addEventListener("click", function () {     //LLAMADO A FUNCIÓN RELEVANCIA
        filtrarProductos(RELEVANCIA);
    });


    //LIMPIAR FILTROS
    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("precioMinimo").value = "";
        document.getElementById("precioMaximo").value = "";

        minCount = undefined;
        maxCount = undefined;

        mostrarProductos();     //VUELVE A MOSTRAR TODOS LOS PRODUCTOS
    });



    document.getElementById("filtrar").addEventListener("click", function () {     //PRECIO MINIMO - PRECIO MAXIMO
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("precioMinimo").value;  //LE ASIGNO A LAS VARIABLES EL VALOR ASIGNADO POR EL USUARIO
        maxCount = document.getElementById("precioMaximo").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount); 
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        mostrarProductos();
    });


});