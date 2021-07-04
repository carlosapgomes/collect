import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class UserProfileForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      user: { type: Object },
      activate: { type: Boolean, state: true },
      _email: { type: String, state: true },
      _phone: { type: String, state: true },
      _password: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.user = {};
    this.activate = false;
    this._email = '';
    this._phone = '';
    this._password = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('user')) {
      if (this.user) {
        this._email = this.user.email ? this.user.email : '';
        this._phone = this.user.phone ? this.user.phone : '';
        this._changePassword = this.user.changePassword
          ? this.user.changePassword
          : false;
      }
    }
  }

  _closeForm() {
    // clear form
    this._clearFields();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('close-user-profile-form', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _clearFields() {
    this.user = {};
    // @ts-ignore
    document.getElementById('user-profile-form').reset();
    this._email = '';
    this._phone = '';
    this._password = '';
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('user-profile-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    const u = {
      id: this.user.id,
      email: this._email,
      phone: this._phone,
      password: this._password,
      changePassword: false,
    };

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

    // eslint-disable-next-line no-console
    console.log(u);
    // fire event to save/update user
    this.dispatchEvent(
      new CustomEvent('save-user-profile', {
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
            <p>Nome: ${this.user.name}</p>
            <p>Username: ${this.user.username}</p>
            <form id="user-profile-form">
              <div class="field">
                <label for="user-email-address">Email:</label>
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
              <div class="field">
                <label for="user-phone">Tel.:</label>
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

              <div class="field">
                <label for="login-password">Senha:</label>
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
