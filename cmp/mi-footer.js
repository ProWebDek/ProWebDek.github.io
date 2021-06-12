class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
    `<p>
      INDOSSARE...Queremos lo mejor para ti. ||
      ©2021 
       || Decena Escorsa Kymberly ||
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
