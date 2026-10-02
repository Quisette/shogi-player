# デモ

shogi-player には2種類のビルドがあり、このページではどちらもこのサイトの `dist/` (`npm run build` の出力) から読み込んで同じ局面を表示している

| ビルド | ファイル | 使い方 |
|--------|----------|--------|
| Web Components 版 | `dist/wc/production/shogi-player-wc.min.js` | `<shogi-player-wc>` タグを置くだけ。フレームワーク不要 |
| ライブラリ版 (UMD) | `dist/lib/production/shogi-player.umd.min.js` | Vue 2 のコンポーネント `ShogiPlayer` として登録する |

組み込み方の詳細は [各種組み込み例](/guide/build.md) を参照

## Web Components 版

```html
<script defer src="https://cdn.jsdelivr.net/npm/shogi-player@1.1.15"></script>
<shogi-player-wc sp_mode="play" sp_controller="true" sp_body="position startpos moves 7g7f 3c3d"></shogi-player-wc>
```

<iframe src="/examples/wc.html" style="width: 100%; height: 780px; border: 0"></iframe>
<LinkToExample name="wc" />

## ライブラリ版 (Vue 2)

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script src="https://cdn.jsdelivr.net/npm/shogi-player@1.1.15/dist/lib/production/shogi-player.umd.min.js"></script>
<div id="app">
  <shogi-player sp_mode="play" sp_controller sp_body="position startpos moves 7g7f 3c3d"></shogi-player>
</div>
<script>
  new Vue({ el: "#app", components: { ShogiPlayer } })
</script>
```

<iframe src="/examples/lib_umd.html" style="width: 100%; height: 780px; border: 0"></iframe>
<LinkToExample name="lib_umd" />

## 盤のサイズを変える

5x5 で成れるのは1段だけの例

```html
<shogi-player-wc
  sp_mode="play"
  sp_body="position sfen rbsgk/4p/5/P4/KGSBR b - 1"
  sp_board_dimension="5"
  sp_board_promote_range="1"
  ></shogi-player-wc>
```

<iframe src="/examples/board_dimension.html" style="width: 100%; height: 720px; border: 0"></iframe>
<LinkToExample name="board_dimension" />

::: tip
盤の寸法は同じページ内のすべての shogi-player で共通になる
:::

## プレイグラウンド

`pages/` の Nuxt アプリ (ライブラリのソースを直接使う開発用ページ) も同じサイトの [/playground/](/playground/) に置いている

* [プレイグラウンド](/playground/): 全引数を画面上で切り替えて試せる
* [スタイルエディタ](/playground/style-editor.html): 見た目を調整して CSS 変数を書き出せる
