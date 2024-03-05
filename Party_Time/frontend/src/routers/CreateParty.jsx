import React from 'react'

//importação do dabase para a tela (1)
import partyFetch from "../axios/config"
// importação do useState para salvar os dados e useEffect para fazer a requisição da api (2)
import { useState, useEffect } from "react"
//navegação entre as paginas (3)
import { useNavigate } from "react-router-dom"
//toast
import useToast from "../hook/useToast"



//css do formulario (9)
import "../routers/Form.css"


//primeiro vamos trazer os serviçoes da api(4)
const CreateParty = () => {

  //precisa de um maneira de salvar os serviços (5) 
    const[services,setServices] = useState([])

  //criando os objetos
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [image, setImage] = useState("");
    const[partyServices, setPartyServices] = useState([])

    const navigate = useNavigate();


  
  //carregando os serviços (7)
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data)
    }
    loadServices()
  },[]);

  //adicionar ou remover serviços 
  const handleServices = (e) => {
    //verificando se o checkbox foi marcado
    const checked = e.target.checked;
    //pegando o valor do checkbox
    const value = e.target.value;

    //verificando se o checkbox foi marcado dentro da api
    const filteredServices = services.filter((s) => s._id === value);

    if(checked){

      setPartyServices((services)=>[...services,filteredServices[0]])

    }else{
      setPartyServices((services)=>services.filter((s) => s._id !== value))

    }

  }

  //createParty
const createParty = async (e) => {
  e.preventDefault();


  try {
    const party = {
      title,
      author,
      description,
      budget,
      image,
      services: partyServices,
    };

    // Enviando os dados para a API
    const res = await partyFetch.post("/parties", party);

    if (res.status === 201) {
      navigate("/");
      useToast(res.data.msg);
    }
  } catch (error) {
    useToast(error.response.data.msg, "error");
  }
};


  return (
    <div className='form_page'>
      <h2>Crie sua próxima festa</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome da festa</span>
          <input
          type="text"
          placeholder='Qual o Tema da Festa?'
          required
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          />
        </label>
        <label>
          <span>Anfitrião</span>
          <input
          type="text"
          placeholder='Quem está dando a festa?'
          required
          onChange={(e)=>setAuthor(e.target.value)}
          value={author}
          />
        </label>
        <label>
          <span>Descrição</span>
          <input
          type="text"
          placeholder='Contem mais sobre a festa...'
          required
          onChange={(e)=>setDescription(e.target.value)}
          value={description} />
        </label>
        <label>
          <span>Orçamento</span>
          <input
          type="number"
          placeholder='Qual o valor do seu investimento'
          required
          onChange={(e)=>setBudget(e.target.value)}
          value={budget} />
        </label>
        <label>
          <span>Imagem</span>
          <input
          type="text"
          placeholder='Insira a URL de uma imagem'
          required
          onChange={(e)=>setImage(e.target.value)}
          value={image} />
        </label>
        <div>
          <h2>Escolha os Serviços</h2>
          <div className="services_container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="services" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="services_name">{service.name}</p>
                  <p className="services_price">R${service.price}</p>
                  <div className="checkbox_container">
                    <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)}/>
                  <p>Marque para Solicitar</p>
                </div>
              </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Criar Festa" className='btn'/>
      </form>
    </div>
  )
}


export default CreateParty