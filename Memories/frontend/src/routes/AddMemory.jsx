import React from 'react'
//axios
import axios from '../components/axiosConfig'
//useState para gerenciar o estado de cada memoria
import { useState } from 'react'
//css
import './AddMemory.css'
//import toast
import { toast } from 'react-toastify'
//useNavigate para redirecionar o usuário
import { useNavigate } from 'react-router-dom'

const AddMemory = () => {

  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState(null)

  const navigate = useNavigate()

  const handleSubmit =  async(event) => {
    event.preventDefault()

    
    //criar um objeto do tipo FormData
    const formData = new FormData()
    formData.append('image',image)
    formData.append('title',inputs.title)
    formData.append('description',inputs.description)

    try {
      //enviar a requisição para o backend
      const response = await axios.post('/memories',formData,{
        //sobreescever o header para que o axios envie os dados no formato multipart/form-data
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      toast.success(response.data.msg)
      //redirecionar o usuário para a página inicial
      navigate('/')
      
    } catch (error) {
      console.log(error)
      //arrumar aqui
      toast.error(error.response.data.msg)
    }
  }

  //pegar os valores dos inputs
  const handleChange = (event) => {
    //se o input for do tipo file
    if(event.target.name === 'image'){
      //pegar a imagem, pois o input file é um array
      setImage(event.target.files[0])
    }else{
      //se não for do tipo file, pegar o valor do input
      setInputs({...inputs,[event.target.name]: event.target.value})
      // {a:1}
    //{a:1,b:2}
    //{a:3}
    }
    
  }


  return (
    <div className='add_memory_page'>
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Título:</p>
          <input type="text" placeholder='Defina um titulo' name='title' onChange={handleChange}/>
        </label>
        <label>
          <p>Descrição:</p>
          <textarea type="text" placeholder='Defina um descrição' name='description' onChange={handleChange} />
        </label>
        <label>
          <p>Foto:</p>
          <input type="file"  name='image' onChange={handleChange} />
          <input type="submit" className='btn' value="Enviar"  />
        </label>
      </form>
    </div>
  )
}

export default AddMemory