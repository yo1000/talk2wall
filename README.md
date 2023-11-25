talk2wall
========================================


Install dependencies
----------------------------------------

```bash
npm install
```


Update dependencies
----------------------------------------

Check updatable dependencies.

```bash
npx -p npm-check-updates  -c "ncu"
```

Update.

```bash
npx -p npm-check-updates  -c "ncu -u"
npm install
```


Build and Preview
----------------------------------------

```bash
npm run build && npx serve public/ -p 8000
```

* http://localhost:8000/


Build with debug
----------------------------------------

```bash
npm run develop
```

* http://localhost:8000/
* http://localhost:8000/___graphql
