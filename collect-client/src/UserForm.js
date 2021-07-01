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
      activate: { type: Boolean, state: true },
      _name: { type: String, state: true },
      _email: { type: String, state: true },
      _phone: { type: String, state: true },
      _username: { type: String, state: true },
      _password: { type: String, state: true },
      _isEnabled: { type: Boolean, state: true },
      _isAdmin: { type: Boolean, state: true },
      _changePassword: { type: Boolean, state: true },
      _isDoctor: { type: Boolean, state: true },
      _docLicenceNumber: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.user = {};
    this.activate = false;
    this._name = '';
    this._email = '';
    this._phone = '';
    this._username = '';
    this._password = '';
    this._isEnabled = false;
    this._isAdmin = false;
    this._changePassword = false;
    this._isDoctor = false;
    this._docLicenceNumber = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('user')) {
      if (this.user) {
        this._name = this.user.name ? this.user.name : '';
        this._email = this.user.email ? this.user.email : '';
        this._phone = this.user.phoneNumber ? this.user.phoneNumber : '';
        this._username = this.user.username ? this.user.username : '';
        this._changePassword = this.user._changePassword
          ? this.user._changePassword
          : false;
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
    this._username = '';
    this._password = '';
    this._isEnabled = false;
    this._isAdmin = false;
    this._changePassword = false;
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
    this._name = document.getElementById('name').value;
    // @ts-ignore
    this._email = document.getElementById('user-email-address').value;
    // @ts-ignore
    this._phone = document.getElementById('user-phone').value;
    // @ts-ignore
    // @ts-ignore
    this._username = document.getElementById('username').value;
    this._isEnabled = document.getElementById('user-is-enabled').checked;
    // @ts-ignore
    this._isAdmin = document.getElementById('user-is-admin').checked;
    // @ts-ignore
    this._isDoctor = document.getElementById('user-is-doctor').checked;
    // @ts-ignore
    this._docLicenceNumber =
      document.getElementById('doc-licence-number').value;
    // @ts-ignore
    this._changePassword = document.getElementById('change-password'.checked);

    const u = {
      name: this._name,
      email: this._email,
      phoneNumber: this._phone,
      username: this._username,
      password: this._password,
      isEnabled: this._isEnabled,
      isAdmin: this._isAdmin,
      changePassword: this._changePassword,
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
                  id="name"
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
              <div class="field">
                <input
                  class="input"
                  id="username"
                  type="text"
                  placeholder="Username"
                  .value="${this._username}"
                  required
                />
              </div>
              <div class="field">
                <input
                  class="input"
                  id="password"
                  type="password"
                  placeholder="Senha"
                  .value="${this._password}"
                />
              </div>
              <div
                class="is-flex 
                is-flex-direction-row 
                is-justify-content-space-evenly"
              >
                <label class="checkbox">
                  <input
                    id="change-password"
                    type="checkbox"
                    ?checked="${this._changePassword}"
                  />
                  Forçar atualização da senha</label
                >
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
              </div>
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
