sub = ""

calcularEnvio()
function mostrarCarrito(productos) {
    let htmlContentToAppend = "";
    for (i = 0; i < productos.length; i++) {

        let producto = productos[i];
       sub = producto.count*producto.unitCost;
      
            htmlContentToAppend += `
           
          

          <tr>
          <th scope="row"><img src=" `+ producto.src + `"  class="img-thumbnail"" id="fotoproducto"></th>
          <td class="text-center" id="nombreproducto"> ${producto.name}</td>
          <td class="text-center"> <input type="number"  id="cantidad" onchange="calcularSubtotal(${producto.unitCost})"  value="${producto.count}"  min="1" max="10" required></td>
          <td class="text-center" id="productosubtotal">${sub}</td>
        </tr> 
      
                `   
    }
        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        
    }
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            
            carrito = resultObj.data.articles

            mostrarCarrito(carrito)

        }

        document.getElementById("subtotal").innerHTML = sub
        document.getElementById("total").innerHTML = sub


        var form = document.getElementById("formulario");
        form.addEventListener("submit", function(e){

                let calle = document.getElementById("inputCalle");
                let cantidad = document.getElementById("selectCantidad")
                let numero = document.getElementById("inputNumero");
                let esquina = document.getElementById("inputEsquina");
                let pais = document.getElementById("selectPais");
                let radio = document.getElementsByName("envio");
                let premium = document.getElementById("premium");
                let standard = document.getElementById("standard");
                let express = document.getElementById("express")
                let pago = document.getElementsByName("pago");
                let tarjeta = document.getElementById("tarjeta");
                let inputTarjeta = document.getElementById("inputTarjeta");
                let inputCodigo = document.getElementById("inputCodigo");
                let inputVencimiento = document.getElementById("inputVencimiento");
                let transferencia = document.getElementById("transferencia");
                let inputCuenta = document.getElementById("inputCuenta");
                let botonpago = document.getElementById("botonpago")  
                let botonm = document.getElementById("botonm")

            let infoMissing = false;
    
            //Quito las clases que marcan como inválidos
            calle.classList.remove('is-invalid');
         //  cantidad.classList.remove('is-invalid');
            numero.classList.remove('is-invalid');
            esquina.classList.remove('is-invalid');
            pais.classList.remove('is-invalid');
            premium.classList.remove('is-invalid');
            express.classList.remove('is-invalid');
            standard.classList.remove('is-invalid');
            botonpago.classList.remove('is-invalid')
            botonm.classList.remove("btn-danger")
    
            // CALLE
            if (calle.value === "")
            {
                calle.classList.add('is-invalid');
                infoMissing = true;
            }
            
            // NUMERO
            if (numero.value <=0)
            {
                numero.classList.add('is-invalid');
                infoMissing = true;
            }
            // ESQUINA
            if (esquina.value ==="")
            {
                esquina.classList.add('is-invalid');
                infoMissing = true;
            }
            // PAIS
            if (pais.value ==="")
            {
                pais.classList.add('is-invalid');
                infoMissing = true;
            }
            
                // TIPO ENVIO
                let tipoEnvio = false;
                for (let i = 0; i < radio.length; i++) {
                    const elemento = radio[i];
                    if (elemento.checked) {
                        tipoEnvio = true;
                    }
                }
                if (!tipoEnvio) {
                    premium.classList.add('is-invalid');
                    express.classList.add('is-invalid');
                   standard.classList.add('is-invalid');
                     
                    infoMissing = true;
                }

            // PAGO

            let tipoPago = false;

                const botontarjeta = pago[0];
                const botontransferencia = pago[1]


                if (botontarjeta.checked && inputTarjeta.value.length == 16 && inputCodigo.value.length == 3 && inputVencimiento.value.length == 4 ||botontransferencia.checked && inputCuenta.value !="") {
 
                        tipoPago = true;
                
                }
                
            if (!tipoPago) {
                botonm.classList.add('btn-danger');
                infoMissing = true;
  }

            if(!infoMissing)
            {

                    
                    let nombre = document.getElementById("nombreproducto").innerHTML;
                    let precio = document.getElementById("total").innerHTML;
                    document.getElementById("carritodecompras").innerHTML = ""
                    document.getElementById("carritodecompras").innerHTML += `<div class="container">

                    <div class="text-center p-4"> 
                      <div class="row col-12">
                      <br><br><br><br><br><br><br><br>
                      <div class="alert alert-success" style="width: 500px;" role="alert">
                        <h4 class="alert-heading">¡Compra realizada con éxito!</h4>
                        <p>Te enviamos un mail con el comprobante.</p>
                      </div>
                    </div>
                     </div> <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                     
            
                      </div>
                    </div>`
            
        
            }
    
            if (e.preventDefault) e.preventDefault();
                return false;
        });
    });
});

//CALCULO SUBTOTAL

function calcularSubtotal (preciounitario) {
    
    let cantidad = parseInt(document.getElementById("cantidad").value);
    subtotal = preciounitario*cantidad;
    
    document.getElementById("productosubtotal").innerHTML =subtotal;
    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("total").innerHTML = subtotal;
    
    calcularEnvio()
}

//CALCULO TOTAL
function calcularEnvio() {

    let total = parseInt(document.getElementById("subtotal").innerHTML)
    
    let envio;

    let elements = document.getElementsByName("envio");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
           
            envio = parseInt(elements[i].value)
        } 
        
    }
    
let totalConEnvio = (Math.round(total * envio)/100);

if (envio) {
    document.getElementById("total").innerHTML = totalConEnvio
}


}
