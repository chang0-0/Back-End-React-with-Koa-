import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// 비밀번호 해쉬값으로 설정
const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// password 설정
UserSchema.methods.setPassword = async function (password) {
  // hash value create
  // hash value save to hashedPassword
  const hash = await bcrypt.hash(password, 10);

  // 인스턴스 메소드를 작성할 때는 화살표 함수가 아닌 function 키워드를 사용해야 합니다.
  // 함수 내부에서 this에 접근해야 하기 때문이다.
  // 여기서 this는 문서 인스턴스를 가리킵니다. 화살표 함수를 사용하면 this는 문서 인스턴스를 가리키지 못하게 됩니다.
  this.hashedPassword = hash;
};

// 패스워드 체크
UserSchema.methods.checkPassword = async function (password) {
  // compare 비교
  const result = await bcrypt.compare(password, this.hasedPassword);
  return result; // true / false
};

// find user by username
// this of static function is refers to model
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
