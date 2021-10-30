//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function mostrarCarrito(productos) {
    let htmlContentToAppend = "";
    for (i = 0; i < productos.length; i++) {

        let producto = productos[i];
        let sub = producto.count*producto.unitCost;
      
            htmlContentToAppend += `
           
          

          <tr>
          <th scope="row"><img src=" `+ producto.src + `"  class="img-thumbnail""></th>
          <td class="text-center"> ${producto.name}</td>
          <td class="text-center"> <input type="number"  id="cantidad" onchange="calcularSubtotal(${producto.unitCost})"  value="${producto.count}"  min="1" max="10"></td>
          <td class="text-center" id="productosubtotal">${producto.currency} ${sub}</td>
        </tr> 


        <tr class="table-secondary">
        <th scope="row" >Datos de envío:</th>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td class="text-center"></td>


    <tr>
        
        <td>Dirección</td>
        <td class="text-center"><input type=text class="form-control" placeholder="Calle"></td>
        <td class="text-center"><input type=number class="form-control" placeholder="Número"></td>
        <td class="text-center"> <input type=text class="form-control" placeholder="Esquina"></td>
        
      </tr>
      <tr>
        
      <td>País</td>
      <td class="text-center">
      <div class="form-group">
      <select class="form-control" id="pais">
        <option>Uruguay</option>
        <option>Argentina</option>
        <option>Brasil</option>
        <option>Bolivia</option>
        <option>Perú</option>
      </select>
    </div>
      
    </tr>
    <tr class="table-secondary">
    <th scope="row" >Tipo de envío:</th>
    <td class="text-center"></td>
    <td class="text-center"></td>
    <td class="text-center"></td>


      <tr>
      <th scope="row"></th>
      <td class="text-center"><strong>Premium</strong><br>(2-5 días)</td>
      <td class="text-center">Costo de 15% sobre el subtotal</td>
      <td class="text-center"><input class="form-check-input" type="radio" name="envio" id="envio1" checked>
      <label class="form-check-label" for="flexRadioDefault1"></td>
    </tr> 
    <tr>
      <th scope="row"></th>
      <td class="text-center"><strong>Express</strong><br>(5-8 días)</td>
      <td class="text-center">Costo de 7% sobre el subtotal</td>
      <td class="text-center"><input class="form-check-input" type="radio" name="envio" id="envio2">
      <label class="form-check-label" for="flexRadioDefault1"></td>
    </tr> 
    <tr>
    <th scope="row"></th>
    <td class="text-center"><strong>Standard</strong><br>(12 a 15 días)</td>
    <td class="text-center">Costo de 5% sobre el subtotal</td>
    <td class="text-center"><input class="form-check-input" type="radio" name="envio" id="envio3">
    <label class="form-check-label" for="flexRadioDefault1"></td>
  </tr> 

  <tr class="table-secondary">
  <th scope="row" >Método de pago:</th>
  <td class="text-center"></td>
  <td class="text-center"></td>
  <td class="text-center"></td>


  <tr>
  <th scope="row"></th>
  <td class="text-center"><div class="row">Transf. bancaria <input class="form-check-input" type="radio" name="pago" id="transferencia" checked></div></td>
  
  <td class="text-center"><div class="row">Tarjeta de crédito<input class="form-check-input" type="radio" name="pago" id="tarjeta"</div></td>
  <td class="text-center"></td>
</tr> 


        <tr>
        <th scope="row">Subtotal</th>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td id="subtotal" class="text-center" >${producto.currency} ${sub}</td>
      </tr>
      <tr>
        <th scope="row">Total</th>
        <td class="text-center"></td>
        <td class="text-center"></td>
        <td id="total" class="text-center total" >${producto.currency} ${sub}</td>
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
    });
});

//CALCULO SUBTOTAL

function calcularSubtotal (preciounitario) {
    let cantidad = parseInt(document.getElementById("cantidad").value);
    subtotal = preciounitario*cantidad;
    document.getElementById("productosubtotal").innerHTML ="UYU " + subtotal;
    document.getElementById("total").innerHTML = "UYU " + subtotal;
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;

}
