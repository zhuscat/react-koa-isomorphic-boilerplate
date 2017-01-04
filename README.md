# react-koa-isomorphic-boilerplate

An isomorphic boilerplate for building server side rendering web app with Koa2 + React + Redux.

## Features

- React Router + Koa Router (handle url like `/api/*`)
- Webpack Hot Module Reload(HMR) when changing client side codes (in development mode)
- Server automatically restart using `nodemon` when changing server side codes (in development mode)
- Write style using `Sass` (You are welcome to use other languages like `Less`, just change the configuration)
- Using ESLint to check JavaScript codes

## Getting Started

**Installation**

```shell
git clone https://github.com/zhuscat/react-koa-isomorphic-boilerplate.git
cd react-koa-isomorphic-boilerplate

npm install
```

**Development**

```shell
npm start
```

After you start the app in development mode, feel free to change codes in `client` or `server`, you can see what will happen after you change the codes.

**production**

```shell
npm run build
```

## Reference

[react-isomorphic-boilerplate](https://github.com/chikara-chan/react-isomorphic-boilerplate)

[koa2-react-isomorphic-boilerplate](https://github.com/wssgcg1213/koa2-react-isomorphic-boilerplate)

## License

The MIT License