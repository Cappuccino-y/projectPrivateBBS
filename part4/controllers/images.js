const imagesRouter = require("express").Router()
const jwt = require('jsonwebtoken')


const multer = require('multer');
const path = require('path');
const os = require('os');
const userHomeDirectory = os.homedir();
const fs = require('fs');
let username;

// 设置 multer 的存储方式为磁盘存储方式
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const token = req.token;
        const decodedToken = jwt.verify(token, process.env.SECRET);
        username = decodedToken.username;
        const dir = path.join(userHomeDirectory, 'images', username);

        // 如果目录不存在，创建目录
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage, limits: {
        fileSize: 5 * 1024 * 1024, // 50 MB
    },
});

imagesRouter.post('/', upload.single('file'), async (request, response) => {
    const file = request.file;
    if (!file) {
        return response.status(400).json({error: 'No file uploaded'});
    }
    // 返回文件的访问路径（你可能需要根据你的设置来修改这个路径）
    const url = 'https://www.mistysakura.top/' + path.join('images', username, file.originalname);
    response.json({success: true, imageUrl: url});
});


module.exports = imagesRouter
