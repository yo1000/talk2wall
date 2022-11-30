---
title: KeycloakでのSSOと認可コードフローの流れを確認する
path: /kc-browser-flow
date: 2022-11-30T00:00:00.000+09:00
author: yo1000
tags:
  - Tech
  - Keycloak
---

KeycloakでSSOする際に発生する認可コードフローと、取り交わされるAccessToken, RefreshToken, IDTokenが、どう返され、使われるのかを図に起こしたので貼っておく。


## 環境

- Keycloak 9.0.3


## フロー

![BrowserFlow](2022-11-30_kc-browser-flow.png)
