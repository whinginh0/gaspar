# Deploy no Easypanel

O projeto usa um Dockerfile multi-stage: o Vite gera os arquivos estáticos e o Nginx os serve na porta `80`.

## Configuração

1. No Easypanel, crie um serviço do tipo **App**.
2. Em **Source**, escolha **GitHub** e selecione `whinginh0/gaspar`.
3. Use a branch `main` e o Build Path `/` (raiz do repositório).
4. Em **Build**, selecione **Dockerfile** e informe `Dockerfile` como caminho.
5. Em **Domains**, configure o domínio com protocolo HTTP e Target Port `80`.
6. Clique em **Deploy**. Se desejar, habilite **Auto Deploy** para publicar novos pushes automaticamente.

Não são necessárias variáveis de ambiente nem volumes persistentes.

## Rotas

- `/` — página de vendas.
- `/bio/` — página de links; `/bio` redireciona para `/bio/`.
- `/healthz` — healthcheck interno, retorna `200 OK`.

## Teste local com Docker

```sh
docker build -t gaspar-site .
docker run --rm -p 8080:80 gaspar-site
```

Depois, abra `http://localhost:8080`.

Referências: [Builders](https://easypanel.io/docs/builders) e [App Service](https://easypanel.io/docs/services/app).
