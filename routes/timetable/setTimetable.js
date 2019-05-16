import multer from 'multer';
// 기타 express 코드
const upload = multer({ dest: 'tables/', limits: { fileSize: 5 * 1024 * 1024 } });

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