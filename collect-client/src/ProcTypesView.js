import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import './btn-fab.js';
import './page-nav.js';
import './icons/icon-edit.js';
import './icons/icon-trash.js';
import './icons/icon-reload.js';

export class ProcTypesView extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      proctypesres: { type: Object },
      _procedures: { type: Array, state: true },
      _total: { type: Number, state: true },
      _limit: { type: Number, state: true },
      _skip: { type: Number, state: true },
      _searchFor: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this._searchFor = '';
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-procedures-types-list', {
        detail: {
          skip: 0,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.addEventListener('paginate', this._paginate);
  }

  _edit(p) {
    // eslint-disable-next-line no-console
    // console.log(u);
    this.dispatchEvent(
      new CustomEvent('edit-procedure-type', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
  }

  updated(changedProperties) {
    if (changedProperties.has('proctypesres')) {
      // eslint-disable-next-line no-console
      // console.log(JSON.stringify(this.proctypesres, null, 2));
      this._procedures = [...this.proctypesres.data];
      this._total = this.proctypesres.total;
      this._limit = this.proctypesres.limit;
      this._skip = this.proctypesres.skip;
    }
  }

  _paginate(e) {
    e.stopPropagation();
    const detail = { skip: e.detail.skip };
    let eventName = 'update-procedures-types-list';
    if (this._searchFor.length > 2) {
      detail.search = this._searchFor;
      eventName = 'search-procedure-type';
    }
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  _remove(p) {
    // eslint-disable-next-line no-console
    // console.log(p);
    this.dispatchEvent(
      new CustomEvent('remove-procedure-type', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
  }

  _addProcType() {
    this.dispatchEvent(
      new CustomEvent('add-procedure-type', { bubbles: true, composed: true })
    );
  }

  _searchProcType(e) {
    this._searchFor = e.target.value;
    // eslint-disable-next-line no-console
    // console.log(`searching for: ${e.target.value}`);
    // eslint-disable-next-line no-console
    if (e.target.value.length === 0) {
      this.dispatchEvent(
        new CustomEvent('update-procedures-types-list', {
          detail: {
            skip: 0,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
    if (e.target.value.length > 2) {
      this.dispatchEvent(
        new CustomEvent('search-procedure-type', {
          detail: {
            search: e.target.value,
            skip: 0,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _refreshSearch() {
    if (this._searchFor.length === 0) {
      // just update patients list
      this.dispatchEvent(
        new CustomEvent('update-procedures-types-list', {
          detail: {
            skip: 0,
          },
          bubbles: true,
          composed: true,
        })
      );
    } else if (this._searchFor.length > 2) {
      this.dispatchEvent(
        new CustomEvent('search-procedure-type', {
          detail: {
            search: this._searchFor,
            skip: 0,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <style>
        .procedure-type-card {
          margin-bottom: 0.3em;
        }
        svg {
          margin: 0.4em;
          overflow: visible;
        }
      </style>
      <section id="procedures-types" class="section">
        <div class="column is-6 is-offset-3">
          <h1 class="subtitle has-text-centered is-3">
            Tipos de Procedimentos
          </h1>
          <div
            class="is-flex
                is-flex-direction-row"
          >
            <div
              class="control is-expanded has-icons-right
                is-flex-grow-5"
            >
              <input
                class="input"
                type="search"
                @input="${this._searchProcType}"
                placeholder="buscar pelo nome ou registro"
                required
              />
              <icon-search></icon-search>
            </div>
            <div class="">
              <button
                class="button 
                    is-ghost
                    has-tooltip-arrow
                    has-tooltip-top"
                data-tooltip="Atualizar"
                @click="${this._refreshSearch}"
                @keydown="${this._refreshSearch}"
              >
                <icon-reload></icon-reload>
              </button>
            </div>
          </div>

          <br />
          <div
            class="container
            is-flex
              ${classMap({
              'is-flex-direction-column-reverse': window.screen.width < 769,
              'is-flex-direction-column': window.screen.width >= 769,
            })}"
          >
            <br />
            ${this._procedures
              ? this._procedures.map(
                  p => html`
                    <div class="card procedure-type-card">
                      <div class="card-content">
                        <div class="content is-flex is-flex-direction-row">
                          <div class="is-align-self-flex-start is-flex-grow-4">
                            <strong>${p.descr}</strong><br />
                            Cód. SUS: ${p.code}
                          </div>
                          <div
                            class="is-flex 
                            is-align-self-flex-end
                            is-flex-grow-1
                            is-flex-direction-column"
                          >
                            <div
                              class="button
                              is-white
                              is-align-self-flex-end
                              has-tooltip-arrow
                              has-tooltip-top"
                              data-tooltip="Editar"
                              @click="${() => {
                                this._edit(p);
                              }}"
                              @keydown="${() => {
                                this._edit(p);
                              }}"
                            >
                              <icon-edit></icon-edit>
                            </div>
                            <div
                              class="button 
                            is-white
                            is-align-self-flex-end
                            has-tooltip-arrow
                            has-tooltip-bottom"
                              data-tooltip="Remover"
                              @click="${() => {
                                this._remove(p);
                              }}"
                              @keydown="${() => {
                                this._remove(p);
                              }}"
                            >
                              <icon-trash></icon-trash>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `
                )
              : html`</p>`}
            <page-nav
              .total=${this._total}
              .limit=${this._limit}
              .skip=${this._skip}
            >
            </page-nav>
          </div>
        </div>
        <btn-fab
          @click="${() => {
            this._addProcType();
          }}"
        ></btn-fab>
      </section>
    `;
  }
}
