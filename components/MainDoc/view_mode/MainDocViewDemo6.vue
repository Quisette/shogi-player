<template lang="pug">
.MainDocViewDemo6.column
  b-message(type="is-info")
    | SVG駒を使用時は巨大化しても滲まない
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer(
    sp_piece_variant="nureyon"
    sp_controller
    sp_slider
    :sp_turn="-1"
    :sp_body="kifu_book_info.sp_body"
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo6",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27484"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocViewDemo6
  --sp_board_color: hsla(0, 0%, 0%, 0.15)
</style>
