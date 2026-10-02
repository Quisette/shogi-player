# shogi-player

[![npm version](https://badge.fury.io/js/shogi-player.svg)](https://badge.fury.io/js/shogi-player)
[![GitHub version](https://badge.fury.io/gh/akicho8%2Fshogi-player.svg)](https://badge.fury.io/gh/akicho8%2Fshogi-player)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bbe2f7b5-e766-4358-bea7-072be72827e0/deploy-status)](https://app.netlify.com/sites/shogi-player/deploys)

A shogi board for web browsers, shipped as a Vue 2 component and as a Web Component (`<shogi-player-wc>`). It has three modes: **view** (replay a kifu), **play** (make moves and get the SFEN) and **edit** (set up a position). It reads SFEN, KIF and BOD.

## Quick start

```html
<script defer src="https://cdn.jsdelivr.net/npm/shogi-player@1.1.15"></script>
<shogi-player-wc sp_body="position startpos moves 7g7f 3c3d" sp_controller="true"></shogi-player-wc>
```

Framework-specific setups (React, Vue 2/3, Nuxt, Svelte, Lit, Ruby) are in the [build guide](main_doc/docs/guide/build.md).

## Documentation

All documentation lives in [`main_doc/docs/`](main_doc/docs/) and is published at **https://shogi-player.netlify.app/** (written in Japanese).

| Topic | Page |
|-------|------|
| Introduction and features | [guide/README.md](main_doc/docs/guide/README.md) |
| Usage | [guide/usage.md](main_doc/docs/guide/usage.md) |
| Modes | [view](main_doc/docs/guide/view-mode.md) · [play](main_doc/docs/guide/play-mode.md) · [edit](main_doc/docs/guide/edit-mode.md) |
| Embedding in frameworks | [guide/build.md](main_doc/docs/guide/build.md) |
| Customizing the look | [guide/customize.md](main_doc/docs/guide/customize.md) · [guide/style-editor.md](main_doc/docs/guide/style-editor.md) |
| Debugging | [guide/debug.md](main_doc/docs/guide/debug.md) |
| Props (`sp_*`) | [reference/props](main_doc/docs/reference/props/README.md) |
| CSS variables | [reference/css-variables](main_doc/docs/reference/css-variables/README.md) |
| Events | [reference/event](main_doc/docs/reference/event/README.md) |
| Imperative API (`api_*`) | [reference/api](main_doc/docs/reference/api/README.md) |
| Developing shogi-player itself | [guide/development.md](main_doc/docs/guide/development.md) |
| Credits for piece and board artwork | [guide/credit.md](main_doc/docs/guide/credit.md) |

## Board size and promotion zone

The board is 9x9 with a 3-rank promotion zone by default. Set `sp_board_dimension` (1..9) and `sp_board_promote_range` (0..dimension) to change them:

```html
<shogi-player-wc sp_body="position sfen rbsgk/4p/5/P4/KGSBR b - 1" sp_board_dimension="5" sp_board_promote_range="1"></shogi-player-wc>
```

Details and caveats are in the [props reference](main_doc/docs/reference/props/README.md#盤のサイズ).

## Development

Requires the Node version in `.node-version`.

```sh
npm run setup      # install dependencies (root + web_component)
npm test           # run the Jest suite
npm run dev        # demo/playground at http://localhost:4001
npm run build      # regenerate dist/ (wc + lib, production + development)
npm run docs:dev   # documentation site at http://localhost:4002
```

CI (`.github/workflows/ci.yml`) runs the tests and a library build on every push and pull request. See the [development guide](main_doc/docs/guide/development.md) for the repository layout, release steps and coding notes.

## License

[AGPL-3.0](LICENSE)
