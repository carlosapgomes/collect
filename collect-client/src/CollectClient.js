import { LitElement, html } from 'lit-element';

export class CollectClient extends LitElement {
  
  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'My app';
    this.app = {};
    this.restClient = {};
  }

  // use lightDOM
  createRenderRoot(){
    return this;
  }

  firstUpdated(){
    // grab the global feathers object imported on index.html
    this.app = window.feathers();
    this.restClient = window.feathers.rest('http://localhost:3030');
    this.app.configure(this.restClient.superagent(window.superagent));
    const proceduresSvc = this.app.service('procedures');
    proceduresSvc.find().then((res)=>{
      console.log(res);
    });
  }

  render() {
    return html`
      <main>
        <p>Hello</p>
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
