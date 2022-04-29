const multer = require("multer");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const {email} = req.body;
        const payload = email.split("@")[0];
        const dir = `./uploads/${payload}`;
        fs.stat(dir,(err,stats)=>{
            if(err) return cb(err,null);
            if(!stats.isDirectory()){
                return fs.mkdir(dir,(err)=>cb(err,dir));
            }
            return cb(null,dir);
        })
    },
    filename: (req,file,cb)=>{
        const payload = req.email.split("@")[0];
        cb(null,`${payload}-img-${Date.now()}.png`)
    }
})

const upload = multer({storage});

module.exports = {upload};