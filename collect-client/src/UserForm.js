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
      _profBoardName: { type: String, state: true },
      _licenceNumber: { type: String, state: true },
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
    this._profBoardName = '';
    this._licenceNumber = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('user')) {
      if (this.user) {
        this._name = this.user.name ? this.user.name : '';
        this._email = this.user.email ? this.user.email : '';
        this._phone = this.user.phone ? this.user.phone : '';
        this._username = this.user.username ? this.user.username : '';
        this._changePassword = this.user.changePassword
          ? this.user.changePassword
          : false;
        this._isEnabled = this.user.isEnabled ? this.user.isEnabled : false;
        this._isAdmin = this.user.isAdmin ? this.user.isAdmin : false;
        this._profBoardName = this.user.profBoardName 
          ? this.user.profBoardName : '';
        this._licenceNumber = this.user.licenceNumber
          ? this.user.licenceNumber
          : '';
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
    this._profBoardName = '';
    this._licenceNumber = '';
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('user-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    const u = {
      name: this._name,
      email: this._email,
      phone: this._phone,
      username: this._username,
      password: this._password,
      isEnabled: this._isEnabled,
      isAdmin: this._isAdmin,
      changePassword: this._changePassword,
      profBoardName: this._profBoardName,
      licenceNumber: this._licenceNumber,
    };
    if (this.user.id) {
      u.id = this.user.id;
    }

    if (u.password === '' && typeof u.id === 'undefined') {
      // we need a temporary password to create a new user
      u.password = '1234abcd.';
    }
    if (u.password === '' && typeof u.id !== 'undefined') {
      // we are updating user data but not its pw
      delete u.password;
    }

    // remove non required and empty fields
    if (u.phone === '') {
      delete u.phone;
    }

    if (this._email === '') {
      delete u.email;
    }
    if (this._licenceNumber === '') {
      delete u.licenceNumber;
    }
    if (this._profBoardName === '') {
      delete u.profBoardName;
    }

    // eslint-disable-next-line no-console
    console.log(u);
    // fire event to save/update user
    this.dispatchEvent(
      new CustomEvent('save-user-form', {
        detail: { ...u },
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
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Nome</label>
                </div>
                <div class="field-body">
                  <div class="field">
                  <p class="control">
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
                  </p>
                </div></div></div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Email</label>
                </div>
                <div class="field-body"><div class="field">
                  <input
                    class="input"
                    id="user-email-address"
                    type="email"
                    placeholder="Email"
                    .value="${this._email}"
                    @input="${e => {
                    this._email = e.target.value;
                    }}"
                  />
                </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Tel.</label>
                </div>
                <div class="field-body"><div class="field">
                  <input
                    class="input"
                    id="user-phone"
                    type="text"
                    placeholder="Telefone"
                    .value="${this._phone}"
                    @input="${e => {
                    this._phone = e.target.value;
                    }}"
                  />
                </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Username</label>
                </div>
                <div class="field-body">              
                  <div class="field">
                    <input
                      class="input"
                      id="login-username"
                      type="text"
                      placeholder="Username"
                      @input="${e => {
                      this._username = e.target.value;
                      }}"
                      .value="${this._username}"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Senha</label>
                </div>
                <div class="field-body">    
                  <div class="field">
                    <input
                      class="input"
                      id="login-password"
                      type="password"
                      placeholder="Senha"
                      .value="${this._password}"
                      @input="${e => {
                      this._password = e.target.value;
                      }}"
                    />
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Conselho</label>
                </div>
                <div class="field-body">    
                  <div class="field">
                    <input
                      class="input"
                      id="prof-board"
                      type="text"
                      placeholder="Crm/Coren/Crefito"
                      .value="${this._profBoardName}"
                      @input="${e => {
                      this._profBoardName = e.target.value;
                      }}"
                    />
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">No. Conselho</label>
                </div>
                <div class="field-body">    
                  <div class="field">
                    <input
                      class="input"
                      id="licence-number"
                      type="text"
                      placeholder="no. do Crm/Coren/Crefito"
                      .value="${this._licenceNumber}"
                      @input="${e => {
                      this._licenceNumber = e.target.value;
                      }}"
                    />
                  </div>
                </div>
              </div>
              <div
                class="is-flex 
                is-flex-direction-row 
                is-justify-content-space-evenly"
              >
                <label class="checkbox">
                  <input
                    id="force-pw-change"
                    type="checkbox"
                    ?checked="${this._changePassword}"
                    @input="${e => {
                    this._changePassword = e.target.checked;
                    }}"
                  />
                  Atualizar senha</label
                  >
                <label class="checkbox">
                  <input
                    id="user-is-enabled"
                    type="checkbox"
                    ?checked="${this._isEnabled}"
                    @input="${e => {
                    this._isEnabled = e.target.checked;
                    }}"
                  />
                  Habilitado</label
                  >
                <label class="checkbox">
                  <input
                    id="user-is-admin"
                    type="checkbox"
                    ?checked="${this._isAdmin}"
                    @input="${e => {
                    this._isAdmin = e.target.checked;
                    }}"
                  />
                  Admin</label
                  >
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
