#!/usr/bin/env node
// ドキュメントとデモを1つのサイトにまとめて main_doc/docs/.vuepress/dist/ に生成する
//
//   /             VuePress のドキュメント (Web Components 版とライブラリ版の dist/ を読み込む)
//   /dist/        npm run build で生成したビルド
//   /playground/  pages/ の Nuxt アプリ (プレイグラウンドとスタイルエディタ)
//
//   npm run site                # dist/ の生成から全部
//   npm run site -- --skip-build  # dist/ はそのまま使う

const { spawnSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const root = path.resolve(__dirname, "..")
const site_dir = path.join(root, "main_doc/docs/.vuepress/dist")
const skip_build = process.argv.includes("--skip-build")

function run(command, args, options = {}) {
  console.log(`\n$ ${command} ${args.join(" ")}`)
  const result = spawnSync(command, args, { stdio: "inherit", cwd: root, shell: process.platform === "win32", ...options })
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed`)
  }
}

try {
  if (!skip_build) {
    run("npm", ["run", "build"])
  }
  if (!fs.existsSync(path.join(root, "main_doc/node_modules"))) {
    run("npm", ["run", "docs:setup"])
  }
  run("npm", ["run", "docs:build"])
  run("npx", ["nuxt", "generate", "--dotenv", ".env.production"], {
    env: {
      ...process.env,
      SP_ROUTER_BASE: "/playground/",
      SP_GENERATE_DIR: path.join(site_dir, "playground"),
    },
  })
  console.log(`\nsite: ${path.relative(root, site_dir)}`)
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
