<template lang="pug">
.HelloWorld.is-flex.is-justify-content-center
  .ShogiPlayerContainer
    //- ShogiPlayerWc(sp_mode="play")

    ShogiPlayerWc(
      sp_layout="horizontal"
      sp_controller
      sp_mode="view"
      sp_slider
      sp_turn="0"
      sp-pass-props=`{ sp_board_dimension_w: 5, sp_board_dimension_h: 5, sp_board_dimension: 5, sp_board_promote_range: 3,
  sp_pass_style: {
    "--sp_star_size": 0,
  },
  sp_mode: "play",
}`
      
      sp_body="position sfen 5/5/5/1R4/5 w - 1 moves 4d4c+ "
      )
    ShogiPlayerWc(sp_mode="play")
    
    
</template>

<script>
import ShogiPlayerWc from "./ShogiPlayerWc.vue"
import JSON5 from 'json5'
const moveExampleProps = {
  "sp_board_dimension_w": 5,
  "sp_board_dimension_h": 5,
  "sp_board_dimension": 5,
  "sp_location_click_behavior": "nop",
  "sp_pass_style": {
    "--sp_star_size": 0,
    "--sp_location_mark_active_size" : 0,
    "--sp_location_mark_inactive_size" : 0
  },
  "sp_mode": "play",
};
// sp_body="position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 7a6b 7g7f 5c5d 2g2f 5a4b 2f2e 4b3b 2e2d 2c2d 2h2d 6b5c 2d2f P*2c 3i4h 8c8d 7i7h 8d8e 8h7g 4a4b 5g5f 6a5b 6g6f 7c7d 7g6h 5c6d 7h6g 5b5c 6i7h 9c9d 9g9f 5c4d 6f6e 6d7c 4h5g 8b6b 8i7g 6b8b 5g6f 1c1d 1g1f 9d9e 9f9e 8e8f 8g8f 9a9e P*9g 9e9g 9i9g P*9f 7g8e 9f9g+ 8e7c+ 8a7c P*9d 8b9b S*8c 9b9a 2f2h P*8g 6h4f 5d5e 6f5e 4d4e 4f5g 7c6e 5g8d N*3e L*2g 3e2g+ 2h2g 8g8h+ 7h6h 9g8g 5e6f 8h7h 6g7h 8g7h 6h7h L*6d P*6g 4e5f P*5h P*5g 2g2f L*5c 6f6e 6d6e 5i6h 5g5h+ 4i5h P*5g 5h4h S*8i N*7i P*8g 7h8g S*7h N*6f 9a8a 9d9c+ 7h8g+ 7i8g 8a8c 9c8c G*7h 6h5i S*5h"

export default {
  name: "HelloWorld",
  components: {
    ShogiPlayerWc,
  },
  props: {
    msg: String,
  },
  data: {
    foo: JSON5.stringify(moveExampleProps)
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

.ShogiPlayerContainer
  +mobile
    width: 100%
  +tablet
    width: 50vmin
</style>
