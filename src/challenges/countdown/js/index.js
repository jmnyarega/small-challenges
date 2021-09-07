const template = document.createElement("template");
template.innerHTML = `
    <style>
       .box {
          background: black;
          box-shadow: 0 7px 0 0 black;
          min-width: 15ch;
          isolation: isolate;
          border-radius: 1rem;
          
          position: relative;
        }

      .box::after, .box::before {
          content: "";
          border-radius: 1rem;

          position: absolute;
          inset: 0;
          z-index: -1;
      }

      .box::after {
          bottom: 50%;
          background-color: hsla(236, 21%, 26%, 90%);
      }

      .box::before {
          top: 50%;
          background-color: hsl(236, 21%, 26%);
      }

    </style>

    <div class="box">
      <slot name="value">02</slot>
    </div>
    <slot name="name">day</slot>
`;

class CountdownElement extends HTMLDivElement {
  constructor() {
    super(); // correct prototype chain is established.
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    template.appendChild(styles);
    this.updateStyles(styles);

    shadowRoot.appendChild(template.content.cloneNode(true));

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots.forEach(function (slot) {
      slot.addEventListener("slotchange", function (evt) {
        const node = slot.assignedNodes();
        console.log(node[0].innerHTML);
      });
    });
  }

  updateStyles(elem) {
    elem.textContent = `

    `;
  }
}

customElements.define("countdown-element", CountdownElement, {
  extends: "div",
});
