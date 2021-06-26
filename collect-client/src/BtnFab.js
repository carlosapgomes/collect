import { html, css, LitElement } from 'lit-element';

// got a FAB button from this site
// http://materialdesignblog.com/creating-a-simple-material-design-action-button-with-css/

export class BtnFab extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .fab {
        width: 70px;
        height: 70px;
        background-color: red;
        border-radius: 50%;
        box-shadow: 0 6px 10px 0 #666;
        font-size: 50px;
        line-height: 70px;
        color: white;
        text-align: center;
        position: fixed;
        right: 15%;
        bottom: 10%;
        transition: all 0.1s ease-in-out;
      }
      .fab:hover {
        box-shadow: 0 6px 14px 0 #666;
        transform: scale(1.05);
      }
    `;
  }

  render() {
    return html` <div class="fab">+</div> `;
  }
}
