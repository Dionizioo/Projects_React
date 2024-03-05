const {Service: ServiceModel} = require('../models/Service');

const serviceController = {

    //Criação de um serviço
    create: async (req, res) => {
        try {
            // Vamos formar um objeto com propriedades que o serviço tem
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image:req.body.image,
            }
            // Vamos criar um serviço
            const response = await ServiceModel.create(service);
            // Vamos retornar o serviço criado
            res.status(201).json({response, msg: 'Serviço criado com sucesso'});
        } catch (error) {
            console.error(error);
        }
    },
    //Pegar todos os registros
    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find();

            //enviar o services no frontEnd
            res.json(services)
        } catch (error) {
            console.log(error)
            
        }

    },
    //Pegar um registro
    get : async (req, res) => {
        try {
                //pegar o id do serviço
                // id => URL === GET 
                const id = req.params.id;
                const service = await ServiceModel.findById(id);

                if(!service){
                    res.status(404).json({msg:"Serviço não encontrado"});
                    return;
                }

                //enviar o service no frontEnd
                res.json(service);
            } catch (error) {
            console.log(error);
        }
    },
    //deletar um registro
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const service = await ServiceModel.findById(id);

            if(!service){
                res.status(404).json({msg:"Serviço não encontrado"});
                return;
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id);

            res.status(200).json({msg:"Serviço deletado com sucesso", deletedService});
            
        } catch (error) {
            console.log(error);
        }
    },
    //atualizar um registro
    update: async (req, res) => {

        //achar o id
        const id = req.params.id;

        //achar o serviço
        const service = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image:req.body.image,
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(id,service)

        if(!updatedService){
            res.status(404).json({msg:"Serviço não encontrado"});
            return;
        }

        res.status(200).json({service,msg:"Serviço atualizado com sucesso"});
    }
}
module.exports = serviceController;
