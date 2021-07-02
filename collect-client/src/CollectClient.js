/* eslint-disable lit-a11y/anchor-is-valid */
import { installRouter } from 'pwa-helpers/router.js';
import { LitElement, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class CollectClient extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      proceduresList: { type: Array },
      _page: { type: String, state: true },
      _burgerActive: { type: Boolean, state: true },
      _user: { type: Object },
      _loggedIn: { type: Boolean, state: true },
      _isAdmin: { type: Boolean, state: true },
      _toggleModal: { type: Boolean, state: true },
      _modalMsg: { type: String, state: true },
      _spinnerHidden: { type: Boolean, state: true },
      _procedures: { type: Array, state: true },
      _currentProcedure: { type: Object, state: true },
      _currentProceduresDate: { type: String, state: true },
      _adminDropDownOpen: { type: Boolean, state: true },
      _users: { type: Array, state: true },
      _currentEditUser: { type: Object, state: true },
      _toggleResetPwModal: { type: Boolean, state: true },
      _doctors: { type: Array, state: true },
      _currentEditDoctor: { type: Object, state: true },
      _proceduresTypes: { type: Array, state: true },
      _currentEditProcType: { type: Object, state: true },
      _showUserForm: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.client = {};
    this.rest = {};
    this.proceduresList = [];
    this._page = 'home';
    this._burgerActive = false;
    this._user = null;
    this._loggedIn = false;
    this._isAdmin = false;
    this._toggleModal = false;
    this._modalMsg = '';
    this._procedures = null;
    this._spinnerHidden = true;
    this._currentProcedure = {};
    this._currentProceduresDate = '';
    this._adminDropDownOpen = false;
    this._users = [];
    this._currentEditUser = {};
    this._toggleResetPwModal = false;
    this._doctors = [];
    this._currentEditDoctor = {};
    this._proceduresTypes = [];
    this._currentEditProcType = {};
    this._showUserForm = false;
  }

  firstUpdated() {
    installRouter(location => this._locationChanged(location));
    // grab the global feathers object imported on index.html
    this.client = window.feathers();
    this.rest = window.feathers.rest('http://localhost:3030');
    this.client.configure(this.rest.superagent(window.superagent));
    this.client.configure(
      window.feathers.authentication({
        storage: window.storage,
      })
    );
    const proceduresSvc = this.client.service('procedures');
    proceduresSvc.find().then(res => {
      if (typeof res.data !== 'undefined') {
        this.proceduresList = [...res.data];
      }
    });

    // add event listeners
    this.addEventListener('login', this._handleLoginEvent);

    // Users
    this.addEventListener('update-users-list', this._updateUsersList);
    this.addEventListener('edit-user', this._editUser);
    this.addEventListener('add-user', this._loadShowUserForm);
    this.addEventListener('save-user-form', this._saveUser);
    this.addEventListener('close-user-form', () => {
      this._currentEditUser = {};
      this._showUserForm = false;
    });

    // add spinner event listeners
    // dynamically load otw-spinner if neccessary
    this.addEventListener('show-spinner', () => {
      if (typeof customElements.get('spinner-loader') === 'undefined') {
        import('./spinner-loader.js').then(() => {
          this._spinnerHidden = false;
        });
      } else {
        this._spinnerHidden = false;
      }
    });
    this.addEventListener('hide-spinner', () => {
      this._spinnerHidden = true;
    });
    // document.getElementById('loginactionbtn').addEventListener('click', e => {
    // e.preventDefault();
    // @ts-ignore
    // if (document.getElementById('loginform').reportValidity()) {
    // this._handleSignIn();
    // }
    // });
  }

  async _handleLoginEvent(e) {
    this.dispatchEvent(new CustomEvent('show-spinner'));
    const data = { ...e.detail };
    try {
      const auth = await this._login(data.username, data.password);
      // eslint-disable-next-line no-console
      console.log(auth);
      this._user = { ...auth.user };
      if (!this._user.isEnabled) {
        // show msg and call logout
        this._modalMsg = 'Este usuário não está autorizado!';
        this._toggleModal = true;
      }
      this._spinnerHidden = true;
      this._isAdmin = this._user.isAdmin === 1;
      this._loggedIn = true;
      window.history.pushState({}, '', '/home');
      this._locationChanged(window.location);
    } catch (err) {
      this._spinnerHidden = true;
      // eslint-disable-next-line no-console
      console.log(err.message);
      this._modalMsg = `Ocorreu um erro: ${err.message}`;
      this._toggleModal = true;
    }
  }

  _login(username, password) {
    return this.client.authenticate({
      strategy: 'local',
      username,
      password,
    });
  }

  async _logoutClicked() {
    try {
      await this.client.logout();
      this._user = null;
      this._loggedIn = false;
      this._isAdmin = false;
      this.requestUpdate();
      window.history.pushState({}, '', '/');
      this._locationChanged(window.location);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  _locationChanged(location) {
    const path = window.decodeURIComponent(location.pathname);
    const page = path === '/' ? 'home' : path.slice(1);
    this._loadPage(page);
  }

  _loadPage(page) {
    let p = page;
    switch (p) {
      case 'loginform':
        if (typeof customElements.get('login-form') === 'undefined') {
          import('./login-form.js').catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
        }
        break;
      case 'procsview':
        if (typeof customElements.get('procs-view') === 'undefined') {
          import('./procs-view.js').catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
        } else {
          this.dispatchEvent(new CustomEvent('update-procedures-list'));
        }
        break;
      case 'usersview':
        if (typeof customElements.get('users-view') === 'undefined') {
          import('./users-view.js').catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
        } else {
          this.dispatchEvent(new CustomEvent('update-users-list'));
        }
        break;
      case 'doctorsview':
        if (typeof customElements.get('doctors-view') === 'undefined') {
          import('./doctors-view.js').catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
        } else {
          this.dispatchEvent(new CustomEvent('update-doctors-list'));
        }
        break;
      case 'procedurestypesview':
        if (typeof customElements.get('proctypes-view') === 'undefined') {
          import('./proctypes-view.js').catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
        } else {
          this.dispatchEvent(new CustomEvent('update-procedures-types-list'));
        }
        break;
      default:
        p = '/';
    }
    this._page = p;
  }

  //
  // Users

  _editUser(e) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(e.detail, null, 2));
    this._currentEditUser = { ...e.detail };
    // eslint-disable-next-line no-console
    // console.log(this._currentEditUser);
    this._loadShowUserForm();
  }

  async _updateUsersList() {
    if (this._isAdmin && this._user.isEnabled) {
      // clear users list
      this._users = [];
      // eslint-disable-next-line no-console
      console.log('updating users list ...');
      this._spinnerHidden = false;
      // this.dispatchEvent(new CustomEvent('show-spinner'));
      try {
        const usersList = await this.client.service('users').find({
          query: {
            $sort: {
              name: 1,
            },
          },
        });
        // eslint-disable-next-line no-console
        console.log(usersList.data);
        if (usersList.data.length > 0) {
          this._users = [...usersList.data];
        }
        this._spinnerHidden = true;
      } catch (e) {
        this._spinnerHidden = true;
        this._modalMsg = 'Erro ao buscar lista de usuários';
        this._toggleModal = true;
      }
    }
  }

  _loadShowUserForm() {
    // dynamically load user-form if neccessary
    if (typeof customElements.get('user-form') === 'undefined') {
      import('./user-form.js').then(() => {
        this._showUserForm = true;
      });
    } else {
      this._showUserForm = true;
    }
  }

  async _saveUser(e) {
    if (this._isAdmin && this._user.isEnabled) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(e.detail, null, 2));
      this.dispatchEvent(new CustomEvent('show-spinner'));
      const u = { ...e.detail };
      if (u.id) {
        try {
          // eslint-disable-next-line no-console
          console.log('updating user');
          const res = await this.client.service('users').update(u.id, { ...u });
          this._spinnerHidden = true;
          this._modalMsg = 'Usuário gravado com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(`User updated: ${JSON.stringify(res, null, 2)}`);
          this.dispatchEvent(
            new CustomEvent('update-users-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not update user: ${err}`);
        }
      } else {
        try {
          // eslint-disable-next-line no-console
          console.log('creating user');
          const res = await this.client.service('users').create({ ...u });
          this._spinnerHidden = true;
          this._modalMsg = 'Usuário gravado com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res, null, 2));
          this.dispatchEvent(
            new CustomEvent('update-users-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not create user: ${err}`);
        }
      }
      if (u.isDoctor) {
        const d = {
          name: u.displayName,
          crm: u.doctorLicenceNumber,
        };
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
      }
    }
  }

  render() {
    return html`
      <nav
        id="navbar"
        class="navbar is-primary is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a
            class="navbar-item has-text-black"
            href="#"
            style="font-weight:bold;"
          >
            Collect
          </a>

          <a
            role="button"
            class="navbar-burger burger ${classMap({
              'is-active': this._burgerActive,
            })}"
            id="navbarburger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicMenu"
            @click="${this._navBarBurgerClicked}"
            @keydown="${this._navBarBurgerClicked}"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicMenu"
          class="navbar-menu ${classMap({ 'is-active': this._burgerActive })}"
        >
          <div
            class="navbar-start ${classMap({ 'is-hidden': !this._loggedIn })}"
          >
            <a
              class="navbar-item"
              href="/procsview"
              @click="${() => {
                this._burgerActive = false;
              }}"
            >
              Procedimentos
            </a>

            <div
              id="adminmenu"
              class="navbar-item has-dropdown ${classMap({
                'is-hidden': !this._isAdmin,
                'is-active': this._adminDropDownOpen,
              })}"
            >
              <a
                class="navbar-link"
                @click="${() => {
                  this._adminDropDownOpen = !this._adminDropDownOpen;
                }}"
                @keydown="${() => {
                  this._adminDropDownOpen = !this._adminDropDownOpen;
                }}"
              >
                Admin
              </a>

              <div class="navbar-dropdown is-boxed">
                <a
                  class="navbar-item"
                  href="/usersview"
                  @click="${() => {
                    this._adminDropDownOpen = false;
                    this._burgerActive = false;
                  }}"
                >
                  Usuários
                </a>
                <a
                  class="navbar-item"
                  href="/doctorsview"
                  @click="${() => {
                    this._adminDropDownOpen = false;
                    this._burgerActive = false;
                  }}"
                >
                  Médicos
                </a>
                <a
                  class="navbar-item"
                  href="/procedurestypesview"
                  @click=${() => {
                    this._adminDropDownOpen = false;
                    this._burgerActive = false;
                  }}
                >
                  Tipos de Procedimentos
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a
                  id="logoutbtn"
                  href="/home"
                  class="button is-light ${classMap({
                    'is-hidden': !this._loggedIn,
                  })}"
                  @click="${this._logoutClicked}"
                >
                  Logout
                </a>
                <a
                  id="loginbtn"
                  href="/loginform"
                  class="button is-light ${classMap({
                    'is-hidden': this._loggedIn,
                  })}"
                  @click=${() => {
                    this._burgerActive = false;
                  }}
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main id="maincontent">
        <section
          id="home"
          class="section container has-text-centered ${classMap({
            'is-hidden': this._page !== '/',
          })}"
        >
          <div>
            <br />
            <br />
            <br />
            <br />
            <h1 class="title">Coleta de Procedimentos</h1>
          </div>
        </section>

        <login-form
          id="loginform"
          class="${classMap({
            'is-hidden': this._page !== 'loginform',
          })}"
        ></login-form>

        <procs-view
          id="procsview"
          class="${classMap({
            'is-hidden': this._page !== 'procsview',
          })}"
          .procedures="${this._procedures}"
          .date="${this._currentProceduresDate}"
        ></procs-view>
        <users-view
          id="usersview"
          .users="${this._users}"
          class="${classMap({
            'is-hidden': this._page !== 'usersview' || !this._isAdmin,
          })}"
        ></users-view>
        <doctors-view
          id="doctorsview"
          .doctors="${this._doctors}"
          class="${classMap({
            'is-hidden': this._page !== 'doctorsview' || !this._isAdmin,
          })}"
        >
        </doctors-view>
        <proctypes-view
          id="procedurestypesview"
          .procedures="${this._proceduresTypes}"
          class="${classMap({
            'is-hidden': this._page !== 'procedurestypesview' || !this._isAdmin,
          })}"
        ></proctypes-view>
      </main>
      <footer
        class="navbar is-fixed-bottom has-background-light
     has-text-centered is-vcentered"
      >
        <div class="column">&copy; <small>CG 2021</small></div>
      </footer>

      <!-- dynamic modal dialog -->
      <div
        id="modalmsg"
        class="modal ${classMap({ 'is-active': this._toggleModal })}"
      >
        <div
          class="modal-background"
          @click="${() => {
            this._toggleModal = false;
          }}"
          @keydown="${() => {
            this._toggleModal = false;
          }}"
        ></div>
        <div class="modal-content">
          <div class="box container has-text-centered">${this._modalMsg}</div>
        </div>
        <button
          class="modal-close is-large"
          @click="${() => {
            this._toggleModal = false;
          }}"
          aria-label="close"
        ></button>
      </div>

      <!-- dynamic elements -->
      <user-form
        class="${classMap({ 'is-hidden': !this._showUserForm })}"
        ?activate="${this._showUserForm}"
        .user="${this._currentEditUser}"
      ></user-form>
      <spinner-loader
        class="${classMap({ 'is-hidden': this._spinnerHidden })}"
      ></spinner-loader>
    `;
  }
}
