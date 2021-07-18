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
      doctors: { type: Array },
      _currentDoc: { type: Object, state: true },
      _doctorName: { type: String, state: true },
      _activateDocSearchDropDown: { type: Boolean, state: true },
      proctypes: { type: Array },
      _currentProcType: { type: Object, state: true },
      _procTypeDescr: { type: String, state: true },
      _activateProcTypeSearchDropDown: { type: Boolean, state: true },
      user: { type: Object },
    };
  }

  constructor() {
    super();
    this.procedure = {};
    this._patientName = '';
    this._currentPatient = {};
    this._activatePatientSearchDropDown = false;
    this._ward = '';
    this._bed = '';
    this._doctorName = '';
    this.activate = false;
    this.doctors = [];
    this._currentDoc = {};
    this._activateDocSearchDropDown = false;
    this.proctypes = [];
    this._procTypeDescr = '';
    this._activateProcTypeSearchDropDown = false;
  }

  firstUpdated() {
    const d = DateTime.local().toISODate();
    this._currentProcDate = d;
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(d, null, 2));
    this._currentProcHour = '00';
    this._currentProcMinute = '00';
    }

  /**
   * @param {{ has: (arg0: string) => any; }} changedProperties
   */
  updated(changedProperties) {
    if (changedProperties.has('procedure')) {
      // eslint-disable-next-line no-console
      console.log('entering updated');
      if (this.procedure && this.procedure.procDateTime) {
        // eslint-disable-next-line no-console
        console.log('procedure changed and is defined');
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(this.procedure, null, 2));
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
        console.log(`this._procTypeDescr: ${this._procTypeDescr}`);

        this._currentPatient = {
          name: this.procedure.ptName,
          recNumber: this.procedure.ptRecN,
          id: this.procedure.ptID,
          dateOfBirth: this.procedure.ptDateOfBirth,
          gender: this.procedure.ptGender,
        };
        // eslint-disable-next-line no-console
        console.log(`this._currentPatient:\n 
        ${JSON.stringify(this._currentPatient,null,2)}`);
        this.patients = [{ ...this._currentPatient }];
        this._patientName = this._currentPatient.name;

        this._currentDoc = {
          name: this.procedure.docName,
          id: this.procedure.docID,
          licenceNumber: this.procedure.docLicenceNumber,
        };
        this._doctorName = this.procedure.docName;
        this.doctors = [{ ...this._currentDoc }];

        this._bed = this.procedure.ptBed;
        this._ward = this.procedure.ptWard;
      }
    }
  }

  // _updateDoctorsList() {
  // this._doctorsOptions = [];
  // this._doctorsOptions.push(
  // html`
  // <option id="docOptionsDefault" value="" selected disabled hidden>
  // Escolha
  // </option>
  // `
  // );
  // this.doctors.forEach((value, index) => {
  // const docOpId = `docOption${index}`;
  // this._doctorsOptions.push(html`
  // <option id="${docOpId}" value="${value.name}">${value.name}</option>
  // `);
  // });
  // }

  // _updateProcTypesList() {
  // this._procTypesOptions = [];
  // this._procTypesOptions.push(
  // html`
  // <option id="procOptionsDefault" value="" selected disabled hidden>
  // Escolha
  // </option>
  // `
  // );
  // this.proctypes.forEach((value, index) => {
  // const procOpId = `procOption${index}`;
  // this._procTypesOptions.push(html`
  // <option id="${procOpId}" value="${index}">${value.procedure}</option>
  // `);
  // });
  // }

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
    // @ts-ignore
    document.getElementById('procedure-form').reset();
    this._procedureName = '';
    this._procTypeDescr = '';
    this._activateProcTypeSearchDropDown = false;
    this._patientName = '';
    this._currentPatient = {};
    this._activatePatientSearchDropDown = false;
    this._ward = '';
    this._bed = '';
    this._currentDoc = {};
    this._doctorName = '';
    this._activateDocSearchDropDown = false;
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('procedure-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // eslint-disable-next-line no-console
    console.log(
      `currentProcDate: ${this._currentProcDate}\n 
      currentProcHour: ${this._currentProcHour}\n
      currentProcMinute: ${this._currentProcMinute}`
    );

    const dateTime = DateTime.fromISO(
      `${this._currentProcDate}T${this._currentProcHour}:${this._currentProcMinute}:00.000-03:00`
    );
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(dateTime, null, 2));
    // eslint-disable-next-line no-console
    console.log(`pt dateOfBirth: ${this._currentPatient.dateOfBirth}`);
    const ptDOB = DateTime.fromSQL(this._currentPatient.dateOfBirth);
    // eslint-disable-next-line no-console
    console.log(`ptDOB: ${ptDOB}`);
    const ageObj = dateTime.diff(ptDOB, 'years').toObject();
    const age = parseInt(ageObj.years,10);
    // eslint-disable-next-line no-console
    console.log(`age: ${age} years`);
    // eslint-disable-next-line no-console
    console.log(`dateTime.format: ${dateTime.toISO()}`);
    // eslint-disable-next-line no-console
    console.log(`pt dateOfBirth: ${ptDOB.toISO()}`);

    const p = {
      descr: this._currentProcType.descr,
      code: this._currentProcType.code,
      procDateTime: dateTime.toISO(),
      ptName: this._currentPatient.name,
      ptRecN: this._currentPatient.recNumber,
      ptID: this._currentPatient.id,
      ptDateOfBirth: ptDOB.toISO(),
      ptAge: age,
      ptGender: this._currentPatient.gender,
      ptWard: this._ward,
      ptBed: this._bed,
      docName: this._currentDoc.name,
      docLicenceNumber: this._currentDoc.licenceNumber,
      docID: this._currentDoc.id,
      updatedByUserName: this.user.name,
      updatedByUserID: this.user.id,
    };
    if (this.procedure && this.procedure.id) {
      // it is a procedure edit
      p.id = this.procedure.id;
    }else{
      // it is a new procedure
      p.createdByUserName = this.user.name;
      p.createdByUserID = this.user.id;
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

  _searchDoc(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    // fire event to hide procedure form from parent's view

    if (e.target.value.length > 2) {
      this.dispatchEvent(
        new CustomEvent('search-doctor', {
          detail: e.target.value,
          bubbles: true,
          composed: true,
        })
      );
      this._activateDocSearchDropDown = true;
    }
  }

  _docSelected(d) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(d, null, 2));
    this._currentDoc = { ...d };
    this._doctorName = d.name;
    this._activateDocSearchDropDown = false;
  }

  _searchPatient(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
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
    console.log(JSON.stringify(p, null, 2));
    this._currentPatient = { ...p };
    this._patientName = p.name;
    this._activatePatientSearchDropDown = false;
  }

  _searchProcType(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
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
    console.log(JSON.stringify(p, null, 2));
    this._currentProcType = { ...p };
    this._procTypeDescr = p.descr;
    this._activateProcTypeSearchDropDown = false;
  }

  _addPatient(e) {
    e.preventDefault();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('add-patient', { bubbles: true, composed: true })
    );
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
              <div class="field">
                <label class="label">Data</label>
                <input
                  class="input"
                  id="date"
                  type="date"
                  .value="${this._currentProcDate}"
                  @input="${e => {
                    this._currentProcDate = e.target.value;
                  }}"
                />
              </div>
              <div class="field">
                <label class="label">Hora (24h)</label>
                <div class="select">
                  <select
                    id="hours"
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
                    name="minutes"
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

              <!-- procedure type dropdown search -->
              <div
                class="dropdown is-expanded 
                ${classMap({
                  'is-active': this._activateProcTypeSearchDropDown,
                })}"
              >
                <div class="dropdown-trigger">
                  <div class="field">
                    <label class="label">Procedimento</label>
                    <div class="control is-expanded has-icons-right">
                      <input
                        class="input"
                        type="search"
                        @keyup="${this._searchProcType}"
                        .value="${this._procTypeDescr}"
                        placeholder="buscar pelo nome"
                      />
                      <icon-search></icon-search>
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
              <br />
              <br />

              <!-- patients dropdown search -->
              <div
                class="is-flex
                is-justify-content-space-between
                is-flex-direction-row"
              >
                <div
                  class="dropdown
                  ${classMap({
                    'is-active': this._activatePatientSearchDropDown,
                  })}"
                >
                  <div class="dropdown-trigger">
                    <div class="field">
                      <label class="label">Paciente</label>
                      <div class="control is-expanded has-icons-right">
                        <input
                          class="input"
                          type="search"
                          @keyup="${this._searchPatient}"
                          .value="${this._patientName}"
                          placeholder="buscar pelo nome ou registro"
                        />
                        <icon-search></icon-search>
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
                <div class="is-align-self-flex-end">
                  <button
                    class="button 
                    is-ghost 
                    has-tooltip-arrow
                    has-tooltip-top"
                    data-tooltip="Adicionar"
                    @click="${this._addPatient}"
                    @keydown="${this._addPatient}"
                  >
                    <icon-plus></icon-plus>
                  </button>
                </div>
              </div>
              <br />
              <div
                class="field
                is-flex is-flex-direction-row
                is-justify-content-space-between"
              >
                <div>
                  <label class="label">Unidade</label>
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
                <div>
                  <label class="label">Leito</label>
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

              <!-- doctors dropdown search -->
              <div
                class="dropdown is-up is-expanded ${classMap({
                  'is-active': this._activateDocSearchDropDown,
                })}"
              >
                <div class="dropdown-trigger">
                  <div class="field">
                    <label class="label">Médico</label>
                    <div class="control is-expanded has-icons-right">
                      <input
                        class="input"
                        type="search"
                        @keyup="${this._searchDoc}"
                        .value="${this._doctorName}"
                        placeholder="buscar pelo nome ou CRM"
                      />
                      <icon-search></icon-search>
                    </div>
                  </div>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    ${this.doctors
                      ? this.doctors.map(
                          d => html`
                            <a
                              href="#"
                              class="dropdown-item"
                              @click="${e => {
                                e.preventDefault();
                                this._docSelected(d);
                              }}"
                              @keydown="${e => {
                                e.preventDefault();
                                this._docSelected(d);
                              }}"
                              >${d.name} - ${d.licenceNumber}</a
                            >
                          `
                        )
                      : html`<p></p>`}
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
