const listaProductos=document.querySelector("#lista-carrito tbody");
const listaCompra=document.getElementById("lista-compra");


export function compraProductos(e){
    e.preventDefault()
if (e.target.classList.contains("ExeBoton")) {
    
    const producto=e.target.parentElement.parentElement;

    leerDatosDeProducto(producto);
}
}

function leerDatosDeProducto(Produc){
const infoProducto={
    imagen:Produc.querySelector("img").src,
    tipoLibro:Produc.querySelector("h5").textContent,
    descripcion:Produc.querySelector(".CardStyle").textContent,
    precio:Produc.querySelector(".CarritoFont").textContent,
    id:Produc.querySelector("button").getAttribute("data-id"),
    cantidad:1

}
console.dir(infoProducto)
let productosLS;
productosLS=obtenerProductosLocalStorage()
productosLS.forEach(element => {
   if (element.id===infoProducto.id) {
    productosLS=element.id
   } 

});
if (productosLS===infoProducto.id) {
    console.warn("el producto ya esta (en el carrito) en el localStrorage")
   }else {
    insertarCarrito(infoProducto);
   }
}

function obtenerProductosLocalStorage(){
    let productosLocalStorage;
    if (localStorage.getItem("productos")===null ) {
        productosLocalStorage=[]
    }else {
        productosLocalStorage=JSON.parse(localStorage.getItem("productos"))
    }
    return productosLocalStorage;
}

function insertarCarrito(infoProducto){
    const row=document.createElement("tr")
    row.innerHTML=`
   
    <td>
  <img src="${infoProducto.imagen}" alt="${infoProducto.tipoLibro}" width="100">
</td>
<td>${infoProducto.tipoLibro}</td>
<td>${infoProducto.precio}</td>
<td>
  <a href="#" class="borrar-producto fas fa-times-circle" data-id="${infoProducto.id}"></a>
</td>`
listaProductos.appendChild(row);
guardarProductosLocalStrorage(infoProducto);
}

function guardarProductosLocalStrorage(infoProducto){
    let productos;
    productos=obtenerProductosLocalStorage();
    productos.push(infoProducto);
    localStorage.setItem("productos",JSON.stringify(productos));
}
export function leerLocalStrorage(){
let productosLS;
productosLS=obtenerProductosLocalStorage();
productosLS.forEach((infoProducto)=>{
    const row=document.createElement("tr")
    row.innerHTML=`
    <td>
  <img src="${infoProducto.imagen}" alt="${infoProducto.tipoLibro}" width="100" >
</td>
<td>${infoProducto.tipoLibro}</td>
<td>${infoProducto.precio}</td>
<td>
  <a href="#" class="borrar-producto fas fa-times-circle" data-id="${infoProducto.id}"></a>
</td>`
listaProductos.appendChild(row)
})

}

export function eliminarProducto(e){
    e.preventDefault()
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
        producto=e.target.parentElement.parentElement;
        productoID=producto.querySelector("a").getAttribute("data-id");
    producto.remove(); 

    eliminarProductoLocalStrorage(productoID)
    }
}

function  eliminarProductoLocalStrorage(productoID){
    let productosLS;
productosLS=obtenerProductosLocalStorage();
productosLS.forEach((productoLS,index)=>{
    if (productoLS.id=== productoID) {
        productosLS.splice(index,1)
    }
})
localStorage.setItem("productos",JSON.stringify(productosLS))
}
export function vaciarCarrito(e){
    e.preventDefault()
while(listaProductos.firstChild){
    listaProductos.removeChild(listaProductos.firstChild)
}
vaciarLocalStrora()
}

function vaciarLocalStrora(){
  window.localStorage.clear()
}
export function procesarPedido(e){
e.preventDefault(); /*  por las dudas jaja */
let array=obtenerProductosLocalStorage()

if (array.length===0) {
    Swal.fire({
        title: 'Atencion!',
        html: '<strong>Debes agregar un producto</strong> ',
        imageUrl: 'https://images.vexels.com/media/users/3/200097/isolated/preview/942820836246f08c2d6be20a45a84139-icono-de-carrito-de-compras-carrito-de-compras.png',
        width:300,
        imageWidth:200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background:'#796B5F',
        confirmButtonText:'Continuar comprando'
      })
      
}else {location.href="/pages/carrito.html"}
}

