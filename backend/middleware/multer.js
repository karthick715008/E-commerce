import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save files
    },
    filename:function(req, file,  callback){
        callback(null, file.originalname)
    }
})



const upload = multer({storage});

export default upload;