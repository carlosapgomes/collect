import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import './btn-fab.js';
import './page-nav.js';
import './icons/icon-edit.js';

export class UsersView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      usersres: {type: Object},
      _users: { type: Array, attribute: true },
      _total: {type: Number, state: true},
      _limit: {type: Number, state: true},
      _skip: {type: Number, state: true},
    };
  }

  constructor() {
    super();
    /** @type {object[]} */
    this._users = [];
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-users-list', { 
        detail:{
          skip: 0,
        },
        bubbles: true, 
        composed: true })
    );
    this.addEventListener('paginate',this._paginate);
  }

  updated(changedProperties) {
    if (changedProperties.has('usersres')) {
      // eslint-disable-next-line no-console
      // console.log(JSON.stringify(this.usersres, null, 2));
      this._users = [...this.usersres.data];
      this._total = this.usersres.total;
      this._limit = this.usersres.limit;
      this._skip = this.usersres.skip;
    }
  }

  _paginate(e){
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('update-users-list', {
        detail:{
          skip: e.detail.skip,
        },
        bubbles: true,
        composed: true,
      })
    );  }

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
            <h1 class="subtitle has-text-centered is-3">Usuários</h1>
            <div class="container
              is-flex
              ${classMap({
              'is-flex-direction-column-reverse': ( window.screen.width < 769 ),
              'is-flex-direction-column': ( window.screen.width >= 769 ),
              })}">
              <div>
                <br />
                ${this._users
                  ? this._users.map(
                    u => html`
                      <div class="card user-card">
                        <div class="card-content">
                          <div class="content">
                            <strong>${u.name}</strong> - ${u.email}<br />
                            <div
                              class="button is-white is-pulled-right
                              has-tooltip-arrow
                              has-tooltip-top"
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
              <page-nav
                .total=${this._total}
                .limit=${this._limit}
                .skip=${this._skip}>
              </page-nav>
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
