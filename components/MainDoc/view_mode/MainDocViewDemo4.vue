<template lang="pug">
.MainDocViewDemo4.column
  b-message(type="is-info")
    | コントローラーとスライダー付き。9手目から表示。
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer.is_book_like.type_a(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="9"
    sp_controller
    sp_slider
    sp_piece_variant="paper"
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo4",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27487"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocViewDemo4
  __css_keep__: 0
</style>
