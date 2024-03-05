import blogFetch from "../axios/config"

import { useState } from "react"

import { useNavigate } from "react-router-dom"

import "./NewPost.css"

const NewPost = () => {

  const navigate =  useNavigate()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  // criar a função quando o formulario for submetido
  const createPost = async (e) => {
    e.preventDefault()

    const post = {title, body,userId: 1};


    // aqui estamos utilizando o post via axios
    await blogFetch.post("/posts",{
      body:post,
    });
    // quando terminar de adionar vamos ser mandados para a pagina inicial
    navigate("/")
  };
  


  return (
    <div className='new_post'>
      <h2>Insirir novo post</h2>
      {/* para que a pagina não carregue vamos utilizar o (e) */}
      <form onSubmit={(e) => createPost(e)}>
        <div className="form_control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            placeholder='Digite o Título'
            id='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form_control">
          <label htmlFor="body">Contéudo:</label>
          <textarea
            name="body"
            id='body'
            placeholder='Digite o Contéudo'
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar Post" className='btn' />
      </form>
    </div>
  )
}

export default NewPost