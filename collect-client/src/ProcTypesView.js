import { html, LitElement } from 'lit-element';
import './btn-fab.js';

export class ProcTypesView extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      procedures: { type: Array },
    };
  }

  constructor() {
    super();
    /** @type {object[]} */
    this.procedures = [];
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-procedures-types-list', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _edit(d) {
    // eslint-disable-next-line no-console
    // console.log(u);
    this.dispatchEvent(
      new CustomEvent('edit-procedure-type', {
        detail: d,
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
          <div class="container">
            <h1 class="subtitle has-text-centered is-3">
              Tipos de Procedimentos
            </h1>
            <br />
            ${this.procedures
              ? this.procedures.map(
                  p => html`
                    <div class="card procedure-type-card">
                      <div class="card-content">
                        <div class="content">
                          <strong>${p.procedure}</strong><br />
                          <div
                            class="button is-white is-pulled-right"
                            @click="${() => {
                              this._edit(p);
                            }}"
                            @keydown="${() => {
                              this._edit(p);
                            }}"
                          >
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
                          </div>
                          ${p.code}
                          <br />
                        </div>
                      </div>
                    </div>
                  `
                )
              : html`</p>`}
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
