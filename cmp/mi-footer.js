class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
      Decena Escorsa Kymberly 
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
