const template = document.createElement("template");
template.innerHTML = `
    <style>
       .box {
          box-shadow: 0 7px 0 0 hsla(0deg, 0%, 0%, 50%);
          min-width: 2.7rem;
          border-radius: 0.5rem;
          position: relative;
        }

          @media (min-width: 36rem) {
            .box {
              min-width: 15ch;
            }
          }

      .box::after, .box::before {
          content: "";

          position: absolute;
          inset: 0;
          z-index: -1;
      }

      .box::after {
          bottom: 50%;
          border-radius: 0.5rem 0.5rem 0 0;
          background-color: hsla(236, 21%, 26%, 75%);
      }

      .box::before {
          top: 50%;
          border-radius: 0 0 0.5rem 0.5rem;
          background-color: hsl(236, 21%, 26%);
      }

    </style>

    <div class="box">
      <slot name="value">00</slot>
    </div>
    <slot name="name">day</slot>
`;

class CountdownElement extends HTMLDivElement {
  days = 1;
  hours = 23;
  mins = 58;
  secs = 40;

  constructor() {
    super(); // correct prototype chain is established.
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    this.stop(this.start());
  }

  start = () => setInterval(this.countdownHandler, 1000);

  // I assume no one will give me negative numbers 😄
  isDone = () => !(this.secs || this.mins || this.hours || this.days);

  stop = (handler) => this.isDone() && clearInterval(handler);

  countdownHandler = () => {
    this.secs += 1;

    if (this.secs === 59) {
      this.mins += 1;
      this.secs = 0;
    }

    if (this.mins === 59) {
      this.hours += 1;
      this.mins = 0;
    }

    if (this.hours === 24) {
      this.days -= 1;
      this.hours = 0;
    }
    this.updateTimer();
  };

  updateTimer = () => {
    const el = document.querySelectorAll(".countdown__value");
    const d = el[0];
    const h = el[1];
    const m = el[2];
    const s = el[3];
    s.innerText = padWithZero(this.secs);
    m.innerText = padWithZero(this.mins);
    h.innerText = padWithZero(this.hours);
    d.innerText = padWithZero(this.days);
  };
}

customElements.define("countdown-element", CountdownElement, {
  extends: "div",
});

// helpers
function padWithZero(num) {
    if (num < 10 && num >= 0) return `0${Math.ceil(num)}`;
    else if (num < 0) return `00`;
    return num;
}
