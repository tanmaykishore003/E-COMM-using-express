import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/')
    },

    filename: (req, file, cb) => {
        let fileName = Date.now() + '-' + file.originalname;
        console.log(fileName);
        cb(null, fileName)
    }
})
export const upload = multer({ storage: storage });
