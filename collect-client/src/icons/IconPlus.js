import { html, LitElement } from 'lit-element';

export class IconPlus extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<span class="icon is-small">
      <svg
        id="i-plus"
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
        <path d="M16 2 L16 30 M2 16 L30 16" />
      </svg>
    </span>`;
  }
}
