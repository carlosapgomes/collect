import { html, LitElement } from 'lit-element';
import './btn-fab.js';

export class UsersView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      users: { type: Array },
    };
  }

  constructor() {
    super();
    /** @type {object[]} */
    this.users = [];
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-users-list', { bubbles: true, composed: true })
    );
  }

  _edit(u) {
    // eslint-disable-next-line no-console
    // console.log(u);
    this.dispatchEvent(
      new CustomEvent('edit-user', { detail: u, bubbles: true, composed: true })
    );
  }

  _addUser() {
    this.dispatchEvent(
      new CustomEvent('add-user', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <style>
        .user-card {
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
            <h1 class="subtitle has-text-centered is-3">Usuários</h1>
            <br />
            ${this.users
              ? this.users.map(
                  u => html`
                    <div class="card user-card">
                      <div class="card-content">
                        <div class="content">
                          <strong>${u.displayName}</strong><br />
                          <div
                            class="button is-white is-pulled-right"
                            @click="${() => {
                              this._edit(u);
                            }}"
                            @keydown="${() => {
                              this._edit(u);
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
                          ${u.email}
                          <br />
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              ?checked="${u.isEnabled}"
                              disabled
                            />
                            Habilitado
                          </label>
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              ?checked="${u.isAdmin}"
                              disabled
                            />
                            Admin
                          </label>
                        </div>
                      </div>
                    </div>
                  `
                )
              : html`</p>`}
          </div>
        </div>
        <btn-fab
          @click="${() => {
            this._addUser();
          }}"
        ></btn-fab>
      </section>
    `;
  }
}
