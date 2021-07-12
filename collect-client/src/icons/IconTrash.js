import { html, LitElement } from 'lit-element';

export class IconTrash extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <span class="icon is small is-right">
        <svg
          id="i-trash"
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
            d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6"
          />
        </svg>
      </span>
`;
  }
}

