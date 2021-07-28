import { html, LitElement } from 'lit-element';
import './btn-fab.js';
import './page-nav.js';
import './icons/icon-edit.js';
import './icons/icon-trash.js';

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
                              has-tooltip-right"
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
                            has-tooltip-right"
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
