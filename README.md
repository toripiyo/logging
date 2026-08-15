# Logging Tool

日ごとの作業時間と活動内容を記録し、集計するためのローカル Web アプリケーションです。

## 必要なもの

- Node.js 20 以上
- npm
- Docker Desktop（Docker Compose を含むもの）

MongoDB は Docker Compose でコンテナとして起動します。アプリケーションからは `mongodb://localhost/logging` に接続します。

MongoDB では `logging` データベースと `record` コレクションを使用します。データベースとコレクションは、最初にデータを保存した際に自動で作成されます。データは Docker の名前付きボリューム `mongodb_data` に保存されるため、コンテナを停止・再作成しても保持されます。

## セットアップ

リポジトリのルートディレクトリで依存パッケージをインストールします。

```bash
npm ci
```

このアプリはテンプレートエンジン名として旧パッケージの `jade` を指定しています。`Cannot find module 'jade'` と表示される環境では、互換用パッケージを追加してください。

```bash
npm install --no-save jade
```

## ローカルでの起動

1. Docker Desktop を起動してから、MongoDB コンテナをバックグラウンドで起動します。

   ```bash
   docker compose up -d mongodb
   ```

   起動状態は次のコマンドで確認できます。`mongodb` の状態が `healthy` になれば準備完了です。

   ```bash
   docker compose ps
   ```

2. アプリケーションを起動します。

   ```bash
   npm start
   ```

3. ブラウザで以下を開きます。

   <http://localhost:3000/logging>

停止するには、アプリケーションを起動したターミナルで `Ctrl+C` を押します。

MongoDB コンテナも停止する場合は、次のコマンドを実行します。

```bash
docker compose down
```

保存した MongoDB のデータも削除して初期状態に戻す場合に限り、`docker compose down -v` を実行してください。

## ポートの変更

標準ではポート `3000` を使用します。別のポートで起動する場合は `PORT` 環境変数を指定します。

```bash
PORT=4000 npm start
```

この場合は <http://localhost:4000/logging> を開いてください。

## トラブルシューティング

- MongoDB への接続エラーが出る場合は、Docker Desktop が起動していることと、`docker compose ps` で `mongodb` が `healthy` になっていることを確認してください。
- ポート `27017` が使用中の場合は、ローカルにインストールした MongoDB など、同じポートを使用しているプロセスを停止してからコンテナを起動してください。
- `EADDRINUSE` が出る場合は、ポート `3000` を使用しているプロセスを停止するか、`PORT` 環境変数で別のポートを指定してください。
- `Cannot find module 'jade'` が出る場合は、セットアップに記載した `npm install --no-save jade` を実行してください。
