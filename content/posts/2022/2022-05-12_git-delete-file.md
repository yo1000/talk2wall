---
title: Gitで不都合なファイルをコミットから削除する
path: /git-delete-file
created: 2022-05-12T00:00:00.000+09:00
author: yo1000
tags:
  - Tech
  - Git
  - GitHub
---

Gitのホスティングサービス移行をしていたところ、100MB超のファイルが過去コミットに含まれていたせいで、GitHubへのプッシュ時にエラーが出てしまった場合の対応についてのメモ。


## 環境

- Bitbucket (移行元)
- GitHub (移行先)
- Git 2.33.0

```
git --version
git version 2.33.0
```

## 発生した問題

ホスティングサービスを移行しようと思い、GitHubのリポジトリインポートからインポートを試みるもエラーが発生。
Web UI上で作業していても原因がわからないので、コマンドライン上で同様の操作をしてみると、以下のようなエラーが吐かれました。

```
remote: error: Trace: 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File too/large/file/path is 200.05 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
```

`too/large/file/path`が200.05MBで、GitHubで管理可能な1ファイルあたりのサイズ上限を超えているということのようです。
実際に確認してみると、移行対象のリポジトリで随分以前に、100MBを超えるファイルをうっかりコミットしてしまっていたらしいことが判明しました。

```
git log --name-only --oneline | grep 'too/large/file/path' -B 10
1234567 large file commit
...
too/large/file/path
```

これが原因で、プッシュに失敗していることはわかりましたが、ここで困りました。
このコミット、非常に古いコミットであり、複数のブランチ、複数のタグに含まれており、それらすべてからファイルを取り除いて、コミットを修正しなければならないのでした。


## 問題のファイルを削除

どうしたものかと、調べてみると、公式ドキュメントに[機密データをリポジトリから削除する](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)というものが見つかりました。

ドキュメントの主旨としては、クレデンシャル等のコミットに含めてはならないファイルを誤って含めてしまった場合の対応方法についてのようでしたが、
コミットログから都合の悪いファイルを消し去るという目的においては、今回のケースと合致しているように見えました。

使用可能なツールは2種類紹介されており、`git filter-repo`(gitコマンドの拡張)と、BFG Repo-CleanerというOSSのツールが選択できるようでした。
今回は`git filter-repo`を使ってみました。

公式ドキュメントに従い、以下の流れでファイルを削除していきます。

### ツールのインストール

Macを使用して作業したため、brewでインストールしました。

```
brew install git-filter-repo
```

### 対象ファイルの削除

ツールがインストールできたら早速削除していきます。処理自体は数秒で完了しました。

```
git filter-repo  --invert-paths --path too/large/file/path
```

### 対象ファイルが消えたことを確認

あまりに削除が早く終わってしまい、本当に消えているのか心配なので、念のため確認しておきます。

```
git log --name-only --oneline | grep 'too/large/file/path' -B 10


```

ヒットしなくなりました。どうやら本当に消えたようです。
なお先のコマンドだけで、ブランチ、タグ内の対象ファイルもすべて削除してくれるようでした。

### GitHubへプッシュ

ここまでで問題の生じていたファイルが削除されたので、いよいよプッシュです。

まずは、すべてのブランチをプッシュします。

```
git push origin --force --all
```

次に、すべてのタグをプッシュします。

```
git push origin --force --tags
```

以上で、すべての対応は完了となります。
非常に簡単に、不都合なファイルを取り除くことができました。

もしクレデンシャル等のファイルを誤ってコミットしてしまった場合には、
さらに後続の手順(GitHub Supportへ連絡する等)もあるようなので、
この限りではありませんが、コミットログから都合の悪いファイルを取り除くのみであれば、
非常に簡単に対応できることがわかりました。


## 参考

- https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository#using-git-filter-repo