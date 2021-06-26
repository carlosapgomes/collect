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
                        <div class="content">
                          <strong>${d.name}</strong><br />
                          <div
                            class="button is-white is-pulled-right"
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
                          ${d.crm}
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
            this._addDoctor();
          }}"
        ></btn-fab>
      </section>
    `;
  }
}
