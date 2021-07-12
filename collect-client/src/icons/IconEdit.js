import { html, LitElement } from 'lit-element';

export class IconEdit extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <span class="icon is-small is-right">
        <svg
          id="i-edit"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="16"
          height="16"
          fill="none"
          stroke="currentcolor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z"
          />
        </svg>
      </span>
    `;
  }
}

