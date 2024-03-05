import blogFetch from "../axios/config"

import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"



const EditPost = () => {

    const navigate = useNavigate()

    const [ title, setTitle ] = useState("")
    const [ body, setBody ] = useState("")

    const { id } = useParams()

    const getPost = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)

            const data = response.data

            setTitle(data.title)
            setBody(data.body)
            
        } catch (error) {
            console.log(error)
        }
    }

    // Enviar os dados para a api
    const editPost = async (e) => {
        e.preventDefault()

        const post = { title, body, userId: 1 }

        // enviar um metodo put para a api
        await blogFetch.put(`/posts/${id}`, {
            body: post
        })

        navigate("/")
    }


    useEffect(() => {
        getPost()
    }, [])



  return (
    <div className='new_post'>
    <h2>Editando o novo Title</h2>
    <form onSubmit={(e) => editPost(e)}>
      <div className="form_control">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder='Digite o Título'
          id='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title || ""}
        />
      </div>
      <div className="form_control">
        <label htmlFor="body">Contéudo:</label>
        <textarea
          name="body"
          id='body'
          placeholder='Digite o Contéudo'
          onChange={(e) => setBody(e.target.value)}
        value={body || ""}
        ></textarea>
      </div>
      <input type="submit" value="Editar Post" className='btn' />
    </form>
  </div>
   
  )
}

export default EditPost