const template = document.createElement("template");
template.innerHTML = `
    <style>
       .box {
          --black: hsla(0deg, 0%, 0%, 50%);
          --hue: 236;
          --saturation: 21%;
          --lightness: 26%;
          --alpha: 75%;

          box-shadow: 0 7px var(--black);
          min-width: 2.7rem;
          border-radius: 0.5rem;
          position: relative;
          padding: 1rem;
        }

          @media (min-width: 36rem) {
            .box {
              min-width: 15ch;
              padding: 0.5rem;
            }
          }

      .box::after, .box::before {
          --size: 0.375rem;

          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
      }
          @media (min-width: 36rem) {
            .box::after, .box::before {
              --size: 0.75rem;
            }
          }

      .box::after {
          bottom: 50%;
          border-radius: 0.5rem 0.5rem 0 0;

          background: radial-gradient(circle at 100% 100%, var(--black) var(--size), transparent 0),
                      radial-gradient(circle at 0 100%, var(--black) var(--size), transparent 0);
          background-color: hsla(
            var(--hue),
            var(--saturation),
            var(--lightness),
            var(--alpha)
          );
      }

      .box::before {
          top: 50%;
          border-radius: 0 0 0.5rem 0.5rem;

          background: radial-gradient(circle at 0 0, var(--black) var(--size), transparent 0),
            radial-gradient(circle at 100% 0, var(--black) var(--size), transparent 0);

          background-color: hsl(
            var(--hue),
            var(--saturation),
            var(--lightness)
          );
      }

    </style>

    <div class="box">
      <slot name="value">00</slot>
    </div>
    <slot name="name">day</slot>
`;

class CountdownElement extends HTMLDivElement {
  days = 08;
  hours = 23;
  mins = 55;
  secs = 41;
 
  intervals = [];

  constructor() {
    super(); // correct prototype chain is established.
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
      this.intervals.push(this.start());
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
    this.stop(this.intervals);
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
