import { installRouter } from 'pwa-helpers/router.js';
import { LitElement, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { templateLogin } from './templateLogin.js';

export class CollectClient extends LitElement {
  
  // use lightDOM
  createRenderRoot(){
    return this;
  }

  static get properties() {
    return {
      title: { type: String },
      proceduresList: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'My app';
    this.app = {};
    this.restClient = {};
    this.proceduresList = [];
  }

  firstUpdated(){
    // grab the global feathers object imported on index.html
    this.app = window.feathers();
    this.restClient = window.feathers.rest('http://localhost:3030');
    this.app.configure(this.restClient.superagent(window.superagent));
    const proceduresSvc = this.app.service('procedures');
    proceduresSvc.find().then((res)=>{
      if (typeof res.data !== 'undefined'){
        this.proceduresList = [...res.data];
      }
    });
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
      <main>
        <p>Hello</p>
      </main>
      <section id="procedures-types" class="section">
        <div class="column is-6 is-offset-3">
          <div class="container">
            <h1 class="subtitle has-text-centered is-3">
              Tipos de Procedimentos
            </h1>
            <br />
            ${this.proceduresList
              ? this.proceduresList.map(
                  p => html`
                    <div class="card procedure-type-card">
                      <div class="card-content">
                        <div class="content">
                          <strong>${p.name}</strong><br />
                          <div
                            class="button is-white is-pulled-right"
                            @click="${() => {
                              this._edit(p);
                            }}"
                            @keydown="${() => {
                              this._edit(p);
                            }}"
                          >
                            <span class="icon is-small is-right">
                              <svg
                                id="i-edit"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentcolor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              >
                                <path
                                  d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z"
                                />
                              </svg>
                            </span>
                          </div>
                          ${p.code}
                          <br />
                        </div>
                      </div>
                    </div>
                  `
                )
              : html`</p>`}
          </div>
        </div>
      </section>

      <footer
        class="navbar is-fixed-bottom
    is-dark has-text-centered is-vcentered"
      >
        <div class="column">&copy; <small>CG 2021</small></div>
      </footer>    
      `;
  }
}
