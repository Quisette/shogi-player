# shogi-player

[![npm version](https://badge.fury.io/js/shogi-player.svg)](https://badge.fury.io/js/shogi-player)
[![GitHub version](https://badge.fury.io/gh/akicho8%2Fshogi-player.svg)](https://badge.fury.io/gh/akicho8%2Fshogi-player)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bbe2f7b5-e766-4358-bea7-072be72827e0/deploy-status)](https://app.netlify.com/sites/shogi-player/deploys)

See here: [Document](https://shogi-player.netlify.app/)

## Development

Requires the Node version in `.node-version`.

```sh
npm run setup      # install dependencies (root + web_component)
npm test           # run the Jest suite
npm run dev        # docs/playground at http://localhost:4001
npm run build      # regenerate dist/ (wc + lib, production + development)
npm run build -- lib:production   # or build a single target
```

CI (`.github/workflows/ci.yml`) runs the tests and a library build on every push and pull request.

## Board size and promotion zone

The board is 9x9 with a 3-rank promotion zone by default. Both can be changed with props:

| prop                     | default | meaning                                              |
|--------------------------|---------|------------------------------------------------------|
| `sp_board_dimension`     | 9       | number of files and ranks (1..9)                     |
| `sp_board_promote_range` | 3       | ranks on the far side where pieces may promote (0..dimension) |
| `sp_board_dimension_w/h` | 9       | visible cells; capped at `sp_board_dimension`        |

```html
<shogi-player-wc sp_body="position sfen rbsgk/4p/5/P4/KGSBR b - 1" sp_board_dimension="5" sp_board_promote_range="1"></shogi-player-wc>
```

Pass an SFEN that fits the board; pieces outside it are dropped. The setting is shared by every player on the page, so players with different sizes cannot be shown side by side.
