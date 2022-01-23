# collect

[![wakatime](https://wakatime.com/badge/github/carlosapgomes/collect.svg)](https://wakatime.com/badge/github/carlosapgomes/collect)

## Instalação

Estas instruções foram testadas numa instalação linux Debian 10.

Pré-requisitos:

- Acesso root
- git

Instale o `git`:

`apt -y install git`

Após logar como `root`

Clone o projeto:
`git clone https://github.com/carlosapgomes/collect.git`

Vá ao diretório do projeto,

`cd collect`

e execute o instalador:
 `bash ./install.sh`.

Ele vai:

- atualizar o sistema
- instalar dependências de instalação (ansible, curl, sqlite3, rsync)
- instalar as dependências do backend e do frontend (Nodejs, yarn
  e pacotes de bibliotecas)
- gerar os arquivos do frontend
- executar o ansible

O Ansible vai:

- instalar os arquivos do backend no servidor e configura-lo
  como um serviço do `systemd`
- copiar os arquivos do frontend para o diretório `/var/www/collect/html`
- instalar e configurar o Nginx como proxy reverso do frontend e do backend
- inserir o primeiro usuário `admin` no banco de dados
- inserir os dados iniciais dos tipos de procedimentos
- configurar um cronjob para realizar o backup do banco de dados três vezes
  ao dia para o diretório `/opt/backup/files/` (certifique-se de que esse
  diretório seja espelhado em outro servidor)

Ao final da instalação, verifique o `status` dos serviços instalados com os
comando:

`systemctl status collect`

`systemctl status nginx`

Tente acessar o sistema remotamente navegando no browser para o endereço
`http://ip_do_servidor` utilizando `admin` como login e `1234` como senha.
