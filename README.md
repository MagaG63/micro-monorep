# SMS Frontend — монорепозиторий с микрофронтендами

Учебный production-ready монорепозиторий: **pnpm workspaces + Turborepo + Module Federation (Vite) + CI/CD на GitHub Pages**.

```
┌─────────────────────────────────────────────────────────────┐
│                        GitHub Pages                          │
│  /<repo>/            → shell (хост)                          │
│  /<repo>/admin/      → remoteEntry.js + чанки admin          │
│  /<repo>/dashboard/  → remoteEntry.js + чанки dashboard      │
│  /<repo>/profile/    → remoteEntry.js + чанки profile        │
└─────────────────────────────────────────────────────────────┘
```

## Стек

| Технология                           | Роль                                             |
| ------------------------------------ | ------------------------------------------------ |
| **React 18**                         | UI                                               |
| **React Router 6**                   | Маршрутизация (в shell и внутри микрофронтендов) |
| **Vite 5**                           | Сборка каждого приложения                        |
| **@originjs/vite-plugin-federation** | Module Federation для Vite                       |
| **pnpm workspaces**                  | Связывание пакетов монорепозитория               |
| **Turborepo**                        | Оркестрация задач, кэш, граф зависимостей        |
| **Vitest + Testing Library**         | Тесты                                            |
| **GitHub Actions**                   | CI/CD → GitHub Pages                             |

## Структура

```
micro-monorep/
├── apps/
│   ├── shell/          # хост-приложение (Module Federation host)
│   │   └── src/App.tsx # маршруты /admin/*, /dashboard/*, /profile/*
│   ├── admin/          # микрофронтенд «Админ-панель» (remote, порт 3001)
│   ├── dashboard/      # микрофронтенд «Дашборд» (remote, порт 3002)
│   └── profile/        # микрофронтенд «Профиль» (remote, порт 3003)
├── packages/
│   ├── types/          # @sms/types — общие TypeScript-типы
│   ├── utils/          # @sms/utils — утилиты (форматирование, валидация)
│   └── ui/             # @sms/ui — общий UI-кит (Button, Card, Badge, StatCard...)
├── .github/workflows/ci-cd.yml   # CI/CD пайплайн
├── pnpm-workspace.yaml           # какие папки — workspace-пакеты
├── turbo.json                    # граф задач и кэш
└── package.json                  # корневые команды
```

## Как это работает

### 1. pnpm workspaces

`pnpm-workspace.yaml` говорит pnpm, что `apps/*` и `packages/*` — это пакеты одного репозитория.
Приложения зависят от общих пакетов через протокол `workspace:*`:

```json
"dependencies": {
  "@sms/ui": "workspace:*",
  "@sms/utils": "workspace:*"
}
```

pnpm создаёт симлинки на локальные пакеты — правки в `packages/ui` сразу видны во всех приложениях без публикации в npm. Плюс жёсткие ссылки на глобальное хранилище: React одной версии хранится на диске один раз.

### 2. Turborepo

`turbo.json` описывает граф задач:

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test": {},
    "lint": {}
  }
}
```

- `dependsOn: ["^build"]` — перед сборкой приложения сначала собираются его зависимости (пакеты).
- `outputs: ["dist/**"]` — что кэшировать. Если исходники не менялись, Turbo возьмёт результат из кэша (`.turbo/`) и сборка займёт секунды.

### 3. Module Federation

**Shell (хост)** в `apps/shell/vite.config.ts` знает URL-ы удалённых модулей:

```ts
remotes: {
  admin: 'http://localhost:3001/assets/remoteEntry.js',
  dashboard: 'http://localhost:3002/assets/remoteEntry.js',
  profile: 'http://localhost:3003/assets/remoteEntry.js',
}
```

и лениво грузит их:

```tsx
const AdminApp = lazy(() => import('admin/App'))
...
<Route path="/admin/*" element={<AdminApp />} />
```

**Remotes** в своих `vite.config.ts` экспортируют компонент:

```ts
federation({
  name: "admin",
  filename: "remoteEntry.js",
  exposes: { "./App": "./src/App.tsx" },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    "react-router-dom": { singleton: true },
  },
});
```

`shared + singleton` гарантирует, что React во всех модулях — **один и тот же экземпляр** (иначе хуки падают), и загружается один раз.

> ⚠️ Важные нюансы, проверенные на практике:
>
> - URL remote в конфиге хоста указывается **без** webpack-префикса `name@` — плагин originjs принимает голый URL.
> - У экспортируемого компонента **обязателен default export** — `React.lazy` берёт именно `.default`.
> - В dev-режиме Vite хост работает, а remotes — нет: плагин отдаёт `remoteEntry.js` только из собранного бандла (см. «Локальная разработка»).

## Локальная разработка

```bash
pnpm install      # один раз
pnpm dev          # поднять всё: shell + 3 remotes
```

Откройте http://localhost:3000

**Почему remotes запускаются не через `vite dev`:** у `@originjs/vite-plugin-federation` dev-сервер remotes не отдаёт `remoteEntry.js` (это известное ограничение плагина). Поэтому скрипт `dev` у remotes делает:

```json
"dev": "vite build && concurrently \"vite build --watch\" \"vite preview\""
```

- `vite build` — первичная сборка;
- `vite build --watch` — пересборка при изменениях;
- `vite preview` — раздача собранного `dist` на порту приложения (3001/3002/3003).

Shell при этом работает в обычном dev-режиме и забирает remoteEntry с preview-серверов. После старта `pnpm dev` подождите ~30 секунд (первичная сборка remotes), затем откройте shell.

Каждый remote можно разрабатывать изолированно:

```bash
pnpm dev:admin     # remote + preview на 3001 (http://localhost:3001 — standalone-версия)
pnpm dev:shell     # только shell (http://localhost:3000)
```

## Команды

| Команда                                                          | Что делает                               |
| ---------------------------------------------------------------- | ---------------------------------------- |
| `pnpm dev`                                                       | Все приложения параллельно               |
| `pnpm dev:shell` / `dev:admin` / `dev:dashboard` / `dev:profile` | Одно приложение                          |
| `pnpm build`                                                     | Сборка всех пакетов и приложений (Turbo) |
| `pnpm build:admin`                                               | Сборка одного приложения                 |
| `pnpm test`                                                      | Все тесты (Vitest через Turbo)           |
| `pnpm lint`                                                      | Линт всех пакетов                        |

## Тесты

- `packages/utils` — юнит-тесты утилит (форматирование, валидация);
- каждый микрофронтенд — компонентный тест (Vitest + jsdom + Testing Library): рендер и ключевые элементы.

Тесты лежат рядом с кодом: `src/App.test.tsx`, `src/index.test.ts`.

## CI/CD

Пайплайн `.github/workflows/ci-cd.yml` запускается на push/PR в `main`:

```
quality (lint + test)
   ↓
