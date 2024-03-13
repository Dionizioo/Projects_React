const express = require("express");

const router = express.Router();

const upload = require('../backend/config/upload');

//Importando as funções do MemoryController
const {createMemory,getMemory,getMemoryById,deleteMemory,updateMemory,toogleFavorite,addComent} = require("../backend/controllers/MemoryController");

//onde eu vou postar(caminho)
router.post("/",upload.single("image"),(req,res,next)=>{
    const image = req.file;

    if(!image){
        return res.status(400).json({msg:"Imagem não enviada"})
    }
    next();
}
,(req,res)=> createMemory(req,res)
);

//rota do getMemory
router.get("/",(req,res)=> getMemory(req,res))

//rota do getMemoryById
router.get("/:id",(req,res)=> getMemoryById(req,res))

//rota do deleteMemory
router.delete("/:id", (req, res) => deleteMemory(req, res));

//rota do updateMemory
router.patch("/:id",upload.single("image"),(req,res,next)=> updateMemory(req,res));

//rota do toogleFavorite
router.patch("/favorite/:id", (req, res) => toogleFavorite(req, res));

//rota do comentario

router.patch("/:id/comment",(req,res)=> addComent(req,res));


module.exports = router;