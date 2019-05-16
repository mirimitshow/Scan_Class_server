import rndstring from 'randomstring'
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

module.exports = (app, Boards) => {
    app.post('/setBoard', upload.single('img'), async(req, res) => {
            let board = new Boards(req.body);
            console.log(req.file);
            board.token = rndstring.generate(25);
            board.image.id = req.file.filename;
            board.image.url = req.file.path;
            try {
                var result = await board.save();
            } catch (e) {
                if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
                if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
                if (e instanceof paramsError) return res.status(400).json({ message: e.message });
            }
            res.status(200).json(board);
        })
        .post('/aaBoards', async(req, res) => {
            var result = await Boards.find()
            res.status(200).json(result)
        })
        .post('/delBoards', async(req, res) => {
            Boards.remove({}, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.end('success');
                }
            });
        })
}