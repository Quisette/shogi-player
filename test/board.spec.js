import { Board } from "@/components/models/board.js"
import { Place } from "@/components/models/place.js"
import { Piece } from "@/components/models/piece.js"
import { Soldier } from "@/components/models/soldier.js"
import { Location } from "@/components/models/location.js"
import { SfenParser } from "@/components/models/sfen_parser.js"

const soldier_at = (xy, location_key = "black") => new Soldier({
  place: Place.fetch(xy),
  piece: Piece.fetch("P"),
  location: Location.fetch(location_key),
})

describe("Board", () => {
  afterEach(() => Board.reset_config())

  it("基本", () => {
    expect(Board.dimension).toEqual(9)
    expect(Board.danger_zone_size).toEqual(3)
  })

  it("盤の寸法と成れる段数を変更できる", () => {
    expect(Board.configure({dimension: 5, danger_zone_size: 1})).toEqual(true)
    expect(Board.dimension).toEqual(5)
    expect(Board.danger_zone_size).toEqual(1)
    expect(Board.configure({dimension: 5, danger_zone_size: 1})).toEqual(false)
  })

  it("成れる段数は盤の寸法を超えない", () => {
    Board.configure({dimension: 3, danger_zone_size: 5})
    expect(Board.danger_zone_size).toEqual(3)
  })

  it("範囲外の値はエラー", () => {
    expect(() => Board.configure({dimension: 0})).toThrow()
    expect(() => Board.configure({dimension: 10})).toThrow()
    expect(() => Board.configure({danger_zone_size: -1})).toThrow()
    expect(Board.dimension).toEqual(9)
  })

  it("成れる段数が promotable_p に反映される", () => {
    Board.configure({dimension: 9, danger_zone_size: 1})
    expect(soldier_at([0, 0]).danger_zone_p).toEqual(true)
    expect(soldier_at([0, 1]).danger_zone_p).toEqual(false)
    expect(soldier_at([0, 8], "white").danger_zone_p).toEqual(true)
    expect(soldier_at([0, 7], "white").danger_zone_p).toEqual(false)
  })

  it("小さい盤でも座標と成りが正しい", () => {
    Board.configure({dimension: 5, danger_zone_size: 2})
    expect(Place.fetch([0, 0]).human_x).toEqual(5)
    expect(Place.fetch("5a").to_a).toEqual([0, 0])
    expect(Place.fetch([0, 0]).flip_all.to_a).toEqual([4, 4])
    expect(Place.xy_valid_p(4, 4)).toEqual(true)
    expect(Place.xy_valid_p(5, 0)).toEqual(false)
    expect(soldier_at([0, 1]).danger_zone_p).toEqual(true)
    expect(soldier_at([0, 2]).danger_zone_p).toEqual(false)
    expect(soldier_at([0, 3], "white").danger_zone_p).toEqual(true)
  })

  it("小さい盤の SFEN を読み書きできる", () => {
    Board.configure({dimension: 5, danger_zone_size: 1})
    const sfen = "rbsgk/4p/5/P4/KGSBR"
    const board = SfenParser.parse(`position sfen ${sfen} b - 1`).board
    expect(board.soldiers.length).toEqual(12)
    expect(board.to_sfen).toEqual(sfen)
  })

  it("盤より外にある駒は無視する", () => {
    Board.configure({dimension: 5, danger_zone_size: 1})
    const board = SfenParser.parse("position startpos").board
    expect(board.soldiers.every(e => Place.xy_valid_p(e.place.x, e.place.y))).toEqual(true)
    expect(board.to_sfen).toEqual("lnsgk/1r3/ppppp/5/5")
  })
})
