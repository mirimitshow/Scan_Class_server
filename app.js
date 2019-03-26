import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import session from 'express-session';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

app.use(express.session({
    key: config.key, // 세션키
    secret: config.secret, // 비밀키
    cookie: {
        maxAge: 1000 * 60 * 60 * 2 // 쿠키 유효기간 2시간
    }
}));

//module setting
import { Users, Groups, Boards } from './mongo';


// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
    info: { // API informations (required)
        title: 'Scanus', // Title (required)
        version: '1.0.0', // Version (required)
        description: "This is an Api server for MIRIM IT SHOW entry 'Scanus'. You can find out more about Scanus at https://github.com/mirimitshow.", // Description (optional)
    }
}

// Options for the swagger docs
var options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: ['./routes*.js', './parameters.yaml'],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //Swagger UI 추가


//서버 실행
const PORT = config.PORT || 9000;
app.listen(PORT, function() {
    console.log('server running in ' + PORT);
});

//라우팅
require('./routes/auth/auth')(app, Users);
require('./routes/group/setGroup')(app, Users, Groups);
// require('./routes/index')(app);