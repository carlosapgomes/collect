import { html, LitElement } from 'lit-element';

export class IconDownload extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<span class="icon is-small">
      <svg i
        d="i-download"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="16" 
        height="16" 
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2">
        <path d="M9 22 C0 23 1 12 9 13 6 2 23 2 22 10 32 7 32 23 23 22 M11 26 L16 30 21 26 M16 16 L16 30" />
      </svg>
    </span>`;
  }
}


