# Next-js-notion-blog

## 概要

Next.js と記事の管理に Notion を使用したブログです。

## 使い方

### プロジェクトのクローン

```
git clone git@github.com:jaganoer-works/next.js-notion-blog.git
```

### 環境変数の設定

`.env.local`ファイルを作成

```
touch .env.local
```

`.env.local`ファイルに以下の環境変数を設定

```
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=yout_notion_database_id
REVALIDATE_TIME=10　# データの再取得間隔（秒）
```

### Notion データベースの作成

以下の構成で Notion のデータベースを作成する。

参考
https://wholesale-mall-59c.notion.site/8325b684cd784b76a0fa0b7f8547f5e3?v=450643058b4648b1856cbad68a1e4f21

| 列名       | Name     | Tags           | Date | Description | Slug     | Published        |
| ---------- | -------- | -------------- | ---- | ----------- | -------- | ---------------- |
| プロパティ | タイトル | マルチセレクト | 日付 | テキスト    | テキスト | チェックボックス |

### インテグレーションの設定

Notion のインテグレーションを作成し、トークンを取得する。
https://www.notion.so/my-integrations

取得したトークンは`.env.local`ファイルの NOTION_TOKEN の値として設定する。

### データベースページとインテグレーションの紐づけ

データベースのページを開く

↓

右上の「･･･」を選択

↓

コネクトの追加から、先ほど作成したインテグレーションを選択

### データベースの ID の取得

データベースのページを開く

↓

ページの URL の末尾の ID をコピーする。

下記のアドレスの場合、`8325b684cd784b76a0fa0b7f8547f5e3`がデータベースの ID になる。

https://www.notion.so/8325b684cd784b76a0fa0b7f8547f5e3?v=450643058b4648b1856cbad68a1e4f21

↓

`.env.local`ファイルの NOTION_DATABASE_ID の値として設定する。

### npm パッケージのインストール

```
npm install
```

### ローカルでの起動

```
npm run dev
```

### 下記のアドレスにアクセス

http://localhost:3000
