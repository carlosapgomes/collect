import { html, css, LitElement } from 'lit-element';

// got a FAB button from this site
// http://materialdesignblog.com/creating-a-simple-material-design-action-button-with-css/

export class BtnFab extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .container {
        position: fixed;
        right: 15%;
        bottom: 10%;

      }
      .fab {
        width: 70px;
        height: 70px;
        background-color: blue;
        border-radius: 50%;
        box-shadow: 0 6px 10px 0 #666;
        font-size: 50px;
        line-height: 70px;
        color: white;
        position: relative;
        text-align: center;
        transition: all 0.1s ease-in-out;
      }
      .fab:hover {
        box-shadow: 0 6px 14px 0 #666;
        transform: scale(1.05);
      }
      .fab .tooltiptext {
        visibility: hidden;
        width: 40px;
        height: 30px; 
        line-height: 30px;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        position: absolute;
        z-index: 1;
        font-size: 13px;
        width: 120px;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
        }
      .fab:hover .tooltiptext {
        visibility: visible;
      opacity: 1;
      }
      .fab .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
      }

`;
  }

  render() {
    return html` <div class="container"><div class="fab tooltip"
    >+<span class="tooltiptext">Adicionar</span></div></div> `;
  }
}

