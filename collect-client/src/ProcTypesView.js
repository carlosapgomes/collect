import { html, LitElement } from 'lit-element';
import './btn-fab.js';
import './page-nav.js';
import './icons/icon-edit.js';
import './icons/icon-trash.js';

export class ProcTypesView extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      proctypesres: { type: Object },
      _procedures: { type: Array, state: true },
      _total: { type: Number, state: true },
      _limit: { type: Number, state: true },
      _skip: { type: Number, state: true },
    };
  }

  firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('update-procedures-types-list', {
        detail: {
          skip: 0,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.addEventListener('paginate', this._paginate);
  }

  _edit(p) {
    // eslint-disable-next-line no-console
    // console.log(u);
    this.dispatchEvent(
      new CustomEvent('edit-procedure-type', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
  }

  updated(changedProperties) {
    if (changedProperties.has('proctypesres')) {
      // eslint-disable-next-line no-console
      // console.log(JSON.stringify(this.proctypesres, null, 2));
      this._procedures = [...this.proctypesres.data];
      this._total = this.proctypesres.total;
      this._limit = this.proctypesres.limit;
      this._skip = this.proctypesres.skip;
    }
  }

  _paginate(e) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('update-procedures-types-list', {
        detail: {
          skip: e.detail.skip,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _remove(p) {
    // eslint-disable-next-line no-console
    // console.log(p);
    this.dispatchEvent(
      new CustomEvent('remove-procedure-type', {
        detail: p,
        bubbles: true,
        composed: true,
      })
    );
  }

  _addProcType() {
    this.dispatchEvent(
      new CustomEvent('add-procedure-type', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <style>
        .procedure-type-card {
          margin-bottom: 0.3em;
        }
        svg {
          margin: 0.4em;
          overflow: visible;
        }
      </style>
      <section id="procedures-types" class="section">
        <div class="column is-6 is-offset-3">
          <div class="container">
            <h1 class="subtitle has-text-centered is-3">
              Tipos de Procedimentos
            </h1>
            <br />
            ${this._procedures
              ? this._procedures.map(
                  p => html`
                    <div class="card procedure-type-card">
                      <div class="card-content">
                        <div class="content is-flex is-flex-direction-row">
                          <div class="is-align-self-flex-start is-flex-grow-4">
                            <strong>${p.descr}</strong><br />
                            Cód. SUS: ${p.code}
                          </div>
                          <div
                            class="is-flex 
                            is-align-self-flex-end
                            is-flex-grow-1
                            is-flex-direction-column"
                          >
                            <div
                              class="button
                              is-white
                              is-align-self-flex-end
                              has-tooltip-arrow
                              has-tooltip-top"
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
                              class="button 
                            is-white
                            is-align-self-flex-end
                            has-tooltip-arrow
                            has-tooltip-bottom"
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
            <page-nav
              .total=${this._total}
              .limit=${this._limit}
              .skip=${this._skip}
            >
            </page-nav>
          </div>
        </div>
        <btn-fab
          @click="${() => {
            this._addProcType();
          }}"
        ></btn-fab>
      </section>
    `;
  }
}
