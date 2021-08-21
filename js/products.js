//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    function cargarProductos(url) {

        fetch(url)
            .then(respuesta => respuesta.json())

            .then(datos => {
                for (i = 0; i < datos.length; i++) {

                    let productos = document.getElementById("listaproductos");
                    productos.innerHTML += `

                
                    <div class="row">
                        <div class="col-3">
                        <img src=" `+ datos[i].imgSrc +  `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ datos[i].name +`</h4>
                                
                            </div>
                            <p class="mb-1">Precio: U$S `+ datos[i].cost + ` </p>
                            <p class="mb-1">` + datos[i].description + `</p>
                        </div>
                    </div>
                
                `

                }
                
            });
           
    }
    cargarProductos(PRODUCTS_URL);
});