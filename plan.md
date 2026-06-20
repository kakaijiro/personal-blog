# Personal Blog — 実装プラン

## Context（背景・目的）

Frontend Mentor プレミアムチャレンジ「Personal Blog」を、既存の lp-factory フロー
（Figma MCP → Vite + React + Tailwind + Supabase）で実装する。

Figma ファイル `personal-blog.fig`（✨ Designs ページ）を確認し、フロントエンド全5ページと
バックエンド（Supabase）の完全な実装プランを策定した。

---

## Figma デザイン解析結果

### ページ構成

| ページ     | ルート        | Figma フレーム                                                                        |
| ---------- | ------------- | ------------------------------------------------------------------------------------- |
| Home       | `/`           | Desktop/Tablet/Mobile - Home - Light/Dark                                             |
| Blog 一覧  | `/blog`       | Desktop/Tablet/Mobile - Blog - Light/Dark                                             |
| 記事詳細   | `/blog/:slug` | Desktop/Tablet/Mobile - Single Blog - Light/Dark                                      |
| About      | `/about`      | Desktop/Tablet/Mobile - About - Light/Dark                                            |
| Newsletter | `/newsletter` | Desktop/Tablet/Mobile - Newsletter - Light/Dark（+ Success/Error/Hover/Focus 各状態） |

### デザイントークン

**フォント: DM Sans（Google Fonts）**

| プリセット           | サイズ | ウェイト      | スタイル | 行高 | 字間   |
| -------------------- | ------ | ------------- | -------- | ---- | ------ |
| text-preset-2        | 32px   | 800 ExtraBold | -        | 1.3  | -0.5px |
| text-preset-5        | 20px   | 600 SemiBold  | -        | 1.3  | -0.5px |
| text-preset-6        | 18px   | 500 Medium    | -        | 1.5  | -0.5px |
| text-preset-7        | 18px   | 400 Regular   | -        | 1.5  | -0.2px |
| text-preset-8        | 16px   | 400 Regular   | -        | 1.3  | -0.2px |
| text-preset-8-italic | 16px   | 400 Regular   | Italic   | 1.3  | -0.2px |

**カラーパレット（Light / Dark）**

| トークン           | Light                   | Dark                    | 用途                   |
| ------------------ | ----------------------- | ----------------------- | ---------------------- |
| `--bg`             | `#fefefe` (neutral/0)   | `#1c1a19` (neutral/900) | ページ背景             |
| `--bg-secondary`   | `#fbf9f7` (neutral/100) | `#201e1d` (neutral/800) | カード・セクション背景 |
| `--border`         | `#efedeb` (neutral/200) | `#34302d` (neutral/700) | 区切り線               |
| `--text-primary`   | `#34302d` (neutral/700) | `#fefefe` (neutral/0)   | 見出しテキスト         |
| `--text-secondary` | `#4a4846` (neutral/600) | `#c0bfbf` (neutral/400) | 本文テキスト           |
| `--accent`         | `#93cefc` (blue/500)    | `#75b0de` (blue/700)    | リンク・アクセント     |

**ブレークポイント:** Mobile (< 768px) / Tablet (768px) / Desktop (1440px)

### 主要コンポーネント（Figma 確認済み）

- **Navbar** — ロゴ + ナビリンク + テーマトグル。モバイルはハンバーガーメニュー
- **ThemeToggle** — 月/太陽アイコン（Figma node: 2038:476）
- **Footer** — "Made with ❤️ and ☕️" + SNSリンク（GitHub, LinkedIn）
- **BlogEntry** — タイトル + 日付 + external-link アイコン（一覧用）
- **BlogPost** — Markdown レンダリング（コードブロック・引用・表・Callout 対応）
- **NewsletterForm** — メール入力 + バリデーション + 4状態（Normal/Hover/Error/Success）
- **SocialIcons** — Twitter/GitHub/LinkedIn/FrontendMentor（SVGアイコン）

---

## 技術スタック

