class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Decena Escorsa Kymberly.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
