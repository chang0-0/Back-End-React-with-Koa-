require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';
import createFakeData from './createFakeData';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    //createFakeData();
  })

  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// Koa애플리케이션은 미들웨어의 배열로 구성되어 있습니다. 미들웨어의 구조는 (ctx, next) => {}의 구조로 이루어져 있습니다.
// app.use 함수는 미들웨어 함수를 애플리케이션에 등록합니다.
// ctx는 Context라는 값이고, 두 번째 파라미터는 next입니다.
// next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수입니다. 미들웨어를 등록하고 next 함수를 호출하지 않으면, 그다음 미들웨어를 처리하지 않습니다.

// 라우터 설정
router.use('/api', api.routes()); //api 라우터 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// router.get('/about/:name', (ctx) => {
//   const { name } = ctx.params;
//   // name의 존재 유무에 따라 다른 결과 출력
//   ctx.body = name ? `${name}의 소개` : '소개';
// });

// router.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   //id의 존재 유무에 따라 다른 결과 출력
//   ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
// });

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
