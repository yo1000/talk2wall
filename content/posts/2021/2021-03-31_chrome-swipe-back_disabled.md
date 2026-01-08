---
title: Google Chrome のスワイプによる戻るを無効化する
path: /chrome-swipe-back-disabled
created: 2021-03-31T00:00:00.000+09:00
author: yo1000
tags:
  - Tech
  - CSS
---

Google Chromeを使っていたらいつからか左右スワイプでHistoryBack/Forwardされるようになっていたのだけれど、個人的にはスワイプでページ移動したくなかったので無効化したいなと思い、方法を調べたもの。

## 環境要件

- Google Chrome バージョン: 89.0.4389.90（Official Build） （64 ビット）


## 無効化

ネットで軽く検索してみると、`chrome://flags/#overscroll-history-navigation` から設定の変更が可能であると紹介しているページが多数見つかります。ところが、現在のGoogleChromeからはこのフラグが削除されており、同様の方法では無効化できません。

どうやら現在のGoogleChromeではこのスワイプ動作を、CSS の Overscrill Behavior という、ウィンドウ領域外にスクロールを行った場合の挙動に吸収させているようで、その関係かどうかまでは定かではありませんが、フラグで挙動を変更できるようなものではなくなってしまったようです。

- https://developers.google.com/web/updates/2017/11/overscroll-behavior
- https://drafts.csswg.org/css-overscroll/

つまり、この挙動を無効化するには、Chrome で表示するページに CSS を当てれば良い、ということです。ページにカスタム CSS を適用するようなアドオンはいくつかありますが、今回は具体的な例を1つ取って手順を紹介してみます。

### 手順

無効化に必要な手順は以下のとおりです。

1. chrome ウェブストアの拡張機能から、[User JavaScript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld) をブラウザに追加する
2. User JavaScript and CSS メニューから [+ Add new] ボタンをクリックして、CSS の適用ルールを追加する
    1. 設定内の URL に、`*` を入力する
    2. 設定内の CSS に、`* { overscroll-behavior-x: none !important; }` を入力する
    3. [Save] ボタンをクリックして保存する
    4. ページをリロードするかブラウザを再起動する

このような流れでスワイプ動作が無効化されます。

ただし、この設定ではスワイプ動作をすべて無効化してしまうので、ブラウザにスワイプアクションを追加したいといった稀有な開発を行っている場合には、この設定を見直す必要がある点にご注意を。


## 参考

- https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld
- https://developers.google.com/web/updates/2017/11/overscroll-behavior
- https://drafts.csswg.org/css-overscroll/
