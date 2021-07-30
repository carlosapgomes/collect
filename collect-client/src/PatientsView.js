import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { DateTime } from 'luxon';
import './btn-fab.js';
import './page-nav.js';
import './icons/icon-edit.js';
import './icons/icon-trash.js';

export class PatientsView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      patientsres: {type: Object},
      _patients: { type: Array, state: true},
      _total: {type: Number, state: true},
      _limit: {type: Number, state: true},
      _skip: {type: Number, state: true},
    };
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-patients-list', {
        detail:{
          skip: 0,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.addEventListener('paginate',this._paginate);
  }

  updated(changedProperties) {
    if (changedProperties.has('patientsres')) {
      // eslint-disable-next-line no-console
      // console.log(JSON.stringify(this.patientsres, null, 2));
      this._patients = [...this.patientsres.data];
      this._total = this.patientsres.total;
      this._limit = this.patientsres.limit;
      this._skip = this.patientsres.skip;
    }
  }

  _paginate(e){
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('update-patients-list', {
        detail:{
          skip: e.detail.skip,
        },
        bubbles: true,
        composed: true,
      })
    );  }

  _edit(p) {
    // eslint-disable-next-line no-console
    // console.log(p);
    this.dispatchEvent(
      new CustomEvent('edit-patient', {
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
      new CustomEvent('remove-patient', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
  }

  _addPatient() {
    this.dispatchEvent(
      new CustomEvent('add-patient', { bubbles: true, composed: true })
    );
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
        <section id="patients" class="section">
          <div class="column is-6 is-offset-3">
            <h1 class="subtitle has-text-centered is-3">Pacientes</h1>
            <div class="container 
              is-flex
              ${classMap({
              'is-flex-direction-column-reverse': ( window.screen.width < 769 ),
              'is-flex-direction-column': ( window.screen.width >= 769 ),
              })}">
              <div>
                <br />
                ${this._patients
                  ? this._patients.map(
                    p => html`
                      <div class="card proc-card">
                        <div class="card-content">
                          <div class="content is-flex is-flex-direction-row">
                            <div class="is-align-self-flex-start is-flex-grow-4">
                              <strong>${p.name}</strong> - DN:
                              ${DateTime.fromSQL(p.dateOfBirth, {
                                locale: 'pt-BR',
                              }).toLocaleString(DateTime.SHORT)}
                              - Registro: ${p.recNumber}
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
              </div>
              <page-nav
                .total=${this._total}
                .limit=${this._limit}
                .skip=${this._skip}>
              </page-nav>
            </div>
          </div>
          <br />
          <br />
          <btn-fab
            @click="${() => {
            this._addPatient();
            }}"
          ></btn-fab>
          <br />
        </section>
    `;
  }
}
