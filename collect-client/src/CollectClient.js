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
      _page: { type: String },
      _burgerActive: { type: Boolean },
      _user: { type: Object },
      _loggedIn: { type: Boolean },
      _isAdmin: { type: Boolean },
      _toggleModal: { type: Boolean },
      _modalMsg: { type: String },
      _spinnerHidden: { type: Boolean },
      _procedures: { type: Array },
      _showProcedureForm: { type: Boolean },
      _currentProcedure: { type: Object },
      _currentProceduresDate: { type: String },
      _adminDropDownOpen: { type: Boolean },
      _users: { type: Array },
      _showUserForm: { type: Boolean },
      _currentEditUser: { type: Object },
      _toggleResetPwModal: { type: Boolean },
      _doctors: { type: Array },
      _showDoctorForm: { type: Boolean },
      _currentEditDoctor: { type: Object },
      _proceduresTypes: { type: Array },
      _showProcTypeForm: { type: Boolean },
      _currentEditProcType: { type: Object },
    };
  }

  constructor() {
    super();
    this.app = {};
    this.restClient = {};
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
    this._showProcedureForm = false;
    this._currentProcedure = {};
    this._currentProceduresDate = '';
    this._adminDropDownOpen = false;
    this._users = [];
    this._currentEditUser = {};
    this._showUserForm = false;
    this._toggleResetPwModal = false;
    this._doctors = [];
    this._showDoctorForm = false;
    this._currentEditDoctor = {};
    this._proceduresTypes = [];
    this._showProcTypeForm = false;
    this._currentEditProcType = {};
  }

  firstUpdated() {
    installRouter(location => this._locationChanged(location));
    // grab the global feathers object imported on index.html
    this.app = window.feathers();
    this.restClient = window.feathers.rest('http://localhost:3030');
    this.app.configure(this.restClient.superagent(window.superagent));
    const proceduresSvc = this.app.service('procedures');
    proceduresSvc.find().then(res => {
      if (typeof res.data !== 'undefined') {
        this.proceduresList = [...res.data];
      }
    });

    // add event listeners
    // document.getElementById('loginactionbtn').addEventListener('click', e => {
    // e.preventDefault();
    // @ts-ignore
    // if (document.getElementById('loginform').reportValidity()) {
    // this._handleSignIn();
    // }
    // });
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
                  @click="${() => {
                    this._adminDropDownOpen = false;
                    this._burgerActive = false;
                  }}"
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
            'is-hidden': this._page !== 'home',
          })}"
        >
          <div>
            <br />
            <br />
            <br />
            <br />
            <h1 class="title">Cirurgia Vascular: Procedimentos Realizados</h1>
          </div>
        </section>

        <login-form
          id="loginform"
          class="${classMap({
            'is-hidden': this._page !== 'loginform',
          })}"
        ></loginform>

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
            'is-hidden': this._page !== 'usersview',
          })}"
        ></users-view>
        <doctors-view
          id="doctorsview"
          .doctors="${this._doctors}"
          class="${classMap({
            'is-hidden': this._page !== 'doctorsview',
          })}"
        >
        </doctors-view>
        <proctypes-view
          id="procedurestypesview"
          .procedures="${this._proceduresTypes}"
          class="${classMap({
            'is-hidden': this._page !== 'procedurestypesview',
          })}"
        ></proctypes-view>
      </main> 
      <footer
        class="navbar is-fixed-bottom
    is-dark has-text-centered is-vcentered"
      >
        <div class="column">&copy; <small>CG 2021</small></div>
      </footer>    
      `;
  }
}
