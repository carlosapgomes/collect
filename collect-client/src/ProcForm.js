import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class ProcForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      procedure: { type: Object },
      _dateISO: { type: String },
      activate: { type: Boolean },
      _procedureName: { type: String },
      _date: { type: String },
      _procedureCode: { type: String },
      _patientName: { type: String },
      _patientRecNumber: { type: String },
      _patientGender: { type: String },
      _patientAge: { type: Number },
      _bed: { type: String },
      _doctorName: { type: String },
      _weekDay: { type: Number },
      doctors: { type: Array },
      _doctorsOptions: { type: Array },
      proctypes: { type: Array },
      _procTypesOptions: { type: Array },
    };
  }

  constructor() {
    super();
    this.procedure = {};
    this._procedureName = '';
    this._procedureCode = '';
    this._patientName = '';
    this._patientRecNumber = '';
    this._patientGender = '';
    this._patientAge = 0;
    this._bed = '';
    this._date = '';
    this._doctorName = '';
    this._dateISO = '';
    this.activate = false;
    this._weekDay = -1; // 0=sunday, 1=monday ... 6=saturday
    this.doctors = [];
    this._doctorsOptions = [];
    this.proctypes = [];
    this._procTypesOptions = [];
  }

  firstUpdated() {
    const [d] = new Date().toISOString().split('T');
    this._dateISO = d;
    if (this.doctors) {
      this._updateDoctorsList();
    }
    if (this.proctypes) {
      this._updateProcTypesList();
    }
  }

  /**
   * @param {{ has: (arg0: string) => any; }} changedProperties
   */
  updated(changedProperties) {
    if (changedProperties.has('procedure')) {
      if (this.procedure && this.procedure.date) {
        const d = this.procedure.date.split('/');
        this._dateISO = `${d[2]}-${d[1]}-${d[0]}`;
        this._procedureName = this.procedure.procedure;
        this._date = this.procedure.date;
        this._weekDay = this.procedure.weekDay ? this.procedure.weekDay : '';
        this._procedureCode = this.procedure.procCode;
        this._patientName = this.procedure.patientName;
        this._doctorName = this.procedure.doctorName;
        if (this.doctors && this._doctorName) {
          console.log(`updating doctor name to: ${this._doctorName}`);
          // @ts-ignore
          document.getElementById('docOptionsDefault').selected = false;
          for (let i = 0; i < this.doctors.length; i += 1) {
            if (this.doctors[i].name === this._doctorName) {
              // @ts-ignore
              document.getElementById(`docOption${i}`).selected = true;
              break;
            }
          }
        }
      }
      if (this.proctypes && this._procedureName) {
        console.log(`updating proc type to: ${this._procedureName}`);
        // @ts-ignore
        document.getElementById('procOptionsDefault').selected = false;
        for (let i = 0; i < this.proctypes.length; i += 1) {
          if (this.proctypes[i].procedure === this._procedureName) {
            // @ts-ignore
            document.getElementById(`procOption${i}`).selected = true;
            break;
          }
        }
      }
    }
    if (changedProperties.has('doctors')) {
      this._updateDoctorsList();
    }
    if (changedProperties.has('proctypes')) {
      this._updateProcTypesList();
    }
  }

  _updateDoctorsList() {
    this._doctorsOptions = [];
    this._doctorsOptions.push(
      html`
        <option id="docOptionsDefault" value="" selected disabled hidden>
          Escolha
        </option>
      `
    );
    this.doctors.forEach((value, index) => {
      const docOpId = `docOption${index}`;
      this._doctorsOptions.push(html`
        <option id="${docOpId}" value="${value.name}">${value.name}</option>
      `);
    });
  }

  _updateProcTypesList() {
    this._procTypesOptions = [];
    this._procTypesOptions.push(
      html`
        <option id="procOptionsDefault" value="" selected disabled hidden>
          Escolha
        </option>
      `
    );
    this.proctypes.forEach((value, index) => {
      const procOpId = `procOption${index}`;
      this._procTypesOptions.push(html`
        <option id="${procOpId}" value="${index}">${value.procedure}</option>
      `);
    });
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
    // @ts-ignore
    document.getElementById('procedure-form').reset();
    this._procedureName = '';
    this._procedureCode = '';
    this._patientName = '';
    this._patientRecNumber = '';
    this._patientGender = '';
    this._patientAge = 0;
    this._bed = '';
    const [d] = new Date().toISOString().split('T');
    this._dateISO = d;
    // @ts-ignore
    this._date = '';
    this._doctorName = '';
    this._dateISO = '';
    this._weekDay = -1; // 0=sunday, 1=monday ... 6=saturday
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('procedure-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // @ts-ignore
    const proc = this.proctypes[
      document.getElementById('proc-type-select').value
    ];
    this._procedureName = proc.procedure;
    this._procedureCode = proc.code;
    // @ts-ignore
    // this._patientName = document.getElementById('patient-name').value;
    // @ts-ignore
    this._doctorName = document.getElementById('proc-doctor-name').value;
    // @ts-ignore
    const d = document.getElementById('date').value.split('-');
    const dt = new Date(`${d} GMT-03:00`);
    this._date = `${d[2]}/${d[1]}/${d[0]}`;
    this._weekDay = dt.getDay();
    const HH = document.getElementById('hours').value;
    const MM = document.getElementById('minutes').value;
    const procTime = `${HH}:${MM}`;
    const gender = document.getElementById('gender-male').selected
      ? 'male'
      : 'female';
    const ward = document.getElementById('ward').value;
    const p = {
      procedure: this._procedureName,
      procCode: this._procedureCode,
      patientName: this._patientName,
      patientRecNumber: this._patientRecNumber,
      patientAge: this._patientAge,
      patientGender: gender,
      ward,
      bed: this._bed,
      doctorName: this._doctorName,
      date: this._date,
      time: procTime,
      weekDay: this._weekDay,
    };
    if (this.procedure && this.procedure.key) {
      p.key = this.procedure.key;
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
                  .value="${this._dateISO}"
                />
              </div>
              <div class="field">
                <label class="label">Hora (24h)</label>
                <div class="select">
                  <select id="hours" name="hours">
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
                  <select id="minutes" name="minutes">
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
              <div class="field">
                <label class="label">Médico</label>
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select id="proc-doctor-name" required>
                      ${this._doctorsOptions}
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Paciente</label>
                <input
                  class="input"
                  id="patient-name"
                  type="text"
                  placeholder="Paciente"
                  .value="${this._patientName}"
                  required
                />
              </div>
              <div class="field">
                <label class="label">Registro</label>
                <input
                  class="input"
                  id="patient-record-number"
                  type="text"
                  placeholder="Registro"
                  .value="${this._patientRecNumber}"
                  required
                />
              </div>
              <div class="field">
                <label class="label"> Gênero</label>
                <div class="control">
                  <label class="radio">
                    <input id="gender-male" type="radio" name="gender" />
                    Masculino
                  </label>
                  <label class="radio">
                    <input id="gender-female" type="radio" name="gender" />
                    Feminino
                  </label>
                </div>
              </div>
              <div class="field">
                <label class="label">Idade</label>
                <input
                  class="input"
                  id="patient-age"
                  type="number"
                  min="0"
                  step="1"
                  placholder="Idade (anos)"
                  .value="${this._patientAge}"
                />
              </div>

              <div class="field">
                <label class="field">Unidade</label>
                <div class="select">
                  <select id="ward" name="ward">
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
                    <option value="ENF INTERMEDIARIO">ENF INTERMEDIARIO</option>
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
              <div class="field">
                <label class="label">Leito</label>
                <input
                  class="input"
                  id="bed"
                  type="text"
                  .value="${this._bed}"
                />
              </div>
              <div class="field">
                <label class="label">Procedimento</label>
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select id="proc-type-select" required>
                      ${this._procTypesOptions}
                    </select>
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
