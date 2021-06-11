class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
      2021 Copy
      Decena Escorsa Kymberly 
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
