const multer = require ("multer")

const path = require ("path")

const storage = multer.diskStorage({
    //destino do arquivo ( req = requisição, file = arquivo, cb = callback)
    destination:  function(req,file,cb){
        cb(null,path.join(__dirname,"../public/images"))
    },
    filename: function(req,file,cb){
        //vamos fazer com data, para que não haja arquivos com o mesmo nome
        cb(null,Date.now() + path.extname(file.originalname)) // extname = extensão do arquivo( .jpg, .png, .jpeg)
    }
})

//vamos criar um filtro para que só aceite arquivos de imagem
const fileFilter  = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage,
    fileFilter,
})

//assim temos o upload pronto para ser usado em qualquer lugar

module.exports = upload