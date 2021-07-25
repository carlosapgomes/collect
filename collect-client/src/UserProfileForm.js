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
        this._profBoardName = this.user.profBoardName
          ? this.user.profBoardName
          : '';
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
      profBoardName: this._profBoardName,
      licenceNumber: this._licenceNumber,
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

    if (this._profBoardName === '') {
      delete u.profBoardName;
    }

    if (this._licenceNumber === '') {
      delete u.licenceNumber;
    }

    // eslint-disable-next-line no-console
    // console.log(u);
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
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="lable">Nome</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <input
                    class="input is-static"
                    type="text"
                    .value="${this.user.name}"
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
                    class="input is-static"
                    type="text"
                    .value="${this.user.username}"
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
                    class="input is-static"
                    type="text"
                    .value="${this.user.profBoardName}"
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
                    class="input is-static"
                    type="text"
                    .value="${this.user.licenceNumber}"
                  />
                </div>
              </div>
            </div>
            <form id="user-profile-form">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="lable">Email</label>
                </div>
                <div class="field-body">
                  <div class="field">
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
                <div class="field-body">
                  <div class="field">
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