| 役割      | 採用技術                              |
| --------- | ------------------------------------- |
| Framework | Vite 5 + React 18 + TypeScript        |
| Styling   | Tailwind CSS v3 + shadcn/ui           |
| Router    | React Router v6                       |
| Dark Mode | `darkMode: ["class"]` + localStorage  |
| Markdown  | react-markdown + remark-gfm           |
| Backend   | Supabase (PostgreSQL + Auth optional) |
| 開発環境  | WSL2 Ubuntu（npm run dev）            |

---

## フロントエンド実装計画

### プロジェクト構造

```
projects/personal-blog/
├── index.html                    ← DM Sans Google Fonts 読み込み
├── package.json
├── vite.config.ts                ← @ エイリアス設定
├── tailwind.config.js            ← CSS変数2層構造
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── components.json               ← shadcn/ui 設定
├── figma/
│   └── tokens.js                 ← デザイントークン記録（完了後に作成）
└── src/
    ├── main.tsx
    ├── App.tsx                   ← React Router + ThemeProvider
    ├── index.css                 ← Tailwind + CSS変数（:root/.dark）
    ├── vite-env.d.ts
    ├── lib/utils.ts              ← cn() ユーティリティ
    ├── data/
    │   └── posts.ts              ← data.json をインポートし型付き export
    ├── types/
    │   └── index.ts              ← Post, Subscriber 型定義
    ├── hooks/
    │   ├── useTheme.ts           ← ライト/ダーク切替 + localStorage
    │   └── usePosts.ts           ← (Phase 2) Supabase fetch
    ├── components/
    │   ├── ui/                   ← shadcn 自動生成（button, input, etc.）
    │   ├── Navbar.tsx            ← スティッキー + モバイルハンバーガー + テーマトグル
    │   ├── Footer.tsx
    │   ├── BlogEntry.tsx         ← 一覧用カード
    │   ├── BlogContent.tsx       ← Markdown レンダラー
    │   ├── NewsletterForm.tsx    ← バリデーション付きフォーム
    │   └── SocialIcons.tsx       ← SNS アイコン群
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── BlogPage.tsx          ← 記事一覧 + サイドバー
    │   ├── BlogDetailPage.tsx    ← 記事詳細
    │   ├── AboutPage.tsx
    │   └── NewsletterPage.tsx
    ├── assets/
    │   ├── icons/                ← Figma から取得した SNS SVG
    │   └── images/               ← プロフィール画像等
    └── admin/                    ← 管理画面（Supabase Auth 認証付き）
        ├── LoginPage.tsx
        ├── DashboardPage.tsx     ← 記事一覧・Newsletter 購読者数
        ├── PostEditorPage.tsx    ← 記事作成・編集（Markdown）
        └── components/
            └── ProtectedRoute.tsx ← 認証ガード
```

### Tailwind CSS変数設計（2層構造）

```css
/* src/index.css */
:root {
  --bg: 0 0% 100%; /* #fefefe */
  --bg-secondary: 30 33% 97%; /* #fbf9f7 */
  --border: 30 12% 93%; /* #efedeb */
  --text-primary: 22 8% 18%; /* #34302d */
  --text-secondary: 15 5% 28%; /* #4a4846 */
  --accent: 210 93% 78%; /* #93cefc */
}

.dark {
  --bg: 20 5% 10%; /* #1c1a19 */
  --bg-secondary: 20 5% 12%; /* #201e1d */
  --border: 22 8% 18%; /* #34302d */
  --text-primary: 0 0% 100%; /* #fefefe */
  --text-secondary: 0 0% 75%; /* #c0bfbf */
  --accent: 210 58% 67%; /* #75b0de */
}
```

### ページ別実装詳細

#### Home ページ

- Greeting テキスト（Figma: node 2012:1056）
- Description 本文（node 2012:1057）
- Social Icons 4つ（Twitter / GitHub / LinkedIn / FrontendMentor）
- Featured Blog List（最新5件表示、View All リンク付き）
- Divider 区切り線
- Footer

