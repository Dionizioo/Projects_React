const e = require('express');
const Memory = require('../models/Memory');

//para remover a imagem do servidor
const fs = require('fs');

const removeOldImage = (memory) => {
    fs.unlink(`public/${memory.src}`, (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Image removed successfully");
        }
    });
}


//Crinado as memórias
const createMemory = async (req, res) =>{
    try {
        const { title, description } = req.body;
        const src = `images/${req.file.filename}`;

        if (!title || !description) {
            return res.status(400).json({ msg: "Title and Description are required" });
        }
        
        // Crie um novo objeto com os dados da memória
        const newMemoryData = {
            title,
            src,
            description,
            favorite: false // Defina o valor padrão para o campo favorite como false
        };
        
        // Crie uma nova memória usando os dados fornecidos
        const newMemory = new Memory(newMemoryData);
        
        // Salve a memória no banco de dados
        await newMemory.save();
        
        // Retorne a memória criada como resposta
        res.json({ msg: "Memory created successfully", newMemory });
        
    } catch (error) {
        console.error("Error creating memory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//resgatando as memórias

const getMemory = async (req, res) =>{
    try {
        //pegando todas as memórias
        const memories = await Memory.find();

        res.json(memories);
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// resgatar uma memória específica
const getMemoryById = async (req,res) =>{
    try {
        const {id} = req.params;
        const memory = await Memory.findById(id);

        if(!memory){
            return res.status(404).json({msg:"Memory not found"});
        }
        res.json(memory)
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// Excluir uma memória
const deleteMemory = async (req, res) => {
    try {
        const { id } = req.params;
        const memory = await Memory.findByIdAndDelete(id); 

        if (!memory) {
            return res.status(404).json({ msg: "Memory not found" });
        }

        // Removendo a imagem do servidor
        removeOldImage(memory);

        res.json({ msg: "Memory deleted successfully" });

    } catch (error) {
        console.error("Error deleting memory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//atualizar uma memória
const updateMemory = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      let src = null;
  
      if (req.file) {
        src = `images/${req.file.filename}`;
      }
  
      const memory = await Memory.findById(req.params.id);
  
      if (!memory) {
        return res.status(404).json({ msg: "Memória não encontrada!" });
      }
  
      if (src) {
        removeOldImage(memory);
      }
  
      const updateData = {};
  
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (src) updateData.src = src;
  
      const updateMemory = await Memory.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      res.json(updateMemory);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Por favor, tente novamente" });
    }
  };


//favoritando uma memória

const toogleFavorite = async(req,res) =>{
    try {
        const { id } = req.params;
        const memory = await Memory.findById(id);

        if (!memory) {
            return res.status(404).json({ msg: "Memory not found" });
        }

        // Altere o valor do campo favorite para o oposto do valor atual
        memory.favorite = !memory.favorite;

        // Salve a memória atualizada no banco de dados
        await memory.save();

        res.json({ msg: "Adicionada aos favoritos",memory });

    } catch (error) {
        console.error("Error deleting memory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

//adcionando comentario
const addComent = async (req,res) =>{
    try {

        //pegando o nome e texto
        const {name,text} = req.body;

        //se não veio o nome do usuario ou o texto
        if(!name || !text){
            return res.status(400).json({msg:"Name and text are required"});
        }

        const comment = {name,text}

        const { id } = req.params;
        const memory = await Memory.findById(id);

        if (!memory) {
            return res.status(404).json({ msg: "Memory not found" });
        }

        // vamos usar o pust para inserir um novo comentario no final da arry
        memory.comments.push(comment);

        // Salve a memória atualizada no banco de dados
        await memory.save();

        res.json({ msg: "Comentario adicionado",memory });

    } catch (error) {
        console.error("Error deleting memory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

// Exporte as funções para serem usadas em outros arquivos
module.exports = {
    createMemory,
    getMemory,
    getMemoryById,
    deleteMemory,
    updateMemory,
    toogleFavorite,
    addComent
    
}
