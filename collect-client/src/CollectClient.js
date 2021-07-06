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
      _showUserProfileForm: { type: Boolean, state: true },
      _showProcTypeForm: { type: Boolean, state: true },
      _showDoctorForm: { type: Boolean, state: true },
      _toggleConfirmationModal: { type: Boolean, state: true },
      _confirmationModalMsg: { type: String, state: true },
      _confirmModalObject: { type: Object, state: true },
      _confirmModalFunction: { type: Function },
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
    this._showUserProfileForm = false;
    this._showProcTypeForm = false;
    this._showDoctorForm = false;
    this._toggleConfirmationModal = false;
    this._confirmationModalMsg = '';
    this._confirmModalObject = {};
    this._confirmModalFunction = () => {};
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
    // const proceduressvc = this.client.service('procedures');
    // proceduressvc.find().then(res => {
    // if (typeof res.data !== 'undefined') {
    // this.procedureslist = [...res.data];
    // }
    // });

    // add event listeners
    this.addEventListener('login', this._handleLoginEvent);

    // Users
    this.addEventListener('update-users-list', this._updateUsersList);
    this.addEventListener('edit-user', this._editUser);
    this.addEventListener('save-user-profile', this._saveUserProfile);
    this.addEventListener('add-user', this._loadShowUserForm);
    this.addEventListener('save-user-form', this._saveUser);
    this.addEventListener('close-user-form', () => {
      this._currentEditUser = {};
      this._showUserForm = false;
    });
    this.addEventListener('close-user-profile-form', () => {
      this._currentEditUser = {};
      this._showUserProfileForm = false;
    });

    // doctors
    this.addEventListener('update-doctors-list', this._updateDoctorsList);
    this.addEventListener('remove-doctor', this._removeDoctor);
    this.addEventListener('edit-doctor', this._editDoctor);
    this.addEventListener('add-doctor', this._loadShowDoctorForm);
    this.addEventListener('save-doctor-form', this._saveDoctor);
    this.addEventListener('close-doctor-form', () => {
      this._currentEditDoctor = null;
      this._showDoctorForm = false;
    });

    // patients
    this.addEventListener('update-patients-list', this._updatePatientsList);
    this.addEventListener('remove-patient', this._removePatient);
    this.addEventListener('edit-patient', this._editPatient);
    this.addEventListener('add-patient', this._loadShowPatientForm);
    this.addEventListener('save-patient-form', this._savePatient);
    this.addEventListener('close-patient-form', () => {
      this._currentEditPatient = null;
      this._showPatientForm = false;
    });

    // procedures types
    this.addEventListener(
      'update-procedures-types-list',
      this._updateProcTypesList
    );
    this.addEventListener('edit-procedure-type', this._editProcType);
    this.addEventListener('remove-procedure-type', this._removeProcType);
    this.addEventListener('add-procedure-type', this._loadShowProcTypeForm);
    this.addEventListener('save-procedure-type-form', this._saveProcType);
    this.addEventListener('close-procedure-type-form', () => {
      this._currentEditProcType = null;
      this._showProcTypeForm = false;
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
        this._logoutClicked();
      }
      this._spinnerHidden = true;
      this._isAdmin = this._user.isAdmin === 1;
      this._loggedIn = true;
      window.history.pushState({}, '', '/home');
      this._locationChanged(window.location);
      if (this._user.changePassword) {
        this._confirmModalObject = {};
        this._confirmModalFunction = this._editCurrentUser;
        this._toggleConfirmationModal = true;
        this._confirmationModalMsg = 'Quer atualizar sua senha agora?';
      }
    } catch (err) {
      this._spinnerHidden = true;
      // eslint-disable-next-line no-console
      console.log(err.message);
      this._modalMsg = `Ocorreu um erro: ${err.message}`;
      this._toggleModal = true;
    }
  }

  _editCurrentUser() {
    this._currentEditUser = { ...this._user };
    this._loadEditUserProfile();
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

  _navBarBurgerClicked() {
    this._burgerActive = !this._burgerActive;
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

  _loadEditUserProfile() {
    // dynamically load user-form if neccessary
    if (typeof customElements.get('user-profile-form') === 'undefined') {
      import('./uprofile-form.js').then(() => {
        this._showUserProfileForm = true;
      });
    } else {
      this._showUserProfileForm = true;
    }
  }

  async _saveUserProfile(e) {
    this._spinnerHidden = false;
    const u = { ...e.detail };
    if (u.id) {
      try {
        // eslint-disable-next-line no-console
        console.log('updating user');
        const res = await this.client.service('users').patch(u.id, { ...u });
        this._spinnerHidden = true;
        this._modalMsg = 'Perfil atualizado com sucesso!';
        this._toggleModal = true;
        // eslint-disable-next-line no-console
        console.log(`User updated: ${JSON.stringify(res, null, 2)}`);
        this.dispatchEvent(
          new CustomEvent('update-users-list', {
            bubbles: true,
            composed: true,
          })
        );
        // if it is a regular user updating its profile
        // go to homepage
        window.history.pushState({}, '', '/home');
        this._locationChanged(window.location);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`could not update user: ${err}`);
      }
    }
  }

  async _saveUser(e) {
    if (this._isAdmin && this._user.isEnabled) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(e.detail, null, 2));
      this._spinnerHidden = false;
      const u = { ...e.detail };
      if (u.id) {
        try {
          // eslint-disable-next-line no-console
          console.log('updating user');
          const res = await this.client.service('users').patch(u.id, { ...u });
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
          if (u.isDoctor) {
            const d = {
              name: u.name,
              licenceNumber: u.docLicenceNumber,
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
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not create user: ${err}`);
        }
      }
    }
  }

  // Doctors
  _loadShowDoctorForm() {
    // dynamically load doctor-form if neccessary
    if (typeof customElements.get('doctor-form') === 'undefined') {
      import('./doctor-form.js').then(() => {
        this._showDoctorForm = true;
      });
    } else {
      this._showDoctorForm = true;
    }
  }

  async _updateDoctorsList() {
    if (this._isAdmin && this._user.isEnabled) {
      // clear doctors list
      this._doctors = [];
      // eslint-disable-next-line no-console
      console.log('updating doctors list ...');
      this._spinnerHidden = false;
      try {
        const doctorsList = await this.client.service('doctors').find({
          query: {
            $sort: {
              name: 1,
            },
          },
        });
        // eslint-disable-next-line no-console
        console.log(doctorsList.data);
        if (doctorsList.data.length > 0) {
          this._doctors = [...doctorsList.data];
        }
        this._spinnerHidden = true;
      } catch (e) {
        this._spinnerHidden = true;
        this._modalMsg = 'Erro ao buscar lista de médicos';
        this._toggleModal = true;
      }
    }
  }

  _editDoctor(e) {
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(e.detail, null, 2));
    this._currentEditDoctor = { ...e.detail };
    // eslint-disable-next-line no-console
    // console.log(this._currentEditDoctor);
    this._loadShowDoctorForm();
  }

  _removeDoctor(e) {
    // eslint-disable-next-line no-console
    console.log(`entering removeDoctor for ${e.detail}`);

    this._confirmModalObject = { ...e.detail };
    this._confirmModalFunction = this._removeCurrentDoctor;
    this._confirmationModalMsg = `Confirma a remoção do médico: ${e.detail.nome}`;
    this._toggleConfirmationModal = true;
  }

  async _removeCurrentDoctor(d) {
    if (this._isAdmin && this._user.isEnabled) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(d.detail, null, 2));
      this.dispatchEvent(new CustomEvent('show-spinner'));
      if (d.id) {
        // it is an update
        try {
          // eslint-disable-next-line no-console
          console.log('removing doctor type');
          const res = await this.client.service('doctors').remove(d.id);
          this._spinnerHidden = true;
          this._modalMsg = 'Médico removido com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(
            `Procedure type removed: ${JSON.stringify(res, null, 2)}`
          );
          this.dispatchEvent(
            new CustomEvent('update-doctors-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not remove doctor: ${err}`);
        }
      } else {
        this._spinnerHidden = true;
        this._modalMsg = 'Erro ao remover médico';
        this._toggleModal = true;
        this.dispatchEvent(
          new CustomEvent('update-doctors-list', {
            bubbles: true,
            composed: true,
          })
        );
        // eslint-disable-next-line no-console
        console.log(`could not remove doctor: missing id`);
      }
    }
  }

  async _saveDoctor(e) {
    if (this._isAdmin && this._user.isEnabled) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(e.detail, null, 2));
      this._spinnerHidden = false;
      const d = { ...e.detail };
      if (d.id) {
        try {
          // eslint-disable-next-line no-console
          console.log('updating doctor');
          const res = await this.client
            .service('doctors')
            .patch(d.id, { ...d });
          this._spinnerHidden = true;
          this._modalMsg = 'Médico gravado com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(`Doctor updated: ${JSON.stringify(res, null, 2)}`);
          this.dispatchEvent(
            new CustomEvent('update-doctors-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not update doctor: ${err}`);
        }
      } else {
        try {
          // eslint-disable-next-line no-console
          console.log('creating doctor');
          const res = await this.client.service('doctors').create({ ...d });
          this._spinnerHidden = true;
          this._modalMsg = 'Médico gravado com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res, null, 2));
          this.dispatchEvent(
            new CustomEvent('update-doctors-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not create doctor: ${err}`);
        }
      }
    }
  }

  // Procedures Types
  _loadShowProcTypeForm() {
    // dynamically load procedure-type-form if neccessary
    if (typeof customElements.get('proctype-form') === 'undefined') {
      import('./proctype-form.js').then(() => {
        this._showProcTypeForm = true;
      });
    } else {
      this._showProcTypeForm = true;
    }
  }

  async _updateProcTypesList() {
    if (this._user.isEnabled) {
      // clear users list
      this._proceduresTypes = [];
      // eslint-disable-next-line no-console
      console.log('updating procedures types list ...');
      this._spinnerHidden = false;
      try {
        const procTypesList = await this.client.service('proctypes').find({
          query: {
            $sort: {
              descr: 1,
            },
          },
        });
        // eslint-disable-next-line no-console
        console.log(procTypesList.data);
        if (procTypesList.data.length > 0) {
          this._proceduresTypes = [...procTypesList.data];
        }
        this._spinnerHidden = true;
      } catch (e) {
        this._spinnerHidden = true;
        this._modalMsg = 'Erro ao buscar lista de tipos de procedimentos';
        this._toggleModal = true;
      }
    }
  }

  _editProcType(e) {
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(e.detail, null, 2));
    this._currentEditProcType = { ...e.detail };
    // eslint-disable-next-line no-console
    // console.log(this._currentEditProcType);
    this._loadShowProcTypeForm();
  }

  _removeProcType(e) {
    // eslint-disable-next-line no-console
    console.log(`entering removeProcType for ${e.detail}`);

    this._confirmModalObject = { ...e.detail };
    this._confirmModalFunction = this._removeCurrentProctype;
    this._confirmationModalMsg = `Confirma a remoção do tipo de procedimento: ${e.detail.descr}`;
    this._toggleConfirmationModal = true;
  }

  _confirmModalAction() {
    this._confirmModalFunction(this._confirmModalObject);
  }

  async _removeCurrentProctype(p) {
    if (this._isAdmin && this._user.isEnabled) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(p.detail, null, 2));
      this.dispatchEvent(new CustomEvent('show-spinner'));
      if (p.id) {
        // it is an update
        try {
          // eslint-disable-next-line no-console
          console.log('removing procedure type');
          const res = await this.client.service('proctypes').remove(p.id);
          this._spinnerHidden = true;
          this._modalMsg = 'Tipo de procedimento removido com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(
            `Procedure type removed: ${JSON.stringify(res, null, 2)}`
          );
          this.dispatchEvent(
            new CustomEvent('update-procedures-types-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not remove procedure type: ${err}`);
        }
      } else {
        this._spinnerHidden = true;
        this._modalMsg = 'Erro ao remover o tipo de procedimento';
        this._toggleModal = true;
        this.dispatchEvent(
          new CustomEvent('update-procedures-types-list', {
            bubbles: true,
            composed: true,
          })
        );
        // eslint-disable-next-line no-console
        console.log(`could not remove procedure type: missing id`);
      }
    }
  }

  async _saveProcType(e) {
    if (this._isAdmin && this._user.isEnabled) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(e.detail, null, 2));
      this.dispatchEvent(new CustomEvent('show-spinner'));
      const p = { ...e.detail };
      if (p.id) {
        // it is an update
        try {
          // eslint-disable-next-line no-console
          console.log('updating procedure type');
          const res = await this.client
            .service('proctypes')
            .patch(p.id, { ...p });
          this._spinnerHidden = true;
          this._modalMsg = 'Tipo de procedimento gravado com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(
            `Procedure type updated: ${JSON.stringify(res, null, 2)}`
          );
          this.dispatchEvent(
            new CustomEvent('update-procedures-types-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not update procedure type: ${err}`);
        }
      } else {
        // it is a new procedure type
        try {
          // eslint-disable-next-line no-console
          console.log('creating procedure type');
          const res = await this.client.service('proctypes').create({ ...p });
          this._spinnerHidden = true;
          this._modalMsg = 'Tipo de procedimento gravado com sucesso!';
          this._toggleModal = true;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res, null, 2));
          this.dispatchEvent(
            new CustomEvent('update-procedures-types-list', {
              bubbles: true,
              composed: true,
            })
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`could not create procedure type: ${err}`);
        }
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

      <div
        id="confirmationmodal"
        class="modal ${classMap({
          'is-active': this._toggleConfirmationModal,
        })}"
      >
        <div
          class="modal-background"
          @click="${() => {
            this._toggleConfirmationModal = false;
          }}"
          @keydown="${() => {
            this._toggleConfirmationModal = false;
          }}"
        ></div>
        <div class="modal-card">
          <section class="modal-card-body">
            ${this._confirmationModalMsg}
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-danger"
              @click="${() => {
                this._toggleConfirmationModal = false;
                this._confirmModalAction();
              }}"
            >
              Sim
            </button>
            <button
              class="button is-success"
              @click="${() => {
                this._toggleConfirmationModal = false;
              }}"
            >
              Não
            </button>
          </footer>
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
      <uprofile-form
        class="${classMap({ 'is-hidden': !this._showUserProfileForm })}"
        ?activate="${this._showUserProfileForm}"
        .user="${this._currentEditUser}"
      ></uprofile-form>
      <doctor-form
        class="${classMap({ 'is-hidden': !this._showDoctorForm })}"
        ?activate="${this._showDoctorForm}"
        .doctor="${this._currentEditDoctor}"
      ></doctor-form>
      <proctype-form
        class="${classMap({ 'is-hidden': !this._showProcTypeForm })}"
        ?activate="${this._showProcTypeForm}"
        .proceduretype="${this._currentEditProcType}"
      ></proctype-form>
      <spinner-loader
        class="${classMap({ 'is-hidden': this._spinnerHidden })}"
      ></spinner-loader>
    `;
  }
}