#### Blog 一覧ページ

- Blog Header（タイトル + divider）
- Blog Entry 一覧（全8件 from data.json）
- Sidebar（About の簡易紹介 + Newsletter CTA）
- レスポンシブ: Desktop は 2カラム（Blog + Sidebar）、Tablet/Mobile は 1カラム

#### 記事詳細ページ

- 記事タイトル + 日付
- Markdown コンテンツ（react-markdown + remark-gfm）
  - コードブロック（`css / `js / ```html シンタックス対応）
  - 引用（blockquote）
  - 表（table）
  - Callout（> **Warning:** / > **Tip:** / > **Information:** パターン）
- 前後の記事ナビゲーション

#### About ページ

- プロフィール説明
- Follow Section（SNS リンク群）

#### Newsletter ページ

- Email 入力フォーム
- バリデーション:
  - 空欄 → "This field is required"
  - 無効フォーマット → "Valid email required"
  - 成功 → Success メッセージ表示
- フォーム送信: Phase 1 は Supabase newsletter_subscribers テーブルへ INSERT

### Dark Mode 実装

```ts
// src/hooks/useTheme.ts
const stored = localStorage.getItem("theme");
const initial =
  stored ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
document.documentElement.classList.toggle("dark", initial === "dark");
```

### Markdown レンダリング（BlogContent.tsx）

react-markdown で Figma の BlogFormattingGuide に対応したカスタムコンポーネントを定義:

| Markdown 要素  | Tailwind スタイル                   |
| -------------- | ----------------------------------- | --- | -------------------- |
| `# h1-h6`      | text-preset-2/5                     |
| `> blockquote` | border-l-4 accent + bg-bg-secondary |
| ` ```code``` ` | bg-neutral-800 rounded font-mono    |
| `              | table                               | `   | border border-border |
| `---`          | border-t border-border              |

---

## バックエンド実装計画（Supabase）

### フェーズ分割

| フェーズ | 内容                                           |
| -------- | ---------------------------------------------- |
| Phase 1  | フロントエンドのみ。data.json でコンテンツ管理 |
| Phase 2  | Supabase 統合（DB・Newsletter・任意で認証）    |

### Supabase スキーマ（Phase 2）

#### `posts` テーブル

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content text not null,           -- Markdown 形式
  published_at timestamptz not null,
  tags text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now()
);

alter table public.posts enable row level security;
create policy "Public read" on public.posts for select using (true);
```

#### `newsletter_subscribers` テーブル

```sql
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  confirmed_at timestamptz          -- ダブルオプトイン対応（任意）
);

alter table public.newsletter_subscribers enable row level security;
-- INSERT は anon ユーザーに許可
create policy "Anon insert" on public.newsletter_subscribers
  for insert to anon with check (true);
```

#### Supabase Function（重複メール処理）

```sql
create or replace function public.subscribe_newsletter(p_email text)
returns json
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.newsletter_subscribers (email)
  values (p_email)
  on conflict (email) do nothing;
  return json_build_object('success', true);
exception when others then
  return json_build_object('success', false, 'error', sqlerrm);
end;
$$;
grant execute on function public.subscribe_newsletter(text) to anon;
```

### supabase/ ディレクトリ構造

```
supabase/
├── config.toml
└── schemas/
    ├── posts.sql
    ├── newsletter_subscribers.sql
    └── functions.sql
