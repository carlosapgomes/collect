import {html} from 'lit-html';

export const templateLogin = html`

    <div class="container has-text-centered">
      <div class="column is-6 is-offset-3">
        <h1 class="title">
          Faça o login:
        </h1>
        <br />
        <br />
        <form id="loginform">
          <div class="field">
          <label class="label has-text-left" for="email">Email:</label>
            <p class="control has-icons-left has-icons-right">
              <input class="input" id="email" type="email" placeholder="nome@example.com" />
              <span class="icon is-small is-left">
                <svg
                  id="i-mail"
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
                  <path d="M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6" />
                </svg>
              </span>
              <span class="icon is-small is-right">
                <svg
                  id="i-checkmark"
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
                  <path d="M2 20 L12 28 30 4" />
                </svg>
              </span>
            </p>
          </div>
          <div class="field">
          <label class="label has-text-left" for="password">Senha:</label>
            <p class="control has-icons-left">
              <input class="input" id="password" type="password" placeholder="xxxxxxxx" />
              <span class="icon is-small is-left">
                <svg
                  class="i-lock"
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
                    d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"
                  />
                  <circle cx="16" cy="24" r="1" />
                </svg>
              </span>
            </p>
          </div>
          <div class="field">

            <p class="control">
              <button id="loginactionbtn" class="button is-success has-text-black">
                Login
              </button>
              <button id="resetpw" class="button is-info is-light has-text-black">
                Esqueci a senha
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
`;
