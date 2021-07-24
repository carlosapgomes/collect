import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import './btn-fab.js';
import { DateTime } from 'luxon';
import './icons/icon-download.js';
import './icons/icon-reload.js';
import './icons/icon-edit.js';
import './icons/icon-trash.js';
import './icons/icon-search.js';

export class ProcsView extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      procedures: { type: Array },
      user: { type: Object },
      users: { type: Array, state: true },
      date: { type: String },
      _searchByDate : { type: String, state: true },
      _searchByPersonTeam: { type: String, state: true },
      _userName: { type: String, state: true },
      _currentSearchUserID: { type: String, state: true },
      _currentSearchTeam: { type: String, state: true },
      _toggleUserOrTeamSearch: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.procedures = [];
    this.date = DateTime.local();
    this._searchByDate =  'day';
    this._searchByPersonTeam =  'person';
    this._userName = '';
    this._currentSearchTeam = '';
    this._toggleUserOrTeamSearch = true;
    this._currentSearchTeam = 'all';
    this._currentSearchUserID = '';
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-procedures-list', {
        bubbles: true,
        composed: true,
      })
    );
    this._userName = this.user.name;
    this._currentSearchUserID = this.user.id;
  }

  _edit(p) {
    this.dispatchEvent(
      new CustomEvent('edit-procedure', {
        detail: { ...p },
        bubbles: true,
        composed: true,
      })
    );
  }

  _addProc() {
    this.dispatchEvent(
      new CustomEvent('add-procedure', { bubbles: true, composed: true })
    );
  }

  _userSelected(u) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(u, null, 2));
    this._currentSearchUserID = u.id;
    this._userName = u.name;
    this._activateUserSearchDropDown = false;
  }

  _updateProcedures() {
      const dt = this.date.toISO();
      this.dispatchEvent(
        new CustomEvent('update-procedures-list', {
          detail: { 
            searchByDate: this._searchByDate,
            searchByPersonTeam: this._searchByPersonTeam,
            date: dt,
            searchID: this._currentSearchUserID,
            searchTeam: this._currentSearchTeam,
          },
          bubbles: true,
          composed: true,
        })
      );
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

  _getSpreadsheet(){
    this.dispatchEvent(
      new CustomEvent('get-spreadsheet',{
        bubbles: true,
        composed:true, 
      })
    );
  }

  static _getShortName(n){
    const d = n.split(' ');
    if (d.length > 1){
      return [d[0], d[d.length -1]].join(' ');
    }
      return n;
  }

  static _getTeamNames(p){
    const team = [];
    team.push(ProcsView._getShortName(p.user1Name));
    if(p.user2Name.length > 1){
    team.push(ProcsView._getShortName(p.user2Name));
    }
    if(p.user3Name.length > 1){
    team.push(ProcsView._getShortName(p.user3Name));
    }
    if(p.user4Name.length > 1){
    team.push(ProcsView._getShortName(p.user4Name));
    }
    if(p.user5Name.length > 1){
    team.push(ProcsView._getShortName(p.user5Name));
    }
    if(p.user6Name.length > 1){
    team.push(ProcsView._getShortName(p.user6Name));
    }
    return team.join(' | ');
  }

  render() {
    return html`
      <style>
        .proc-card {
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
              <h1 class="subtitle has-text-centered is-3">Procedimentos</h1>
              <div class="field is-horizontal">
                <div class="field-body">    
                  <div class="field">
                    <div class="control">
                      <label><b>Período:</b> </label>
                      <label class="radio">
                        <input 
                          type="radio" 
                          checked
                          name="searchByDate"
                          @click="${() => {this._searchByDate = 'day';}}"/>
                        Dia
                      </label>
                      <label class="radio">
                        <input 
                          type="radio" 
                          name="searchByDate"
                          @click="${() => {this._searchByDate = 'week';}}"/>
                        Semana
                      </label>
                      <label class="radio">
                        <input 
                          type="radio" 
                          name="searchByDate"
                          @click="${() => {this._searchByDate = 'month';}}"/>
                        Mês
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    id="procs-date"
                    class="input"
                    type="date"
                    .value="${DateTime.local(this.date).toISODate()}"
                    @input="${(e)=>{
                    this.date = DateTime.fromISO(e.target.value);
                    }}"
                  />
                </div></div>

              <div class="field is-horizontal">
                <div class="field-body">    
                  <div class="field">
                    <div  class="control">
                      <label><b>Executante:</b></label>
                      <label class="radio">
                        <input 
                          type="radio" 
                          checked
                          name="searchByPersonTeam"
                          @click="${() => {
                          this._searchByPersonTeam = 'person';
                          this._toggleUserOrTeamSearch = true;}}"/>
                        Usuário 
                      </label>
                      <label class="radio">
                        <input 
                          type="radio" 
                          name="searchByPersonTeam"
                          @click="${() => {
                          this._searchByPersonTeam = 'team';
                          this._toggleUserOrTeamSearch = false;}}"/>
                        Equipe 
                      </label>
                    </div>
                  </div>
                </div>
              </div>
                <!-- users dropdown search -->
                <div
                  class="dropdown is-expanded ${classMap({
                  'is-hidden': !this._toggleUserOrTeamSearch,
                  'is-active': this._activateUserSearchDropDown,
                  })}"
                >
                  <div class="dropdown-trigger">
                    <div class="field">
                      <div class="control is-expanded has-icons-right">
                        <input
                          class="input"
                          type="search"
                          @keyup="${this._searchUser}"
                          .value="${this._userName}"
                          placeholder="nome/registro de classe"
                        ></input>
                        <icon-search></icon-search>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      ${this.users
                        ? this.users.map(
                          u => html`
                            <a
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
                            > ${u.name} - ${u.licenceNumber}</a>
                          `) : html`<p></p>`}
                    </div>
                  </div>
                </div>    
                <div class="${classMap({
                  'is-hidden': this._toggleUserOrTeamSearch,
                  })}">
                  <div class="select" style="width: 100%">
                    <select
                      style="width: 100%"
                      id="team"
                      name="team"
                      .value="${this._currentSearchTeam}"
                      @blur="${e => {
                      this._currentSearchTeam = e.target.value;
                      }}"
                    >
                      <option value="all">Todas</option>
                      <option value="Cirurgia Geral">Cirurgia Geral</option>
                      <option value="Cirurgia Plástica">Cirurgia Plástica</option>
                      <option value="Cirurgia Pediátrica">Cirurgia Pediátrica</option>
                      <option value="Cirurgia Vascular">Cirurgia Vascular</option>
                      <option value="Ginecologia Obstetrícia">Ginecologia Obstetrícia</option>
                      <option value="Neurocirurgia">Neurocirurgia</option>
                      <option value="Proctologia">Proctologia</option>
                      <option value="Radiointervensão">Radiointervensão</option>
                      <option value="Urologia">Urologia</option>
                    </select>
                  </div>
                </div>
              <div class="is-flex pt-3
                flex-direction-row is-justify-content-space-evenly">

                <button class="button is-light"
                  @click="${this._updateProcedures}">
                  <span>Pesquisar</span>
                  <icon-reload class="has-tooltip-arrow pl-3 has-tooltip-top"
                    data-tooltip="Recarregar"></icon-reload>
                </button>
                <button class="button is-success"
                  @click="${this._getSpreadsheet}">
                  <span>Baixar</span>
                  <icon-download
                    class="has-tooltip-arrow pl-3 has-tooltip-top"
                    data-tooltip="Baixar"></icon-download>
                </button>
              </div> 
              <br />
              ${this.procedures
                ? this.procedures.map(
                  p => html`
                    <div class="card proc-card">
                      <div class="card-content">
                        <div class="content is-flex is-flex-direction-row">
                          <div class="is-align-self-flex-start is-flex-grow-4">
                            <strong>${p.descr}</strong>
                            <small>
                              Data:
                              ${DateTime.fromSQL(p.procDateTime, {
                                locale: 'pt-BR',
                              }).toLocaleString(DateTime.DATETIME_SHORT)}<br />
                              Paciente: ${p.ptName}<br />
                              Equipe: ${ProcsView._getTeamNames(p)}
                            </small>
                          </div>
                          <div
                            class="is-flex 
                            is-align-self-flex-end
                            is-flex-grow-1
                            is-flex-direction-column"
                          >
                            <div
                              class="button is-white
                              is-align-self-flex-end
                              has-tooltip-arrow
                              has-tooltip-right"
                              data-tooltip="Editar"
                              @click="${() => {
                              this._edit(p);
                              }}"
                              @keydown="${() => {
                              this._edit(p);
                              }}"
                            >
                              <icon-edit></icon-edit>
                            </div>
                            <div
                              class="button is-white
                              is-align-self-flex-end
                              has-tooltip-arrow
                              has-tooltip-right"
                              data-tooltip="Remover"
                              @click="${() => {
                              this._remove(p);
                              }}"
                              @keydown="${() => {
                              this._remove(p);
                              }}"
                            >
                              <icon-trash></icon-trash>
                            </div>
                          </div>
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
            this._addProc();
            }}"
          ></btn-fab>
        </section>
    `;
  }
}
