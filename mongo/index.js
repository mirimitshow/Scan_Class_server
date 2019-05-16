import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.mongo_address, { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() { console.log("Mongo On"); });

let UserSchema = mongoose.Schema({ //회원
    name: { type: String }, //이름
    email: { type: String }, //이메일(아이디)
    password: { type: String }, //비밀번호
    phone: { type: String }, //폰번호
    group: [{
        token: { type: String }, //id
    }], //그룹
    cartegory: [{
        name: { type: String }, //카테고리 이름
    }], //카테고리
});

let GroupSchema = mongoose.Schema({ //회원
    token: { type: String }, // 토큰
    name: { type: String }, //이름
    members: [{
        email: { type: String }, //id
    }], //멤버
    boards: [{
        token: { type: String }, //id
    }], //멤버
    timetable: {
        id: { type: String }, //id
        url: { type: String } //url
    }, //시간표
    image: {
        id: { type: String }, //id
        url: { type: String } //url
    } // 사진
});

let BoardSchema = mongoose.Schema({ //회원
    token: { type: String }, // 토큰
    group_token: { type: String }, // 그룹토큰
    isNotice: { type: String }, // 공지냐?
    title: { type: String }, // 제목
    author: { type: String }, // 작성자
    content: { type: String }, // 내용
    date: {type: Date, default: Date.now}, //수정 날짜
    image: {
        id: { type: String }, //id
        url: { type: String } //url
    }, // 사진
});

let ScanSchema = mongoose.Schema({ //스캔 사진
    email: { type: String }, // 이메일
    cartegory: { type: String }, // 카테고리
    name: { type: String }, //이름
    id: { type: String }, //이미지 id
    url: { type: String } //이미지 url
});

require('./err')(UserSchema, GroupSchema, BoardSchema, ScanSchema);

let Users = mongoose.model("users", UserSchema);
let Groups = mongoose.model("groups", GroupSchema);
let Boards = mongoose.model("boards", BoardSchema);
let Scans = mongoose.model("scans", ScanSchema);

export { Users, Groups, Boards, Scans };

export default db;