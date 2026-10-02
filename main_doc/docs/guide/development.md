# Development

How to work on shogi-player itself. For using it in your own page, see [Usage](/guide/usage.md) and [Build](/guide/build.md).

## Commands

Requires the Node version in `.node-version`. Run everything from the repository root.

| Command | What it does |
|---------|--------------|
| `npm run setup` | Install dependencies for the root and `web_component/` |
| `npm test` | Run the Jest suite in `test/` |
| `npm run dev` | Nuxt demo/playground at http://localhost:4001 (`pages/`) |
| `npm run build` | Regenerate `dist/` (Web Components and library, production and development) |
| `npm run build -- lib:production` | Build a single target (`wc`, `lib`, `wc:production`, ...) |
| `npm run docs:setup` | Install the documentation site's dependencies (`main_doc/`) |
| `npm run docs:dev` | This documentation site at http://localhost:4002 |
| `npm run docs:build` | Build the documentation site into `main_doc/docs/.vuepress/dist/` |

The `Rakefile` keeps the maintainer's shortcuts (`rake s`, `rake t`, `rake dist`, `rake d`, `rake release`), which wrap the same commands.

CI (`.github/workflows/ci.yml`) runs the tests and a library build on every push and pull request.

## Repository layout

| Path | Contents |
|------|----------|
| `components/` | The component source. `ShogiPlayer.vue` is the entry point, `models/` holds the board/SFEN/KIF logic |
| `web_component/` | vue-cli project that wraps `components/` as `<shogi-player-wc>` and as a UMD library |
| `dist/` | Built files published to npm and the CDN (`wc/` and `lib/`, each `production/` and `development/`) |
| `test/` | Jest specs |
| `pages/`, `layouts/`, `plugins/`, `nuxt.config.js` | Nuxt demo app (`npm run dev`) |
| `docs/` | **Generated** output of the Nuxt demo, served at https://akicho8.github.io/shogi-player/. Not documentation; do not edit by hand |
| `main_doc/` | This documentation site (VuePress), deployed to Netlify. Examples live in `main_doc/docs/.vuepress/public/examples/` |
| `assets/` | Piece, board and location images plus shared Sass |
| `shogi-player-*-sample/` | Minimal integrations for Nuxt, Vue 2, Vue 2 + UMD and Svelte |
| `experiment/`, `trash/` | Old prototypes, kept for reference only |

## Releasing

`rake release` runs the whole sequence: build `dist/`, `npm version patch`, rewrite every `shogi-player@x.y.z` CDN reference in the repository, `pnpm publish`, push tags, redeploy the Nuxt demo to `docs/`, and check the CDN.

The documentation site is deployed by Netlify from `main_doc/` (`main_doc/netlify.toml`).

## Coding notes

### Turns

* A turn is always handled as an offset.
* `turn_offset_min` is always 0.
* With no moves, `turn_offset_max` is 0; with one move it is 1.

### Play mode state

| Name | Type | Meaning |
|------|------|---------|
| `moves` | Array | Moves made in play mode |
| `init_sfen` | String | Position when play mode was entered |
| `init_location_key` | String | Side to move when edit mode was entered |

### Double tap to flip

Do not use `@dblclick`. Combining `@click` and `@dblclick` makes `@click` respond very slowly, so double taps are detected by our own code.

### Cell DOM structure

Never style the `td` itself based on the piece. Do not merge `td` and `.PieceTap`: the star marks would flip with the piece, and dimming the move source would dim the star too.

```
td                  no piece-dependent styling here
  .PieceTap         clickable square area
    .PieceObject    the piece; shadows go here so they ignore flipping
      .PieceTexture piece image, flipped for the north side (except portella)
      .PieceCount   count in the piece stand
```

`components/MainBoard/` holds styles that belong to `MainBoard.vue` and only live in a separate folder because they grew large. Do not move them into a shared stylesheet folder.

### Sass files (`assets/sass/`)

| File | Purpose | Note |
|------|---------|------|
| `application.sass` | CSS applied globally | |
| `bulma_init.scss` | Bulma setup | |
| `styleResources.scss` | Definitions referenced from Sass inside `*.vue` | Only `$var` and `=mixin` definitions, never `.class` rules |

Board variant styles live in `components/MainBoard/board_variant.sass`.

### Location icon images

The location icons come from [ぬれよん](https://nureyon.com/shogi-1). Downloading at 300x300 clips the edges; set stroke width 20 and enlarge the canvas to fit the object before downloading.
