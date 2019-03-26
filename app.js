import express from 'express';
import bodyParser from 'body-parser';
import config from './config';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));


//module setting
import { Users, Groups, Boards } from './mongo';

//서버 실행
const PORT = config.PORT || 9000;
app.listen(PORT, function() {
    console.log('server running in ' + PORT);
});

// require('./routes/auth/auth')(app, Users);
// require('./routes/index')(app);