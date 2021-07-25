import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { DateTime } from 'luxon';
import './icons/icon-search.js';
import './icons/icon-plus.js';

export class ProcForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      procedure: { type: Object },
      _procExecPlace: { type: String, state: true },
      activate: { type: Boolean },
      _currentProcDate: { type: String, state: true },
      _currentProcHour: { type: String, state: true },
      _currentProcMinute: { type: String, state: true },
      patients: { type: Array },
      _currentPatient: { type: Object, state: true },
      _patientName: { type: String, state: true },
      _activatePatientSearchDropDown: { type: Boolean, state: true },
      _ward: { type: String, state: true },
      _bed: { type: String, state: true },
      _team: { type: String, state: true },
      _activateUserSearchDropDown: { type: Boolean, state: true },
      proctypes: { type: Array },
      _currentProcType: { type: Object, state: true },
      _procTypeDescr: { type: String, state: true },
      _activateProcTypeSearchDropDown: { type: Boolean, state: true },
      _showRequiredSurgReport: { type: Boolean, state: true },
      user: { type: Object },
      users: { type: Array },
      _currentUser: { type: Object, state: true },
      _userName: { type: String, state: true },
      _maxUsersCount: { type: Number, state: true },
      _currentProcUsers: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this.procedure = {};
    this._procExecPlace = '';
    this._patientName = '';
    this._currentPatient = {};
    this._activatePatientSearchDropDown = false;
    this._ward = '';
    this._bed = '';
    this._userName = '';
    this.activate = false;
    this.users = [];
    this._team = '';
    this._currentUser = {};
    this._activateUserSearchDropDown = false;
    this.proctypes = [];
    this._procTypeDescr = '';
    this._activateProcTypeSearchDropDown = false;
    this._showRequiredSurgReport = false;
    this._maxUsersCount = 5;
    this._currentProcUsers = [];
  }

  firstUpdated() {
    const d = DateTime.local().toISODate();
    this._currentProcDate = d;
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(d, null, 2));
    this._currentProcHour = '00';
    this._currentProcMinute = '00';
  }

  /**
   * @param {{ has: (arg0: string) => any; }} changedProperties
   */
  updated(changedProperties) {
    if (changedProperties.has('procedure')) {
      // eslint-disable-next-line no-console
      // console.log('entering updated');
      if (this.procedure && this.procedure.procDateTime) {
        // eslint-disable-next-line no-console
        // console.log('procedure changed and is defined');
        // eslint-disable-next-line no-console
        // console.log(JSON.stringify(this.procedure, null, 2));
        const procDateTime = DateTime.fromSQL(this.procedure.procDateTime);
        this._currentProcDate = procDateTime.toISODate();
        // eslint-disable-next-line no-console
        this._currentProcHour = procDateTime.hour.toLocaleString('pt-BR', {
          minimumIntegerDigits: 2,
        });
        this._currentProcMinute = procDateTime.minute.toLocaleString('pt-BR', {
          minimumIntegerDigits: 2,
        });

        this._currentProcType = {
          descr: this.procedure.descr,
          code: this.procedure.code,
        };
        this.proctypes = [{ ...this._currentProcType }];
        this._procTypeDescr = this.procedure.descr;
        // eslint-disable-next-line no-console
        // console.log(`this._procTypeDescr: ${this._procTypeDescr}`);

        this._currentPatient = {
          name: this.procedure.ptName,
          recNumber: this.procedure.ptRecN,
          id: this.procedure.ptID,
          dateOfBirth: this.procedure.ptDateOfBirth,
          gender: this.procedure.ptGender,
        };
        // eslint-disable-next-line no-console
        // console.log(`this._currentPatient:\n
        // ${JSON.stringify(this._currentPatient, null, 2)}`);
        this.patients = [{ ...this._currentPatient }];
        this._patientName = this._currentPatient.name;

        this._currentUser = {
          name: this.procedure.userName,
          id: this.procedure.userID,
          licenceNumber: this.procedure.userLicenceNumber,
        };
        // this._userName = this.procedure.userName;
        this.users = [{ ...this._currentUser }];

        this._currentProcUsers = [];
        this._currentProcUsers.push({
          name: this.procedure.user1Name,
          id: this.procedure.user1ID,
          licenceNumber: this.procedure.user1LicenceNumber,
        });

        if (
          this.procedure.user2Name !== '' &&
          this.procedure.user2ID !== '' &&
          this.procedure.user2LicenceNumber !== ''
        ) {
          this._currentProcUsers.push({
            name: this.procedure.user2Name,
            id: this.procedure.user2ID,
            licenceNumber: this.procedure.user2LicenceNumber,
          });
        }
        if (
          this.procedure.user3Name !== '' &&
          this.procedure.user3ID !== '' &&
          this.procedure.user3LicenceNumber !== ''
        ) {
          this._currentProcUsers.push({
            name: this.procedure.user3Name,
            id: this.procedure.user3ID,
            licenceNumber: this.procedure.user3LicenceNumber,
          });
        }
        if (
          this.procedure.user4Name !== '' &&
          this.procedure.user4ID !== '' &&
          this.procedure.user4LicenceNumber !== ''
        ) {
          this._currentProcUsers.push({
            name: this.procedure.user4Name,
            id: this.procedure.user4ID,
            licenceNumber: this.procedure.user4LicenceNumber,
          });
        }
        if (
          this.procedure.user5Name !== '' &&
          this.procedure.user5ID !== '' &&
          this.procedure.user5LicenceNumber !== ''
        ) {
          this._currentProcUsers.push({
            name: this.procedure.user5Name,
            id: this.procedure.user5ID,
            licenceNumber: this.procedure.user5LicenceNumber,
          });
        }
        if (
          this.procedure.user6Name !== '' &&
          this.procedure.user6ID !== '' &&
          this.procedure.user6LicenceNumber !== ''
        ) {
          this._currentProcUsers.push({
            name: this.procedure.user6Name,
            id: this.procedure.user6ID,
            licenceNumber: this.procedure.user6LicenceNumber,
          });
        }
        this._bed = this.procedure.ptBed;
        this._ward = this.procedure.ptWard;
        this._procExecPlace = this.procedure.execPlace;
        this._team = this.procedure.team;
      }
    }
  }

  _closeForm() {
    // clear form
    this._clearFields();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('close-procedure-form', { bubbles: true, composed: true })
    );
  }

  _clearFields() {
    this.procedure = {};
    this._procExecPlace = '';
    // @ts-ignore
    document.getElementById('procedure-form').reset();
    this._procedureName = '';
    this._procTypeDescr = '';
    this._activateProcTypeSearchDropDown = false;
    this._showRequiredSurgReport = false;
    this._patientName = '';
    this._currentPatient = {};
    this._activatePatientSearchDropDown = false;
    this._ward = '';
    this._bed = '';
    this._team = '';
    this._userName = '';
    this._activateUserSearchDropDown = false;
    this._currentProcUsers = [];
    this._maxUsersCount = 5;
    // try to circunvent a race condition with the above procedure-form reset
    setTimeout(() => {
      this._currentProcDate = DateTime.local().toISODate();
    }, 2000);
  }

  _saveForm(e) {
    e.preventDefault();
    if (document.getElementById('procedure-form').reportValidity()) {
      if (this._currentProcUsers.length > 0) {
        this._handleSaveForm();
      }
      if (this._currentProcUsers.length === 0) {
        this.dispatchEvent(
          new CustomEvent('show-modal-message', {
            detail: { msg: 'Busque e selecione pelo menos um executante' },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }

  _handleSaveForm() {
    // eslint-disable-next-line no-console
    // console.log(
    // `currentProcDate: ${this._currentProcDate}\n
    // currentProcHour: ${this._currentProcHour}\n
    // currentProcMinute: ${this._currentProcMinute}`
    // );

    const dateTime = DateTime.fromISO(
      `${this._currentProcDate}T${this._currentProcHour}:${this._currentProcMinute}:00.000-03:00`
    );
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(dateTime, null, 2));
    // eslint-disable-next-line no-console
    // console.log(`pt dateOfBirth: ${this._currentPatient.dateOfBirth}`);
    const ptDOB = DateTime.fromSQL(this._currentPatient.dateOfBirth);
    // eslint-disable-next-line no-console
    // console.log(`ptDOB: ${ptDOB}`);
    const ageObj = dateTime.diff(ptDOB, 'years').toObject();
    const age = parseInt(ageObj.years, 10);
    // eslint-disable-next-line no-console
    // console.log(`age: ${age} years`);
    // eslint-disable-next-line no-console
    // console.log(`dateTime.format: ${dateTime.toISO()}`);
    // eslint-disable-next-line no-console
    // console.log(`pt dateOfBirth: ${ptDOB.toISO()}`);

    const p = {
      descr: this._currentProcType.descr,
      code: this._currentProcType.code,
      execPlace: this._procExecPlace,
      procDateTime: dateTime.toISO(),
      ptName: this._currentPatient.name,
      ptRecN: this._currentPatient.recNumber,
      ptID: this._currentPatient.id,
      ptDateOfBirth: ptDOB.toISO(),
      ptAge: age,
      ptGender: this._currentPatient.gender,
      ptWard: this._ward,
      ptBed: this._bed,
      team: this._team,
      user1Name: '',
      user1ID: '',
      user1LicenceNumber: '',
      user2Name: '',
      user2ID: '',
      user2LicenceNumber: '',
      user3Name: '',
      user3ID: '',
      user3LicenceNumber: '',
      user4Name: '',
      user4ID: '',
      user4LicenceNumber: '',
      user5Name: '',
      user5ID: '',
      user5LicenceNumber: '',
      user6Name: '',
      user6ID: '',
      user6LicenceNumber: '',
      updatedByUserName: this.user.name,
      updatedByUserID: this.user.id,
    };
    if (this.procedure && this.procedure.id) {
      // it is a procedure edit
      p.id = this.procedure.id;
      p.createdByUserID = this.procedure.createdByUserID;
    } else {
      // it is a new procedure
      p.createdByUserName = this.user.name;
      p.createdByUserID = this.user.id;
    }

    if (this._currentProcUsers.length > 0) {
      const u = this._currentProcUsers.shift();
      p.user1Name = u.name;
      p.user1ID = u.id;
      p.user1LicenceNumber = u.licenceNumber;
    }
    if (this._currentProcUsers.length > 0) {
      const u = this._currentProcUsers.shift();
      p.user2Name = u.name;
      p.user2ID = u.id;
      p.user2LicenceNumber = u.licenceNumber;
    }
    if (this._currentProcUsers.length > 0) {
      const u = this._currentProcUsers.shift();
      p.user3Name = u.name;
      p.user3ID = u.id;
      p.user3LicenceNumber = u.licenceNumber;
    }
    if (this._currentProcUsers.length > 0) {
      const u = this._currentProcUsers.shift();
      p.user4Name = u.name;
      p.user4ID = u.id;
      p.user4LicenceNumber = u.licenceNumber;
    }
    if (this._currentProcUsers.length > 0) {
      const u = this._currentProcUsers.shift();
      p.user5Name = u.name;
      p.user5ID = u.id;
      p.user5LicenceNumber = u.licenceNumber;
    }
    if (this._currentProcUsers.length > 0) {
      const u = this._currentProcUsers.shift();
      p.user6Name = u.name;
      p.user6ID = u.id;
      p.user6LicenceNumber = u.licenceNumber;
    }

    // fire event to save/update procedure
    this.dispatchEvent(
      new CustomEvent('save-procedure-form', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
    // clear and close form
    this._closeForm();
  }

  _searchUser(e) {
    // eslint-disable-next-line no-console
    // console.log(e.target.value);
    // fire event to hide procedure form from parent's view

    if (e.target.value.length > 2) {
      this.dispatchEvent(
        new CustomEvent('search-user', {
          detail: e.target.value,
          bubbles: true,
          composed: true,
        })
      );
      this._activateUserSearchDropDown = true;
    }
  }

  _userSelected(u) {
    this._userName = u.name;
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(u, null, 2));
    if (this._maxUsersCount >= 0) {
      this._currentProcUsers.push(u);
      this._maxUsersCount -= 1;
    }
    this._activateUserSearchDropDown = false;
  }

  _searchPatient(e) {
    // eslint-disable-next-line no-console
    // console.log(e.target.value);
    // fire event to hide procedure form from parent's view

    if (e.target.value.length > 2) {
      this.dispatchEvent(
        new CustomEvent('search-patient', {
          detail: e.target.value,
          bubbles: true,
          composed: true,
        })
      );
      this._activatePatientSearchDropDown = true;
    }
  }

  _patientSelected(p) {
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(p, null, 2));
    this._currentPatient = { ...p };
    this._patientName = p.name;
    this._activatePatientSearchDropDown = false;
  }

  _searchProcType(e) {
    // eslint-disable-next-line no-console
    // console.log(e.target.value);
    // fire event to hide procedure form from parent's view

    if (e.target.value.length > 2) {
      this.dispatchEvent(
        new CustomEvent('search-procedure-type', {
          detail: e.target.value,
          bubbles: true,
          composed: true,
        })
      );
      this._activateProcTypeSearchDropDown = true;
    }
  }

  _procTypeSelected(p) {
    // eslint-disable-next-line no-console
    // console.log(JSON.stringify(p, null, 2));
    this._currentProcType = { ...p };
    this._procTypeDescr = p.descr;
    this._activateProcTypeSearchDropDown = false;
    this._showRequiredSurgReport = p.requireSurgReport;
  }

  _addPatient(e) {
    e.preventDefault();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('add-patient', { bubbles: true, composed: true })
    );
  }

  _removeProcUser(i) {
    const users = [...this._currentProcUsers];
    users.splice(i, 1);
    this._currentProcUsers = [...users];
  }

  render() {
    return html`
      <div class="modal ${classMap({ 'is-active': this.activate })}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Procedimento</p>
            <button
              class="delete"
              aria-label="close"
              @click="${this._closeForm}"
            ></button>
          </header>
          <section class="modal-card-body">
            <form id="procedure-form">
              <div
                class="is-flex is-flex-direction-row is-justify-content-space-between"
              >
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label><b>Data</b></label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <input
                        class="input"
                        id="date"
                        type="date"
                        .value="${this._currentProcDate}"
                        @input="${e => {
                          this._currentProcDate = e.target.value;
                        }}"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label><b>Hora</b></label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="select">
                        <select
                          id="hours"
                          required
                          .value="${this._currentProcHour}"
                          @blur="${e => {
                            this._currentProcHour = e.target.value;
                          }}"
                          name="hours"
                        >
                          <option value="00">00</option>
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                        </select>
                      </div>
                      <span>:</span>
                      <div class="select">
                        <select
                          id="minutes"
                          required
                          .value="${this._currentProcMinute}"
                          @blur="${e => {
                            this._currentProcMinute = e.target.value;
                          }}"
                        >
                          <option value="00">00</option>
                          <option value="05">05</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- procedure type dropdown search -->
              <div
                class="dropdown is-expanded 
                ${classMap({
                  'is-active': this._activateProcTypeSearchDropDown,
                })}"
              >
                <div class="dropdown-trigger">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label><b>Procedimento</b></label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control is-expanded has-icons-right">
                          <input
                            class="input"
                            type="search"
                            @keyup="${this._searchProcType}"
                            .value="${this._procTypeDescr}"
                            placeholder="buscar pelo nome"
                            required
                          />
                          <icon-search></icon-search>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    ${this.proctypes
                      ? this.proctypes.map(
                          p => html`
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="${e => {
                                e.preventDefault();
                                this._procTypeSelected(p);
                              }}"
                              @keydown="${e => {
                                e.preventDefault();
                                this._procTypeSelected(p);
                              }}"
                              >${p.descr}</a
                            >
                          `
                        )
                      : html`<p></p>`}
                  </div>
                </div>
              </div>
              <p
                class="has-text-danger ${classMap({
                  'is-hidden': !this._showRequiredSurgReport,
                })}"
              >
                Este procedimento necessita de ficha operatória no prontuário
              </p>
              <br />
              <br />

              <!-- place of procedure execution -->
              <div
                class="field
                is-flex is-flex-direction-row
                is-justify-content-space-between"
              >
                <div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label><b>Local</b></label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="select">
                          <select
                            id="execplace"
                            name="execplace"
                            required
                            .value="${this._procExecPlace}"
                            @blur="${e => {
                              this._procExecPlace = e.target.value;
                            }}"
                          >
                            <option value="CC">CC</option>
                            <option value="Hemodinamica">Hemodinamica</option>
                            <option value="Emergencia">Emergencia</option>
                            <option value="Enfermaria">Enfermaria</option>
                            <option value="CHD">CHD</option>
                            <option value="Bioimagem">Bioimagem</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label><b>Equipe</b></label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="select">
                          <select
                            id="team"
                            name="team"
                            required
                            .value="${this._team}"
                            @blur="${e => {
                              this._team = e.target.value;
                            }}"
                          >
                            <option value="Cirurgia Geral">
                              Cirurgia Geral
                            </option>
                            <option value="Cirurgia Plástica">
                              Cirurgia Plástica
                            </option>
                            <option value="Cirurgia Pediátrica">
                              Cirurgia Pediátrica
                            </option>
                            <option value="Cirurgia Vascular">
                              Cirurgia Vascular
                            </option>
                            <option value="Ginecologia Obstetrícia">
                              Ginecologia Obstetrícia
                            </option>
                            <option value="Neurocirurgia">Neurocirurgia</option>
                            <option value="Proctologia">Proctologia</option>
                            <option value="Radiointervensão">
                              Radiointervensão
                            </option>
                            <option value="Urologia">Urologia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- patients dropdown search -->
              <div
                class="is-flex
                is-flex-direction-row"
              >
                <div
                  class="dropdown 
                  ${classMap({
                    'is-active': this._activatePatientSearchDropDown,
                  })}"
                >
                  <div class="field is-flex-grow-5 is-horizontal">
                    <div
                      style="padding-right: 20px; padding-top: 8px;"
                      class="label is-normal"
                    >
                      <label><b>Paciente</b></label>
                    </div>
                    <div class="field-body">
                      <div class="dropdown-trigger">
                        <div class="field">
                          <div class="control is-expanded has-icons-right">
                            <input
                              class="input"
                              type="search"
                              @keyup="${this._searchPatient}"
                              .value="${this._patientName}"
                              placeholder="buscar pelo nome ou registro"
                              required
                            />
                            <icon-search></icon-search>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      ${this.patients
                        ? this.patients.map(
                            p => html`
                              <a
                                href="#"
                                class="dropdown-item"
                                @click="${e => {
                                  e.preventDefault();
                                  this._patientSelected(p);
                                }}"
                                @keydown="${e => {
                                  e.preventDefault();
                                  this._patientSelected(p);
                                }}"
                                >${p.name} - Reg: ${p.recNumber}</a
                              >
                            `
                          )
                        : html`<p></p>`}
                    </div>
                  </div>
                </div>
                <div class="">
                  <button
                    class="button 
                    is-ghost
                    has-tooltip-arrow
                    has-tooltip-top"
                    data-tooltip="Criar"
                    @click="${this._addPatient}"
                    @keydown="${this._addPatient}"
                  >
                    <icon-plus></icon-plus>
                  </button>
                </div>
              </div>
              <br />
              <div
                class="is-flex is-flex-direction-row
                is-justify-content-space-between"
              >
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label><b>Unidade</b></label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="select">
                        <select
                          id="ward"
                          name="ward"
                          .value="${this._ward}"
                          @blur="${e => {
                            this._ward = e.target.value;
                          }}"
                        >
                          <option value="CC">CC</option>
                          <option value="SALA VERMELHA">SALA VERMELHA</option>
                          <option value="SALA AMARELA">SALA AMARELA</option>
                          <option value="SALA VERDE">SALA VERDE</option>
                          <option value="CO">CO</option>
                          <option value="CONSULTÓRIO">CONSULTÓRIO</option>
                          <option value="UTI 1">UTI 1</option>
                          <option value="UTI 2">UTI 2</option>
                          <option value="UTI CIRURG">UTI CIRURG</option>
                          <option value="UTI NEURO">CHD</option>
                          <option value="UTI CARDIO">UTI CARDIO</option>
                          <option value="ENF INTERMEDIARIO">
                            ENF INTERMEDIARIO
                          </option>
                          <option value="ENF 1A">ENF 1A</option>
                          <option value="ENF 1B">ENF 1B</option>
                          <option value="ENF 1C">ENF 1C</option>
                          <option value="ENF 2A">ENF 2A</option>
                          <option value="ENF 2B">ENF 2B</option>
                          <option value="ENF 2C">ENF 2C</option>
                          <option value="ENF 3A">ENF 3A</option>
                          <option value="ENF 3B">ENF 3B</option>
                          <option value="ENF 3C">ENF 3C</option>
                          <option value="ENF 4A">ENF 4A</option>
                          <option value="ENF 4B">ENF 4B</option>
                          <option value="ENF 4C">ENF 4C</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label><b>Leito</b></label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <input
                        class="input"
                        id="bed"
                        type="text"
                        .value="${this._bed}"
                        @input="${e => {
                          this._bed = e.target.value;
                        }}"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <!-- users dropdown search -->
                    <div
                      class="dropdown is-up is-expanded ${classMap({
                        'is-active': this._activateUserSearchDropDown,
                      })}"
                    >
                      <div class="dropdown-trigger">
                        <div class="field is-horizontal">
                          <div class="field-label is-normal">
                            <label><b>Executante(s)</b></label>
                          </div>
                          <div class="field-body">
                            <div class="field">
                              <div class="control is-expanded has-icons-right">
                                <input
                                  id="procusers"
                                  class="input"
                                  type="search"
                                  @keyup="${this._searchUser}"
                                  .value="${this._userName}"
                                  placeholder="buscar pelo nome ou registro de classe"
                                />
                                <icon-search></icon-search>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                          ${this.users
                            ? this.users.map(
                                u => html` <a
                                  href="#"
                                  class="dropdown-item"
                                  @click="${e => {
                                    e.preventDefault();
                                    this._userSelected(u);
                                  }}"
                                  @keydown="${e => {
                                    e.preventDefault();
                                    this._userSelected(u);
                                  }}"
                                >
                                  ${u.name} - ${u.licenceNumber}
                                </a>`
                              )
                            : html`<p></p>`}
                        </div>
                      </div>
                    </div>
                    <div>
                      ${this._currentProcUsers
                        ? this._currentProcUsers.map(
                            (u, i) =>
                              html`
                                <div
                                  class="is-flex 
              is-flex-direction-row
              is-justify-content-space-between
              is-align-items-center
              has-background-light"
                                >
                                  <div class="pl-2">
                                    ${u.name} - ${u.profBoardName} - n.:
                                    ${u.licenceNumber}
                                  </div>
                                  <button
                                    class="button is-light"
                                    @click="${e => {
                                      e.preventDefault();
                                      this._removeProcUser(i);
                                    }}"
                                  >
                                    <icon-trash></icon-trash>
                                  </button>
                                </div>
                              `
                          )
                        : html`<p></p> `}
                    </div>
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
