import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/util.js";
import {
  muestraUsuarios
} from "./navegacion.js";

const SIN_CLIENTE = /* html */
  `<option value="">
    -- Sin Cliente --
  </option>`;

const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoCliente = firestore.
  collection("Cliente");
const daoUsuario = firestore.
  collection("Usuario");

/**
 * @param {
    HTMLSelectElement} select
 * @param {string} valor */
export function
selectClientes(select,
    valor) {
  valor = valor || "";
  daoCliente.
    orderBy("nombre").
    onSnapshot(
      snap => {
        let html = SIN_CLIENTE;
        snap.forEach(doc =>
          html += htmlCliente(
            doc, valor));
        select.innerHTML = html;
      },
      e => {
        muestraError(e);
        selectClientes(
          select, valor);
      }
    );
}

/**
 * @param {
  import("../lib/tiposFire.js").
  DocumentSnapshot} doc
 * @param {string} valor */
function
  htmlCliente(doc, valor) {
  const selected =
    doc.id === valor ?
      "selected" : "";
  /**
   * @type {import("./tipos.js").
                  Pasatiempo} */
  const data = doc.data();
  return (/* html */
    `<option
        value="${cod(doc.id)}"
        ${selected}>
      ${cod(data.nombre)}
    </option>`);
}

/**
 * @param {HTMLElement} elemento
 * @param {string[]} valor */
export function
  checksRoles(elemento, valor) {
  const set =
    new Set(valor || []);
  daoRol.onSnapshot(
    snap => {
      let html = "";
      if (snap.size > 0) {
        snap.forEach(doc =>
          html +=
          checkRol(doc, set));
      } else {
        html += /* html */
          `<li class="vacio">
              -- No hay roles
              registrados. --
            </li>`;
      }
      elemento.innerHTML = html;
    },
    e => {
      muestraError(e);
      checksRoles(
        elemento, valor);
    }
  );
}

/**
 * @param {
    import("../lib/tiposFire.js").
    DocumentSnapshot} doc
 * @param {Set<string>} set */
export function
  checkRol(doc, set) {
  /**
   * @type {
      import("./tipos.js").Rol} */
  const data = doc.data();
  const checked =
    set.has(doc.id) ?
      "checked" : "";
  return (/* html */
    `<li>
      <label class="fila">
        <input type="checkbox"
            name="rolIds"
            value="${cod(doc.id)}"
          ${checked}>
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <span
              class="secundario">
          ${cod(data.descripción)}
          </span>
        </span>
      </label>
    </li>`);
}

/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
export async function
  guardaUsuario(evt, formData,
    id) {
  try {
    evt.preventDefault();
    const clienteId =
      getForánea(formData,
        "clienteId");
    const rolIds =
      formData.getAll("rolIds");
    await daoUsuario.
      doc(id).
      set({
        clienteId,
        rolIds
      });
    const avatar =
      formData.get("avatar");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}
