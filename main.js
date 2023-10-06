import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './css/style.css'
import { compraProductos, eliminarProducto, leerLocalStrorage, vaciarCarrito, procesarPedido, leerLocalStrorageCompra, eliminarProductoCompra, obtenerEvento, calcularTotal } from './src/carrito';

let productos=document.querySelectorAll("#lista-productos");
const carrito=document.getElementById("carrito");
const CarritoCompra=document.getElementById("lista-compra");
const modo=document.getElementById("modo")


cargarEvntos();
function cargarEvntos(){
    const ruta=String(location.href);
    addEventListener("DOMContentLoaded",()=>{cargarLocalStrorage()})



if (ruta.includes("carrito.html")) {
    esCarrito();

}else if(ruta.includes('contacto'))  {
    esContacto();
}else if (ruta.includes("nosotros")) {
    esNosotros();
}else if (ruta.includes("proyecto-libreria-index.netlify.app")){
    
    esIndex();
}

}


function esIndex(){
 
    const vaciarCarritoBTN=carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBTN=carrito.querySelector('#procesar-carrito')
    

        productos[0].addEventListener("click",(e)=>{compraProductos(e)});
        productos[1].addEventListener("click",(e)=>{compraProductos(e)});
        document.addEventListener("DOMContentLoaded",leerLocalStrorage())
        carrito.addEventListener("click",(e)=>eliminarProducto(e))
        vaciarCarritoBTN.addEventListener("click",(e)=>vaciarCarrito(e))
        procesarPedidoBTN.addEventListener("click",(e)=>procesarPedido(e))
        modo.addEventListener("click",()=>{leerModoLocalStorage()})

}

function esNosotros(){
    const vaciarCarritoBTN=carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBTN=carrito.querySelector('#procesar-carrito')
    document.addEventListener("DOMContentLoaded",leerLocalStrorage())
     carrito.addEventListener("click",(e)=>eliminarProducto(e)) 
    vaciarCarritoBTN.addEventListener("click",(e)=>vaciarCarrito(e))
    procesarPedidoBTN.addEventListener("click",(e)=>procesarPedido(e))
    modo.addEventListener("click",()=>{leerModoLocalStorage()})
}
function esContacto(){
    const vaciarCarritoBTN=carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBTN=carrito.querySelector('#procesar-carrito')
    
        document.addEventListener("DOMContentLoaded",leerLocalStrorage())
         carrito.addEventListener("click",(e)=>eliminarProducto(e)) 
        vaciarCarritoBTN.addEventListener("click",(e)=>vaciarCarrito(e))
        procesarPedidoBTN.addEventListener("click",(e)=>procesarPedido(e))
        modo.addEventListener("click",()=>{leerModoLocalStorage()})
        modo.addEventListener("click",()=>{console.log("12312")})
}
function esCarrito(){
    const vaciarCarritoBTN=carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBTN=carrito.querySelector('#procesar-carrito')
    document.addEventListener("DOMContentLoaded",leerLocalStrorage())
    carrito.addEventListener("click",(e)=>eliminarProducto(e))
    vaciarCarritoBTN.addEventListener("click",(e)=>vaciarCarrito(e))
    procesarPedidoBTN.addEventListener("click",(e)=>procesarPedido(e))
    modo.addEventListener("click",()=>{leerModoLocalStorage()})
    document.addEventListener("DOMContentLoaded",leerLocalStrorageCompra())
CarritoCompra.addEventListener("click",(e)=> eliminarProductoCompra(e))
calcularTotal();
CarritoCompra.addEventListener("change",(e)=>obtenerEvento(e))
CarritoCompra.addEventListener("keyup",(e)=>obtenerEvento(e))

}
function cargarLocalStrorage(){
    if (localStorage.getItem("modo")===null) {
        localStorage.setItem("modo","dark")  
        let elemento=document.querySelector("html")
        elemento.setAttribute("data-bs-theme","dark")  
    }else if(localStorage.getItem("modo")==="light"){
        let elemento=document.querySelector("html")
        elemento.setAttribute("data-bs-theme","light")  
    }
    

    
}

function leerModoLocalStorage(){

let estado=document.querySelector("html").getAttribute("data-bs-theme")
let elemento=document.querySelector("html")
let modo=obtenerModoLocalStrorage();

if (modo==="dark") {
    elemento.setAttribute("data-bs-theme","light")
    guardarModoLocalStrorage()

}else if (modo==="light") {
elemento.setAttribute("data-bs-theme","dark")
guardarModoLocalStrorage()
} 
}

function obtenerModoLocalStrorage(){
let ModoLS= localStorage.getItem("modo");
if (ModoLS===null) {
    ModoLS=null
}else {
ModoLS=localStorage.getItem("modo")}

return ModoLS;
}

function guardarModoLocalStrorage(){
    if (localStorage.getItem("modo")==="dark") {
        localStorage.setItem("modo","light")
    }else if (localStorage.getItem("modo")=== "light"){ localStorage.setItem("modo","dark")
}else localStorage.setItem("modo","dark");
    
}