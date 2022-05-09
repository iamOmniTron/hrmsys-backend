const multer = require("multer");
const fs = require("fs");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const {email} = req.body;
        const payload = email.split("@")[0];
        const dir = `./public/uploads/${payload}`;

        fs.stat(dir,(err,stats)=>{
            if(err){
                return fs.mkdir(dir,(err)=>{
                    cb(err,dir);
                });
            } 
            if(!stats.isDirectory()){
                return fs.mkdir(dir,(err)=>{
                    cb(err,dir);
                });
            }
            return cb(null,dir);
        })
    },
    filename: (req,file,cb)=>{
        const payload = req.body.email.split("@")[0];
        // create directory for employee
        const appDir = path.dirname(require.main.filename);
        let d = appDir + '/public/uploads/' + payload
        fs.mkdir(d, { recursive: true }, (err) => { if (err) throw err; });
        cb(null,`${payload}-img-${Date.now()}.${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage});

module.exports = {upload};