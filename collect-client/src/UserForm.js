import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class UserForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      user: { type: Object },
      activate: { type: Boolean },
      _name: { type: String },
      _email: { type: String },
      _phone: { type: String },
      _isEnabled: { type: Boolean },
      _isAdmin: { type: Boolean },
      _isDoctor: { type: Boolean },
      _docLicenceNumber: { type: String },
    };
  }

  constructor() {
    super();
    this.user = {};
    this.activate = false;
    this._name = '';
    this._email = '';
    this._phone = '';
    this._isEnabled = false;
    this._isAdmin = false;
    this._isDoctor = false;
    this._docLicenceNumber = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('user')) {
      if (this.user) {
        this._name = this.user.displayName ? this.user.displayName : '';
        this._email = this.user.email ? this.user.email : '';
        this._phone = this.user.phoneNumber ? this.user.phoneNumber : '';
        this._isEnabled = this.user.isEnabled ? this.user.isEnabled : false;
        this._isAdmin = this.user.isAdmin ? this.user.isAdmin : false;
        this._isDoctor = this.user._isDoctor ? this.user._isDoctor : false;
        this._docLicenceNumber =
          this.user._docLicenceNumber !== '' ? this.user._docLicenceNumber : '';
      }
    }
  }

  _closeForm() {
    // clear form
    this._clearFields();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('close-user-form', { bubbles: true, composed: true })
    );
  }

  _clearFields() {
    this.user = {};
    // @ts-ignore
    document.getElementById('user-form').reset();
    this._name = '';
    this._email = '';
    this._phone = '';
    this._isEnabled = false;
    this._isAdmin = false;
    this._isDoctor = false;
    this._docLicenceNumber = '';
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('user-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // @ts-ignore
    this._name = document.getElementById('user-name').value;
    // @ts-ignore
    this._email = document.getElementById('user-email-address').value;
    // @ts-ignore
    this._phone = document.getElementById('user-phone').value;
    // @ts-ignore
    this._isEnabled = document.getElementById('user-is-enabled').checked;
    // @ts-ignore
    this._isAdmin = document.getElementById('user-is-admin').checked;
    // @ts-ignore
    this._isDoctor = document.getElementById('user-is-doctor').checked;
    // @ts-ignore
    this._docLicenceNumber = document.getElementById(
      'doc-licence-number'
    ).value;

    const u = {
      displayName: this._name,
      email: this._email,
      phoneNumber: this._phone,
      isEnabled: this._isEnabled,
      isAdmin: this._isAdmin,
      isDoctor: this._isDoctor,
      docLicenceNumber: this._docLicenceNumber,
    };
    if (this.user && this.user.key) {
      u.key = this.user.key;
    }
    // console.log(u);
    // fire event to save/update procedure
    this.dispatchEvent(
      new CustomEvent('save-user-form', {
        detail: u,
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
            <form id="user-form">
              <div class="field">
                <input
                  class="input"
                  id="user-name"
                  type="text"
                  placeholder="Nome"
                  .value="${this._name}"
                  required
                />
              </div>
              <div class="field">
                <input
                  class="input"
                  id="user-email-address"
                  type="email"
                  placeholder="Email"
                  .value="${this._email}"
                  required
                />
              </div>
              <div class="field">
                <input
                  class="input"
                  id="user-phone"
                  type="tel"
                  .value="${this._phone}"
                  placeholder="Telefone"
                />
              </div>
              <label class="checkbox">
                <input
                  id="user-is-enabled"
                  type="checkbox"
                  ?checked="${this._isEnabled}"
                />
                Habilitado</label
              >
              <label class="checkbox">
                <input
                  id="user-is-admin"
                  type="checkbox"
                  ?checked="${this._isAdmin}"
                />
                Admin</label
              >
              <label class="checkbox">
                <input
                  id="user-is-doctor"
                  type="checkbox"
                  @click="${() => {
                    this._isDoctor = !this._isDoctor;
                  }}"
                  ?checked="${this._isDoctor}"
                />
                Médico</label
              >
              <div class="field">
                <input
                  class="input"
                  id="doctor-licence-number"
                  type="text"
                  placeholder="CRM"
                  ?disabled="${!this._isDoctor}"
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
