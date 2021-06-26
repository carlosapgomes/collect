import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class DoctorForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      doctor: { type: Object },
      activate: { type: Boolean },
      _name: { type: String },
      _crm: { type: String },
    };
  }

  constructor() {
    super();
    this.doctor = {};
    this.activate = false;
    this._name = '';
    this._crm = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('doctor')) {
      if (this.doctor) {
        this._name = this.doctor.name ? this.doctor.name : '';
        this._crm = this.doctor.crm ? this.doctor.crm : '';
      }
    }
  }

  _closeForm() {
    // clear form
    this._clearFields();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('close-doctor-form', { bubbles: true, composed: true })
    );
  }

  _clearFields() {
    this.doctor = {};
    // @ts-ignore
    document.getElementById('doctor-form').reset();
    this._name = '';
    this._crm = '';
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('doctor-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // @ts-ignore
    this._name = document.getElementById('doctor-name').value;
    // @ts-ignore
    this._crm = document.getElementById('crm').value;

    const d = {
      name: this._name,
      crm: this._crm,
    };
    if (this.doctor && this.doctor.key) {
      d.key = this.doctor.key;
    }
    // eslint-disable-next-line no-console
    // console.log(d);
    // fire event to save/update doctor
    this.dispatchEvent(
      new CustomEvent('save-doctor-form', {
        detail: d,
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
            <p class="modal-card-title">Usuário</p>
            <button
              class="delete"
              aria-label="close"
              @click="${this._closeForm}"
            ></button>
          </header>
          <section class="modal-card-body">
            <form id="doctor-form">
              <div class="field">
                <input
                  class="input"
                  id="doctor-name"
                  type="text"
                  placeholder="Nome"
                  .value="${this._name}"
                  required
                />
              </div>
              <div class="field">
                <input
                  class="input"
                  id="crm"
                  type="text"
                  placeholder="CRM"
                  .value="${this._crm}"
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
