import multer from 'multer';
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});

module.exports = (app, Users, Groups) => {
    app.post('/setTimetable', upload.single('img'), async(req, res) => {
        console.log(req.file); 
        let group = await Groups.findOne({ token: req.body.token });
        console.log(group); 
        group.timetable.id = req.file.filename;
        group.timetable.url = req.file.path;
        // group.timetable = rndstring.generate(25);
        group.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.status(200).json(group);
        });
    });
}