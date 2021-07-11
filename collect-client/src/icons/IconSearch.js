import { html, LitElement } from 'lit-element';

export class IconSearch extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<span class="icon is-small is-right">
      <svg
        id="i-search"
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
        <circle cx="14" cy="14" r="12" />
        <path d="M23 23 L30 30" />
      </svg>
    </span>`;
  }
}
