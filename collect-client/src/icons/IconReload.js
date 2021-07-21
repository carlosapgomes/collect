import { html, LitElement } from 'lit-element';

export class IconReload extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<span class="icon is-small">
      <svg 
        id="i-reload"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32" 
        width="16" 
        height="16" 
        fill="none" 
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2">
         <path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2" />
    </svg>
    </span>`;
  }
}

