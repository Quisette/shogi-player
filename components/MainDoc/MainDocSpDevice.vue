<template lang="pug">
.MainDocSpDevice
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold sp_device 動作テスト
  .section
    .container
      .columns
        .column
          p sp_device="mouse"
          ShogiPlayer(sp_debug sp_mode="play" sp_device="mouse")
        .column
          p sp_device="touch"
          ShogiPlayer(sp_debug sp_mode="play" sp_device="touch")
</template>

<script>
export default {
  name: "MainDocSpDevice",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocSpDevice
  __css_keep__: 0
</style>
