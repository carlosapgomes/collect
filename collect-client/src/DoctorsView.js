import { html, LitElement } from 'lit-element';
import './btn-fab.js';

export class DoctorsView extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      doctors: { type: Array },
    };
  }

  constructor() {
    super();
    /** @type {object[]} */
    this.doctors = [];
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-doctors-list', { bubbles: true, composed: true })
    );
  }

  _edit(d) {
    // eslint-disable-next-line no-console
    // console.log(u);
    this.dispatchEvent(
      new CustomEvent('edit-doctor', {
        detail: d,
        bubbles: true,
        composed: true,
      })
    );
  }

  _remove(d) {
    // eslint-disable-next-line no-console
    console.log(d);
    this.dispatchEvent(
      new CustomEvent('remove-doctor', {
        detail: d,
        bubbles: true,
        composed: true,
      })
    );
  }

  _addDoctor() {
    this.dispatchEvent(
      new CustomEvent('add-doctor', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <style>
        .doctor-card {
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
            <h1 class="subtitle has-text-centered is-3">Médicos</h1>
            <br />
            ${this.doctors
              ? this.doctors.map(
                  d => html`
                    <div class="card user-card">
                      <div class="card-content">
                        <div class="content is-flex is-flex-direction-row">
                          <div class="is-align-self-flex-start is-flex-grow-4">
                            <strong>${d.name}</strong><br />
                            ${d.licenceNumber}
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
                                this._edit(d);
                              }}"
                              @keydown="${() => {
                                this._edit(d);
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
                              class="button 
                            is-white
                            is-align-self-flex-end
                            has-tooltip-arrow
                            has-tooltip-right"
                              data-tooltip="Remover"
                              @click="${() => {
                                this._remove(d);
                              }}"
                              @keydown="${() => {
                                this._remove(d);
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
            this._addDoctor();
          }}"
        ></btn-fab>
      </section>
    `;
  }
}
