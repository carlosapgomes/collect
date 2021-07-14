import { html, LitElement } from 'lit-element';
import './btn-fab.js';

export class ProcsView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      procedures: { type: Array },
      date: { type: String },
    };
  }

  constructor() {
    super();
    this.procedures = [];
    this.date = '';
  }

  firstUpdated() {
    [this.date] = window.dayjs().format().split('T');
    this.dispatchEvent(
      new CustomEvent('update-procedures-list', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('update-doctors-list', { bubbles: true, composed: true })
    );
    this.dispatchEvent(
      new CustomEvent('update-procedures-types-list', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _edit(p) {
    this.dispatchEvent(
      new CustomEvent('edit-procedure', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
  }

  _addProc() {
    this.dispatchEvent(
      new CustomEvent('add-procedure', { bubbles: true, composed: true })
    );
  }

  _updateProcsByDate(e) {
    if (e.target.value) {
      const values = e.target.value.split('-');
      const date = `${values[2]}/${values[1]}/${values[0]}`;
      this.dispatchEvent(
        new CustomEvent('update-procedures-list-by-date', {
          detail: date,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <style>
        .proc-card {
          margin-bottom: 0.3em;
        }
        svg {
          margin: 0.4em;
          overflow: visible;
        }
      </style>
      <section id="procedures" class="section">
        <div class="column is-6 is-offset-3">
          <div class="container">
            <h1 class="subtitle has-text-centered is-3">Procedimentos</h1>
            <input
              id="procs-date"
              class="input"
              type="date"
              .value="${this.date}"
              @change="${this._updateProcsByDate}"
            />
            <br />
            <br />
            ${this.procedures
              ? this.procedures.map(
                  p => html`
                    <div class="card proc-card">
                      <div class="card-content">
                        <div class="content is-flex is-flex-direction-row">
                          <div class="is-align-self-flex-start is-flex-grow-4">
                            <strong>${p.descr}</strong>
                            <small>
                              Data:
                              ${window
                                .dayjs(p.procDateTime)
                                .format('DD/MM/YYYY HH:MM')}<br />
                              Paciente: ${p.ptName}<br />
                              Médico: ${p.docName}
                            </small>
                          </div>
                          <div
                            class="is-flex 
                            is-align-self-flex-end
                            is-flex-grow-1
                            is-flex-direction-column"
                          >
                            <div
                              class="button is-white
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
                            <div
                              class="button is-white
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
            this._addProc();
          }}"
        ></btn-fab>
      </section>
    `;
  }
}