export function leerLocalStrorageCompra(){
    let productosLS=obtenerProductosLocalStorage()
    productosLS.forEach((producto)=>{
        const div=document.createElement("div")
        div.classList.add("row","py-3","mb-3")
        div.innerHTML=`
        
        <div class="col-4 mb-1">
        <!-- imagen -->
        <div class="bg-image rounded"><img class="w-100 borderImg" src="${producto.imagen}" alt="${producto.tipoLibro}"></div>
        </div>
    
    
        <div class="col-5">
        <div class="container" >
            <p class="CarritoFontP text-body-secondary">"${producto.descripcion}"
            </p>
    
        </div>
        <ul> 
            <li class="CarritoFont text-body-secondary"><i class="bi bi-book"> Colores:Todos los colores</i></li>
            <li class="CarritoFont text-body-secondary"><i class="bi bi-journal-bookmark">${producto.tipoLibro} </i></li>
            <li class="CarritoFont text-body-secondary"><i class="bi bi-cash-coin">$${producto.precio}</i></li>
            
        </ul>
        <a data-id=${producto.id} type="button" class="btn-danger fa-solid fa-trash  me-1 mb-2 mx-3 borrar-producto-compra "  style="color: #931528;"></a>
        <a type="button" class="btn-secondary  fa-solid fa-credit-card me-1 mb-2 mx-2 " style="color: #796B5F;"></a>
        </div>
        <!-- col 3 de precio -->
        <div class="col-3">
        <input type="number" min=1 class="form-control text-center cantidad" placeholder="Cantantidad" value="${producto.cantidad}">
        <p class="text-center  CarritoFont"><strong class="precio text-body-secondary">$${producto.precio}</strong>
        </p>
        <div class="d-flex justify-content-end LugarDiv ">
        <a type="button" href="https://www.elresumen.com/" target="_blank" class="btn ExeBoton2">Resumen</a>
        </div>
    </div>

    <hr/>
    <!-- TERMINA ROW R1 -->`
    listaCompra.appendChild(div);
    })
    
    
}

export const eliminarProductoCompra=(e)=>{
    e.preventDefault();
    let productoID;
   if (e.target.classList.contains("borrar-producto-compra")) {
    e.target.parentElement.parentElement.remove();
      productoID=e.target.parentElement.parentElement.querySelector("a").getAttribute("data-id")
     
   }
   eliminarProductoLocalStrorage(productoID); 
}

export function obtenerEvento(e){
    e.preventDefault()
   
    let id,cantidad,producto,productoLS;
    if (e.target.classList.contains("cantidad")) {
        producto=e.target.parentElement;
        
        id=e.target.parentElement.parentElement.querySelector("a").getAttribute("data-id")
        cantidad=producto.querySelector("input").value;
        let precio=producto.querySelector(".precio");
        
       productoLS=obtenerProductosLocalStorage();
       productoLS.forEach((producls,index)=>{
        if (producls.id===id) {
            producls.cantidad=cantidad;
             let total=producls.cantidad * producls.precio;
             precio.textContent=total.toFixed(2);
            
        }
       }) 
        localStorage.setItem("productos",JSON.stringify(productoLS))
        calcularTotal()
    }
}

 export function calcularTotal(){
    let total=0,subtotal=0,impuesto=0;
    let productoLS=obtenerProductosLocalStorage();
productoLS.forEach(producls=>{
    let totalProducto= Number(producls.cantidad*producls.precio)
    total=total+totalProducto;

})
impuesto=parseFloat(total*0.18.toFixed(2))
subtotal=parseFloat(total-impuesto).toFixed(2);
console.log(total)
document.querySelector("#totalPagar").textContent=total.toFixed(2)
document.querySelector("#iva").textContent=impuesto;
document.querySelector("#totalDeCompra").textContent=subtotal

}