#!/usr/bin/env node
// dist/ に Web Components 版とライブラリ版を生成する
//
//   npm run build            # すべて
//   npm run build -- wc      # Web Components 版のみ
//   npm run build -- lib     # ライブラリ版のみ
//   npm run build -- wc:production

const { spawnSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const root = path.resolve(__dirname, "..")
const web_component = path.join(root, "web_component")

const targets = {
  wc: {
    entry: "src/components/ShogiPlayerWc.vue",
    args: mode => ["--target", "wc", "--dest", `../dist/wc/${mode}`, "--inline-vue", "--name", "shogi-player-wc"],
  },
  lib: {
    entry: "src/components/ShogiPlayerLib.vue",
    args: mode => ["--target", "lib", "--dest", `../dist/lib/${mode}`, "--name", "ShogiPlayer", "--filename", "shogi-player"],
  },
}
const modes = ["production", "development"]

function run(command, args, options = {}) {
  console.log(`\n$ ${command} ${args.join(" ")}`)
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32", ...options })
  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

const filter = process.argv[2] || ""
const [target_filter, mode_filter] = filter.split(":")
const jobs = []
for (const target of Object.keys(targets)) {
  for (const mode of modes) {
    if ((!target_filter || target_filter === target) && (!mode_filter || mode_filter === mode)) {
      jobs.push([target, mode])
    }
  }
}
if (jobs.length === 0) {
  console.error(`unknown build target: ${filter} (use wc, lib, wc:production, ...)`)
  process.exit(1)
}

// web_component は shogi-player を "file:.." で参照しているので先に依存を入れておく
if (!fs.existsSync(path.join(web_component, "node_modules", ".bin"))) {
  run("npm", ["ci", "--no-audit", "--no-fund"], { cwd: web_component })
}

for (const [target, mode] of jobs) {
  const info = targets[target]
  run("npx", ["vue-cli-service", "build", "--mode", mode, ...info.args(mode), info.entry], {
    cwd: web_component,
    env: { ...process.env, SP_TARGET: target },
  })
}
