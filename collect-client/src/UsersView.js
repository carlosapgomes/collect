import { html, LitElement } from 'lit-element';
import './btn-fab.js';
import './icons/icon-edit.js';

export class UsersView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      users: { type: Array, attribute: true },
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
        <section id="users" class="section">
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
                          <strong>${u.name}</strong> - ${u.email}<br />
                          <div
                            class="button is-white is-pulled-right
                            has-tooltip-arrow
                            has-tooltip-right"
                            data-tooltip="Editar"
                            @click="${() => {
                            this._edit(u);
                            }}"
                            @keydown="${() => {
                            this._edit(u);
                            }}"
                          >
                            <icon-edit></icon-edit>
                          </div>

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
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              ?checked="${u.changePassword}"
                              disabled
                            />
                            Atualizar senha
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
