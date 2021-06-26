import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

export class ProcTypeForm extends LitElement {
  // use lightDOM
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      proceduretype: { type: Object },
      activate: { type: Boolean },
      _procedure: { type: String },
      _code: { type: String },
    };
  }

  constructor() {
    super();
    this.proceduretype = {};
    this.activate = false;
    this._procedure = '';
    this._code = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('proceduretype')) {
      if (this.proceduretype) {
        this._procedure = this.proceduretype.procedure
          ? this.proceduretype.procedure
          : '';
        this._code = this.proceduretype.code ? this.proceduretype.code : '';
      }
    }
  }

  _closeForm() {
    // clear form
    this._clearFields();
    // fire event to hide procedure form from parent's view
    this.dispatchEvent(
      new CustomEvent('close-procedure-type-form', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _clearFields() {
    this.proceduretype = {};
    // @ts-ignore
    document.getElementById('proctype-form').reset();
    this._procedure = '';
    this._code = '';
  }

  _saveForm(e) {
    e.preventDefault();
    // @ts-ignore
    if (document.getElementById('proctype-form').reportValidity()) {
      this._handleSaveForm();
    }
  }

  _handleSaveForm() {
    // @ts-ignore
    this._procedure = document.getElementById('proctype').value;
    // @ts-ignore
    this._code = document.getElementById('code').value;

    const p = {
      procedure: this._procedure,
      code: this._code,
    };
    if (this.proceduretype && this.proceduretype.key) {
      p.key = this.proceduretype.key;
    }
    // eslint-disable-next-line no-console
    // console.log(p);
    // fire event to save/update doctor
    this.dispatchEvent(
      new CustomEvent('save-procedure-type-form', {
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
            <form id="proctype-form">
              <div class="field">
                <input
                  class="input"
                  id="proctype"
                  type="text"
                  placeholder="Procedimento"
                  .value="${this._procedure}"
                  required
                />
              </div>
              <div class="field">
                <input
                  class="input"
                  id="code"
                  type="text"
                  placeholder="código SUS (xx.xx.xx.xxx-x)"
                  .value="${this._code}"
                />
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
