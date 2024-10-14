import { Board } from "./models/board.js"
import { Soldier } from "./models/soldier.js"
import { Xcontainer } from "./models/xcontainer.js"

export const mod_api_functions = {
  methods: {

    api_board_dimension_set(dim, promote_range){
      // Board.dimension = dim
      // Board.danger_zone_size = promote_range
      
      // this.xcontainer.board.dimension = dim
      // this.xcontainer.board.danger_zone_size = promote_range
      // console.log(Board.dimension, Board.danger_zone_size)

    },
    // 盤面をシャッフルする
    api_board_shuffle() {
      this.xcontainer.shuffle_apply(Board.dimension)
    },

    // 盤を消してランダムに駒を配置する
    api_random_puton() {
      const soldier = Soldier.random()
      this.xcontainer.board.clear()
      this.xcontainer.board.place_on(soldier)
      return soldier
    },

    // 駒を置く
    api_place_on(soldier) {
      this.xcontainer.board.place_on(soldier)
    },

    // 盤面クリア
    api_board_clear() {
      this.xcontainer.board.clear()
    },

    // 指定手数の局面に設定
    api_board_turn_set(turn) {
      this.xcontainer_setup(turn)
    },

    // 指定手数の局面に設定(play_mode専用・音が出ない)
    api_play_mode_seek_to(turn) {
      this.play_mode_xcontainer_seek_to(turn)
    },

    // // 反転状態の設定
    // api_flip_set(flag) {
    //   this.mut_viewpoint = flag ? "white" : "black"
    // },

    // 視点を決める
    api_viewpoint_set(location_key) {
      this.mut_viewpoint = location_key
    },

    // 反転
    api_viewpoint_flip() {
      this.viewpoint_flip()
    },

    // 待った
    api_retract_a_move() {
      let turn = this.turn_offset - 2
      if (turn < 0) {
        turn = 0
      }
      this.api_board_turn_set(turn)
    },

    // 棋譜の反映
    api_sfen_or_kif_set(sfen_or_kif, options = {}) {
      this.xcontainer = new Xcontainer()
      this.xcontainer.data_source = this.data_source_by(sfen_or_kif)
      this.xcontainer.current_turn = options.turn || 0
      this.xcontainer.run()
    },

    // play モード用の変数の準備
    api_play_mode_setup() {
      this.play_mode_setup()
    },

    // 持った駒を離す
    api_lifted_piece_cancel() {
      this.lifted_piece_cancel()
    },

    // slider にフォーカスする
    api_turn_slider_focus() {
      this.turn_slider_focus()
    },

    // 操作モードでの moves.take(turn_offset) 相当を返す
    api_moves_take_turn_offset() {
      return this.moves_take_turn_offset
    },
  },
}
