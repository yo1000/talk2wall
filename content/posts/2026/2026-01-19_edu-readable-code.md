---
title: ［研修アイデア］リーダブルコード
path: /edu-readable-code
created: 2026-01-19T00:00:00.000+09:00
author: yo1000
tags:
  - education
  - refactoring
---


書籍「リーダブルコード」を読んだうえで、リファクタリングを体験します。


テーマ
--------------------------------------------------------------------------------

あなたはプログラミングを勉強中の新入社員です。
先輩からプログラミング練習のためにじゃんけんゲームの作成課題が出されました。

課題は、次のようなものでした。

- 雛形として提供されたJankenクラスをもとにじゃんけんを実装します
- プレイヤーが勝つか負けるまでゲームは続きます
- プロンプト例を再現します

プロンプト例

```
1=Rock, 2=Paper, 3=Scissors... [1/2/3]: 2

Chose by You: 2=Paper
Chose by COM: 2=Paper
1=Rock, 2=Paper, 3=Scissors... [1/2/3]: 1

Chose by You: 1=Rock
Chose by COM: 1=Rock
1=Rock, 2=Paper, 3=Scissors... [1/2/3]: 1

Chose by You: 1=Rock
Chose by COM: 3=Scissors

You win!
```

```
1=Rock, 2=Paper, 3=Scissors... [1/2/3]: 1

Chose by You: 1=Rock
Chose by COM: 2=Paper

You lose.
```

あなたは課題に取り組み、なんとか動作するものを完成させました。
ところが、ソースコードの出来はひどいもので、リファクタリングするように指示されました。

https://github.com/yo1000/unreadable-code-janken

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;

public class Janken {
    private final InputStream in;
    private final PrintStream out;

    public Janken(InputStream in, PrintStream out) {
        this.in = in;
        this.out = out;
    }

    public void play() {
        String s="-1";
        long i=-1;
        while (s.equals(""+i)) {
            s="";
            out.print("1=Rock, 2=Paper, 3=Scissors... [1/2/3]: ");
            try {
                char c;
                while (!("1".equals(s) || "2".equals(s) || "3".equals(s))) {
                    s = "";
                    while ((c = (char) in.read()) != '\n'&& c!='\0') {
                        s = ""+c;
                    }
                    ;
                }

                out.println();
                out.println("Chose by You: " + ("1".equals(s) ? "1=Rock" : "2".equals(s) ? "2=Paper" : "3=Scissors"));
//            String c = s.next();
//            System.out.println(c);

                i = (System.currentTimeMillis()) % 3+1;

                out.print("Chose by COM:");
                out.println("1".equals(""+i) ? " 1=Rock" : "2".equals(""+i)? " 2=Paper":" 3=Scissors");

//        System.out.println("[" +s+"]");
//        System.out.println("["+i+"]");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
//        System.out.println("Shoot!");
//        Scanner s = new Scanner(System.in);
//        s.nextLine();

        }
        out.println();
        if((Integer.parseInt(s) - Integer.parseInt(""+i)+3)%3 ==1){
            out.println("You win!");
        }else out.println("You lose.");

}
}
```


リファクタリング要件
--------------------------------------------------------------------------------

リファクタリングするにあたり、以下の条件に従います。

- Jankenクラスのplayメソッドをリファクタリングすること
- じゃんけんゲームの要件を引き続き満たすこと
- 付属のテストコードがパスできること

また、リファクタリング演習の成果物として以下を作成してください。

- リファクタリング後の実装
- リファクタリング前の実装における問題点の一覧


取組みにあたっての留意事項
--------------------------------------------------------------------------------

- 書籍「リーダブルコード」を必ず最後まで読んでから取り組んでください
- プログラミングを目的としているので、AIを使用した実装は禁止します
- 既存実装を読み取ったうえで、良い実装について自身で考えることを目的としているので、AIを使用したレビューは禁止します
  - AIにレビューを依頼してしまうと、自ら問題点を発見できないため
  - AIが親切すぎて、ヒントではなく答えまで提示してしまい、学習機会を奪われてしまうため
