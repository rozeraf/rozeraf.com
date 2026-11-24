# rozeraf.com

Личная страница-визитка. Статический сайт без фреймворков и зависимостей: исходники в `src/`,
сборка встроенным бандлером [Bun](https://bun.sh) кладёт минифицированный результат в `dist/`.

```
src/
  index.html    разметка
  style.css     стили
  _headers      заголовки Cloudflare Pages (кэш ассетов, CSP)
  js/
    i18n.js     тексты ru/en
    main.js     переключение языка
build.mjs       сборка src → dist и dev-сервер (Bun.build, Bun.serve)
```

## Разработка
```bash
bun run dev       # http://localhost:8000, пересборка при изменениях
bun run build     # dist/
```

Тексты, зависящие от языка, лежат в `src/js/i18n.js` и подставляются через `data-i18n`.
Новую строку добавлять сразу в оба словаря. Язык хранится в localStorage, по умолчанию берётся из браузера.

## Ветки и деплой
- `dev` — рабочая ветка, push выкладывает превью на `dev.rozeraf.pages.dev`.
- `main` — продакшен (`rozeraf.com`).

Деплой делает GitHub Actions (`.github/workflows/deploy.yml`): `bun run build` →
`wrangler pages deploy dist`. Секреты репозитория:
- `CLOUDFLARE_ACCOUNT_ID` — ID аккаунта Cloudflare, где лежит зона `rozeraf.com`;
- `CLOUDFLARE_API_TOKEN` — токен с правом **Account → Cloudflare Pages → Edit**.

Ручной деплой: `bunx wrangler login && bun run deploy`.
