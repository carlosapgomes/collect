# collect

[![wakatime](https://wakatime.com/badge/github/carlosapgomes/collect.svg)](https://wakatime.com/badge/github/carlosapgomes/collect)

## Instalação

Estas instruções foram testadas numa instalação linux Debian 10.

Pré-requisitos:

- Acesso root
- git(`apt -y install git`)

Após logar como `root`:

Clone o projeto atual:

`git clone https://github.com/carlosapgomes/collect.git`


`cd collect`

 `bash ./install.sh`.

Ele vai:

- atualizar o sistema
- instalar e executar o ansible

O Ansible vai:

- instalar o Nodejs
- instalar e configurar o backend como um serviço do `systemd`
- gerar e copiar os arquivos do frontend para o diretório `/www/collect/html`
- instalar e configurar o Nginx como proxy reverso do frontend e do backend

Ao final da instalação, tente acessar o sistema remotamente como
usuário `admin` e senha `1234`.