```

### フロントエンドからの利用方法

```ts
// Phase 2: src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// Newsletter 送信
const { error } = await supabase.rpc("subscribe_newsletter", {
  p_email: email,
});
```

---

## 実装手順（順序）

### STEP 1: プロジェクト初期セットアップ（Windows環境 / ファイル生成）

1. `projects/personal-blog/` に設定ファイル群を作成
   - package.json, vite.config.ts, tailwind.config.js, postcss.config.js
   - tsconfig.json / tsconfig.app.json / tsconfig.node.json
   - index.html（DM Sans Google Fonts）
   - components.json（shadcn/ui 設定）
2. src/ ディレクトリ・基本ファイル作成
3. Figma アセット（SNS アイコン SVG）をダウンロード → `src/assets/icons/`
4. data.json を `src/data/posts.ts` として型付きモジュール化

### STEP 2: 共通コンポーネント（WSL環境で npm run dev しながら実装）

1. `useTheme.ts` フック実装
2. `Navbar.tsx`（テーマトグル + モバイルメニュー）
3. `Footer.tsx`
4. `SocialIcons.tsx`

### STEP 3: ページ実装

1. `HomePage.tsx`（Greeting + Featured Blog List）
2. `BlogPage.tsx`（全記事一覧 + サイドバー）
3. `BlogDetailPage.tsx`（Markdown レンダリング）
4. `AboutPage.tsx`
5. `NewsletterPage.tsx`（フォームバリデーション）

### STEP 4: レスポンシブ調整

- Mobile / Tablet / Desktop 全ブレークポイントで確認
- モバイルメニュー開閉アニメーション

### STEP 5: Supabase 統合（バックエンド）

1. `supabase init` → スキーマ作成 → ローカル起動
2. data.json から posts テーブルへ seed（8件の初期データ）
3. `usePosts.ts` フック（Supabase fetch）で data.json を置き換え
4. Newsletter フォームを Supabase RPC `subscribe_newsletter` に接続
5. `supabase db push` → リモートデプロイ

### STEP 6: 管理画面（`/admin`）

1. Supabase Auth 設定（Email/Password または Magic Link）
2. `ProtectedRoute.tsx` で未ログイン時に `/admin/login` へリダイレクト
3. ダッシュボード: 記事一覧 + Newsletter 購読者数
4. 記事エディタ: Markdown エディタ（シンプルな `<textarea>`）+ Preview
5. RLS ポリシー: posts INSERT/UPDATE/DELETE は認証ユーザーのみに制限

---

## 確定事項（ユーザー確認済み）

| 項目       | 決定内容                                                                |
| ---------- | ----------------------------------------------------------------------- |
| データ管理 | Phase 1: data.json 静的 import → Phase 2: Supabase posts テーブルへ移行 |
| Newsletter | Supabase DB への保存のみ（実際のメール送信は今回スコープ外）            |
| 管理画面   | `/admin` ルートに簡易管理画面を追加（Supabase Auth 認証付き）           |

---

## 検証方法

### フロントエンド

```bash
# WSL2 で実行
cd /mnt/c/Users/jirok/OneDrive/playground/lp-factory/projects/personal-blog
npm install && npm run dev
# → http://localhost:5173 で確認
```

確認項目:

- [x] 全5ページのルーティング動作
- [x] ライト/ダーク切替（localStorage 永続化）
- [x] モバイルハンバーガーメニュー開閉
- [x] Newsletter フォーム: 空欄エラー / 無効メールエラー / 成功メッセージ
- [x] Markdown レンダリング（コードブロック・表・引用・Callout）
- [x] 全ブレークポイント（Mobile 375px / Tablet 768px / Desktop 1440px）でレイアウト確認

### バックエンド（Phase 2）

```bash
supabase start
supabase db reset
# → http://localhost:54323 (Supabase Studio) で DB 確認
```

---

## 参考ファイル

| ファイル                                                       | 参照目的                                    |
| -------------------------------------------------------------- | ------------------------------------------- |
| `skills/vite/SKILL.md`                                         | Vite プロジェクト構造・CSS変数2層構造       |
| `_supabase/CLAUDE.md`                                          | Supabase セットアップ手順・スキーマパターン |
| `projects/_template/`                                          | プロジェクトテンプレート                    |
| `.references/personal-blog-starter-set/starter-code/data.json` | ブログ記事データ（8件）                     |
| Figma: `✨ Designs` ページ                                     | デザイン参照（figma-desktop MCP 経由）      |
