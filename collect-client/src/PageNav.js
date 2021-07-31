import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class PageNav extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      total: { type: Number },
      limit: { type: Number },
      skip: { type: Number },
      _currentPage: { type: Number, state: true },
      _lastPage: { type: Number, state: true },
      _nextPage: { type: Number, state: true },
      _prevPage: { type: Number, state: true },
    };
  }

  constructor() {
    super();
    this._updatePages();
  }

  updated(changedProperties) {
    if (
      changedProperties.has('skip') ||
      changedProperties.has('total') ||
      changedProperties.has('limit')
    ) {
      this._updatePages();
    }
  }

  _updatePages() {
    this._currentPage = parseInt(this.skip / this.limit, 10) + 1;
    this._lastPage = parseInt(this.total / this.limit, 10);
    if (this.total % this.limit !== 0) {
      this._lastPage += 1;
    }
    this._nextPage =
      this._currentPage === this._lastPage
        ? this._lastPage
        : this._currentPage + 1;
    this._prevPage = this._currentPage === 1 ? 1 : this._currentPage - 1;
  }

  _gotoFirstPage() {
    this.dispatchEvent(
      new CustomEvent('paginate', {
        detail: {
          skip: 0,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _gotoLastPage() {
    this.dispatchEvent(
      new CustomEvent('paginate', {
        detail: {
          skip: parseInt(this.total / this.limit, 10) * this.limit,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _gotoPrevPage() {
    let skip = this.skip - this.limit;
    if (skip < 0) {
      skip = 0;
    }
    this.dispatchEvent(
      new CustomEvent('paginate', {
        detail: {
          skip,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _gotoNextPage() {
    let skip = this.skip + this.limit;
    if (skip > this.total) {
      // we are already at the last page
      skip = this.skip;
    }
    this.dispatchEvent(
      new CustomEvent('paginate', {
        detail: {
          skip,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<nav
      class="pagination is-small"
      role="navigation"
      aria-label="pagination"
    >
      <button
        class="pagination-previous button"
        ?disabled="${this.skip === 0 || Number.isNaN(this._prevPage)}"
        @click="${this._gotoPrevPage}"
      >
        <span class="icon">
          <svg
            id="i-caret-left"
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
            <path d="M22 30 L6 16 22 2 Z" />
          </svg>
        </span>
      </button>
      <button
        class="pagination-next button"
        ?disabled="${this._currentPage === this._lastPage ||
        Number.isNaN(this._nextPage)}"
        @click="${this._gotoNextPage}"
      >
        <span class="icon">
          <svg
            id="i-caret-right"
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
            <path d="M10 30 L26 16 10 2 Z" />
          </svg>
        </span>
      </button>
      <ul class="pagination-list">
        <li>
          <button
            class="pagination-link button ${classMap({
              'is-hidden': this._currentPage === 1,
            })}"
            aria-label="Goto page 1"
            @click="${this._gotoFirstPage}"
          >
            1
          </button>
        </li>
        <li>
          <span
            class="pagination-ellipsis ${classMap({
              'is-hidden':
                this._currentPage === 1 ||
                this._currentPage - 1 === 1 ||
                this._prevPage === 2 ||
                Number.isNaN(this._prevPage),
            })}"
            >&hellip;</span
          >
        </li>
        <li>
          <button
            class="pagination-link button ${classMap({
              'is-hidden':
                this._currentPage === 1 ||
                this._currentPage - 1 === 1 ||
                Number.isNaN(this._prevPage),
            })}"
            aria-label="Goto previous page"
            @click="${this._gotoPrevPage}"
          >
            ${this._prevPage}
          </button>
        </li>
        <li>
          <button
            class="pagination-link is-current button ${classMap({
              'is-hidden': Number.isNaN(this._currentPage),
            })}"
            aria-label="current page"
            aria-current="page"
          >
            ${this._currentPage}
          </button>
        </li>
        <li>
          <button
            class="pagination-link button ${classMap({
              'is-hidden':
                this._currentPage === this._lastPage ||
                Number.isNaN(this._nextPage),
            })}"
            aria-label="Goto page 47"
            @click="${this._gotoNextPage}"
          >
            ${this._nextPage}
          </button>
        </li>
        <li>
          <span
            class="pagination-ellipsis ${classMap({
              'is-hidden':
                this._currentPage === this._lastPage ||
                this._currentPage === this._lastPage - 1 ||
                this._nextPage === this._lastPage - 1 ||
                Number.isNaN(this._nextPage),
            })}"
            >&hellip;</span
          >
        </li>
        <li>
          <button
            class="pagination-link button ${classMap({
              'is-hidden':
                this._currentPage === this._lastPage ||
                this._currentPage === this._lastPage - 1 ||
                Number.isNaN(this._lastPage),
            })}"
            aria-label="Goto page 86"
            @click="${this._gotoLastPage}"
          >
            ${this._lastPage}
          </button>
        </li>
      </ul>
    </nav>`;
  }
}
