import multer from 'multer';
import path from 'path';

const URL = 'images/scan/';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/' + URL);
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});

module.exports = (app, Users, Scans) => {
    app.post('/setScan', upload.single('img'), async(req, res) => {
        console.log(req.file); 
        let scan = new Scans(req.body);
        scan.id = req.file.filename;
        scan.url = URL + req.file.filename;
        await Users.findOne({email: req.body.email}, (err, rawContent)=>{
            if(err) res.status(400).json({message: "error!"});
            console.log(rawContent);
            rawContent.cartegory.unshift({ name: req.body.cartegory });
            rawContent.save(async (err)=>{
                var result = await scan.save((err)=>{
                    if(err) res.status(400).json({message: "error!"});
                    res.status(200).json(scan);
                });
            });
        });
    })
}