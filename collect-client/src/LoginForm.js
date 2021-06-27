import { html, LitElement } from 'lit-element';

export class LoginForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      _username: { type: String },
      _password: { type: String },
    };
  }

  constructor() {
    super();
    this._username = '';
    this._password = '';
  }

  _login(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('loginform').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // @ts-ignore
    this._username = document.getElementById('username').value;
    // @ts-ignore
    this._password = document.getElementById('password').value;

    const data = {
      username: this._username,
      password: this._password,
    };

    // fire event to save/update procedure
    this.dispatchEvent(
      new CustomEvent('login', {
        detail: data,
        bubbles: true,
        composed: true,
      })
    );
    // clear and close form
    this._clearFields();
  }

  _clearFields() {
    this._username = '';
    this._password = '';
    // @ts-ignore
    document.getElementById('loginform').reset();
  }

  render() {
    return html`
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <h1 class="title">Faça o login:</h1>
          <br />
          <br />
          <form id="loginform">
            <div class="field">
              <label class="label has-text-left" for="email">Username:</label>
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  id="username"
                  type="text"
                  placeholder="username"
                  .value="${this._username}"
                  required
                />
                <span class="icon is-small is-left">
                  <svg
                    id="i-user"
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
                      d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z"
                    />
                  </svg>
                </span>
                <span class="icon is-small is-right">
                  <svg
                    id="i-checkmark"
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
                    <path d="M2 20 L12 28 30 4" />
                  </svg>
                </span>
              </p>
            </div>
            <div class="field">
              <label class="label has-text-left" for="password">Senha:</label>
              <p class="control has-icons-left">
                <input
                  class="input"
                  id="password"
                  type="password"
                  placeholder="xxxxxxxx"
                  .value="${this._password}"
                  required
                />
                <span class="icon is-small is-left">
                  <svg
                    class="i-lock"
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
                      d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"
                    />
                    <circle cx="16" cy="24" r="1" />
                  </svg>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  id="loginactionbtn"
                  class="button is-success has-text-black"
                  @click="${this._login}"
                >
                  Login
                </button>
                <button
                  id="clearbtn"
                  class="button is-info is-light has-text-black"
                  @click="${this._clearFields}"
                >
                  Limpar
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
