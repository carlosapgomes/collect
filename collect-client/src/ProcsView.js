import {html, LitElement} from 'lit-element';
import './btn-fab.js';

export class ProcsView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      procedures: {type: Array},
      date: {type: String},
    };
  }

  constructor() {
    super();
    this.procedures = [];
    this.date = '';
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-procedures-list',
        {bubbles: true, composed: true}),
    );
    this.dispatchEvent(new CustomEvent('update-doctors-list',
      {bubbles: true, composed: true}));
    this.dispatchEvent(
      new CustomEvent('update-procedures-types-list',
        {bubbles: true, composed: true}),
    );
  }

  _edit(p) {
    this.dispatchEvent(
      new CustomEvent('edit-procedure',
        {detail: p, bubbles: true, composed: true}),
    );
  }

  _addProc() {
    this.dispatchEvent(new CustomEvent('add-procedure',
      {bubbles: true, composed: true}));
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
        }),
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
            ${this.procedures
        ? this.procedures.map(
          p => html`
                    <div class="card proc-card">
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
                          ${p.patientName}<br />
                          ${p.doctorName}
                        </div>
                      </div>
                    </div>
                  `,
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

