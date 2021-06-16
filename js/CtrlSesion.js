import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";
import {
  iniciaSesión,
  terminaSesión
} from "./seguridad.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.
  querySelector("#avatar");


getAuth().onAuthStateChanged(
  muestraSesión, muestraError);

/** Muestra los datos del usuario
 *
 * 
 * @param {import(
    "../lib/tiposFire").
    User}  */
async function
  muestraSesión(usuario) {
  if (usuario && usuario.email) {
    // Usuario aceptado.
    forma.email.value =
      usuario.email || "";
    forma.nombre.value =
      usuario.displayName || "" ;
    avatar.src =
      usuario.photoURL || "" ;
    forma.terminarSesión.
      addEventListener(
        "click", terminaSesión);
  } else {
    // No ha iniciado sesión.
    iniciaSesión();
  }
}
