import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `모가디슈 #${i}`,
    body: '내전으로 고립된 낯선 도시, 모가디슈 지금부터 우리의 목표는 오로지 생존이다! 대한민국이 UN가입을 위해 동분서주하던 시기 1991년 소말리아의 수도 모가디슈에서는 일촉즉발의 내전이 일어난다. 통신마저 끊긴 그 곳에 고립된 대한민국 대사관의 직원과 가족들은 총알과 포탄이 빗발치는 가운데, 살아남기 위해 하루하루를 버텨낸다. 그러던 어느 날 밤, 북한 대사관의 일행들이 도움을 요청하며 문을 두드리는데… 목표는 하나, 모가디슈에서 탈출해야 한다!',
    tags: ['태그1', '태그2'],
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });

  return;
}
