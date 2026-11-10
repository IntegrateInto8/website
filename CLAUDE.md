# CLAUDE.md（website：会社のホームページ）

共通のルールは `~/.claude/CLAUDE.md`（`dotfiles` リポジトリ）にある。ここには、このリポジトリのことだけを書く。

このリポジトリは公開する（GitHub Pages）。会社名・事業内容など会社の情報は公開してよい（2026-11-06 オーナー）。
ただし、社員の名前・生年月日・給料、応募者の情報、取引先の情報、給与の基準（社外秘）は書かない。

ビルド・リント・テストのコマンドはない。HTML・CSS・JavaScript をそのまま公開する。

## 構成

- `index.html`: トップ（事業内容・強み・会社概要・お問い合わせ）
- `recruit.html`: 求人と応募フォーム
- `privacy.html`: 個人情報の取り扱い
- `assets/style.css`: 見た目（全ページ共通。スマホは幅760px以下）
- 上の帯: 左上の三本線で左から一覧（ページへのリンク）が出る、言語はプルダウン。従業員専用ページと自動販売機オンラインの帯は company の `StaffHeader.html` で同じ見た目にしている（直すときは両方そろえる）
- `assets/i18n.js`: 言語の切り替え（日本語・English・မြန်မာ）。HTML には日本語を書き、`data-i18n="キー"` の要素を選んだ言語の文に置き換える。訳は `I18N` に足す。固有名詞（会社名など）は訳さない
- `assets/config.js`: 応募フォームの送り先（`APPLY_URL`）と、従業員専用ページの URL（`STAFF_URL`）
- `assets/form.js`: 応募フォームを送る。郵便番号から市区町村を自動で入れる（yubinbango-data。https://yubinbango.github.io/yubinbango-data/ の公開データを、郵便番号の頭3けたごとに読む。JSON として読むだけでプログラムとしては動かさない）

## つながる仕組み（company リポジトリ。非公開）

- 応募フォームの送り先: `company/recruit-form/`（Apps Script。応募はオーナーのスプレッドシートにだけ保存し、メールで知らせる）
- 従業員専用ページ: `company/timecard/`（Firebase。https://staff-timecard-8181e.web.app/ 。メールアドレスとパスワードで入る。2026-11-11 に、合言葉と名前・生年月日で入る `company/pay-standards/` から切り替えた）

## 見た目を確かめる

`file:///workspaces/website/index.html?lang=ja`（`lang` は `ja`・`en`・`my`）をブラウザで開く。

## 公開

- GitHub Pages（`main` ブランチのいちばん上）。住所: https://www.shimojoukoumuten-01.com/（`CNAME` ファイルで設定。DNS は Squarespace の CNAME `www` → `shimojo-company.github.io`。https://shimojo-company.github.io/website/ はここへ転送される。2026-11-08 に会社の GitHub アカウント `shimojo-company` へ移した。Enforce HTTPS は有効）
- www なしの住所（A レコード）は設定していない（2026-11-07）
- 2026-11-07 本番として公開した（`assets/config.js` の `TEST: false`、noindex を外した）。テスト版に戻すときは `TEST: true` にし、各ページに `<meta name="robots" content="noindex, nofollow">` を入れる
- 変更は `main` から作業ブランチを切り、プルリクエストでマージする（マージすると数分でページに反映される）

## 仮の内容

- 電話・メールは、オーナーの指示で載せていない（2026-11-06）
- 求人の勤務地・給与・待遇は仮（2026-11-06 オーナーが「仮で作成」と指示）。決まったら直す
- 写真・ロゴは、あとでオーナーが用意する。それまでは骨組みの絵（SVG）