build (shell + 3 remotes → единый _site)
   ↓
deploy (только main → GitHub Pages)
```

### Как собирается сайт

Shell собирается с `VITE_BASE_PATH=/<repo>/` и `VITE_REMOTE_BASE=https://<owner>.github.io/<repo>`, remotes — с `VITE_BASE_PATH=/<repo>/<app>/`. Затем все `dist` объединяются в один артефакт:

```
_site/
├── index.html          ← shell
├── 404.html            ← копия index.html (SPA-fallback)
├── assets/             ← чанки shell
├── admin/assets/       ← remoteEntry.js + чанки admin
├── dashboard/assets/
└── profile/assets/
```

Почему у remotes копируются только `assets/`, а не весь `dist`: тогда прямой заход на `/<repo>/admin/` попадает в `404.html` → загружается shell → его роутер рендерит нужный микрофронтенд. Единая точка входа и корректный refresh на любом маршруте.

### Настройка GitHub Pages (один раз, вручную — 30 секунд)

1. Запушьте репозиторий в GitHub (ветка `main`).
2. Откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**.
3. Сделайте push в `main` — пайплайн соберёт и задеплоит сайт.
4. URL появится в шаге deploy и в **Settings → Pages**:
   `https://<owner>.github.io/<repo>/`

Больше ничего настраивать не нужно: workflow сам вычисляет имя репозитория и владельца.

> ⚠️ **Почему этот шаг нельзя автоматизировать?** Создание Pages-сайта — административная
> операция репозитория, а автоматический `GITHUB_TOKEN` по дизайну не может администрировать
> репозиторий (никакие `permissions:` в workflow этого не меняют). Поэтому `enablement: true`
> в `configure-pages` всегда падает с «Resource not accessible by integration». Токен нужен
> только для этого одного действия — после включения всё работает само.

> ⚠️ **Приватный репозиторий на бесплатном аккаунте не может отдавать GitHub Pages вообще.**
> Нужен публичный репозиторий или платный план (Pro/Team/Enterprise). Ошибка при этом не
> говорит о причине напрямую.

## Частые вопросы

**Можно ли менять структуру маршрутов?**
Да — маршруты задаются в `apps/shell/src/App.tsx` и внутри каждого remote (`Routes`). Внутри remote маршруты относительные (`index`, `create`), поэтому они одинаково работают и в shell (`/admin/create`), и standalone.

**Как добавить новый микрофронтенд?**
Скопируйте любой remote, поменяйте `name` и порт в `vite.config.ts`, добавьте URL в `remotes` конфига shell, маршрут в `App.tsx` и шаг сборки/копирования в workflow.

**Как общие пакеты попадают в сборку?**
Vite компилирует их из исходников (main-поле указывает на `src/index.ts`), отдельная сборка пакетов не нужна — поэтому у них build-скрипты-заглушки.

**Почему `pnpm-workspace.yaml` содержит `allowBuilds: esbuild: true`?**
pnpm 11 по умолчанию блокирует postinstall-скрипты зависимостей. esbuild (движок Vite) ставит бинарник через postinstall — ему нужно разрешение.

**Пайплайн падает на шаге Setup Pages с «Resource not accessible by integration».**
GitHub Pages не включён в репозитории. Включите вручную: **Settings → Pages → Source: GitHub Actions**. Автоматически (`enablement: true`) это невозможно — создание Pages-сайта недоступно `GITHUB_TOKEN`. Если репозиторий приватный — на бесплатном плане Pages для него не работает вовсе (нужен публичный репозиторий или платный план).

**Windows + Git Bash: пути в env-переменных.**
Git Bash преобразует `/repo/` в `C:\Program Files\Git\repo\`. Если собираете вручную с `VITE_BASE_PATH`, используйте `MSYS_NO_PATHCONV=1`. В CI (Ubuntu) этой проблемы нет.
