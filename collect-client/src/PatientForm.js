import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { DateTime } from 'luxon';

export class PatientForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      patient: { type: Object },
      activate: { type: Boolean, state: true },
      _name: { type: String, state: true },
      _gender: { type: String, state: true },
      _dateOfBirth: { type: Date, state: true },
      _recNumber: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.patient = {};
    this.activate = false;
    this._name = '';
    this._gender = '';
    this._dateOfBirth = DateTime.local().toISODate();
    this._recNumber = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('patient')) {
      if (this.patient) {
        this._name = this.patient.name ? this.patient.name : '';
        this._gender = this.patient.gender ? this.patient.gender : '';
        this._recNumber = this.patient.recNumber ? this.patient.recNumber : '';
        this._dateOfBirth = this.patient.dateOfBirth
          ? DateTime.fromSQL(this.patient.dateOfBirth).toISODate()
          : DateTime.local().toISODate();
      }
    }
  }

  _closeForm() {
    // clear form
    this._clearFields();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('close-patient-form', { bubbles: true, composed: true })
    );
  }

  _clearFields() {
    this.patient = {};
    // @ts-ignore
    document.getElementById('patient-form').reset();
    this._name = '';
    this._gender = '';
    this._dateOfBirth = DateTime.local().toISODate();
    this._recNumber = '';
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('patient-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // eslint-disable-next-line no-console
    console.log(this._dateOfBirth);
    const p = {
      name: this._name,
      gender: this._gender,
      dateOfBirth: DateTime.fromISO(this._dateOfBirth).toISO(),
      recNumber: this._recNumber,
    };
    // eslint-disable-next-line no-console
    console.log(`Saving patient: ${JSON.stringify(p, null, 2)}`);
    if (this.patient && this.patient.id) {
      p.id = this.patient.id;
    }

    // eslint-disable-next-line no-console
    console.log(p);
    // fire event to save/update.patient
    this.dispatchEvent(
      new CustomEvent('save-patient-form', {
        detail: { ...p },
        bubbles: true,
        composed: true,
      })
    );
    // clear and close form
    this._closeForm();
  }

  render() {
    return html`
      <div class="modal ${classMap({ 'is-active': this.activate })}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Paciente</p>
            <button
              class="delete"
              aria-label="close"
              @click="${this._closeForm}"
            ></button>
          </header>
          <section class="modal-card-body">
            <form id="patient-form">
              <div class="field">
                <label class="label">Nome:</label>
                <input
                  class="input"
                  id="name"
                  type="text"
                  placeholder="Nome"
                  .value="${this._name}"
                  @input="${e => {
                    this._name = e.target.value;
                  }}"
                  required
                />
              </div>
              <label class="label">Sexo:</label>
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="gender"
                    ?checked="${this._gender === 'M'}"
                    @input="${() => {
                      this._gender = 'M';
                    }}"
                  />
                  M
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    name="gender"
                    ?checked="${this._gender === 'F'}"
                    @input="${() => {
                      this._gender = 'F';
                    }}"
                  />
                  F
                </label>
              </div>
              <div class="field">
                <label class="label">DN:</label>
                <input
                  class="input"
                  id="date-of-birth"
                  type="date"
                  .value="${this._dateOfBirth}"
                  @input="${e => {
                    this._dateOfBirth = e.target.value;
                  }}"
                />
              </div>
              <div class="field">
                <label class="label">Registro:</label>
                <input
                  class="input"
                  id="record-number"
                  type="text"
                  placeholder="Registro"
                  .value="${this._recNumber}"
                  @input="${e => {
                    this._recNumber = e.target.value;
                  }}"
                />
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="${this._saveForm}">
              Gravar
            </button>
            <button class="button" @click="${this._closeForm}">Cancelar</button>
          </footer>
        </div>
      </div>
    `;
  }
}
