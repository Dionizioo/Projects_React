import blogFetch from "../axios/config"

// useState para salvar os dados do post  e useEffect para fazer a requisição para a api
import { useState,useEffect } from "react"

import { Link } from "react-router-dom"

import "./Gerenciar.css"



const Gerenciar = () => {

    // resgatar os dados

  const [posts, setPosts] = useState([])


  // resgatar os dados da api
  const getPosts = async () => {
    
    // caso tenha erro, por causa de usar api
    try{
      const response = await blogFetch.get("/posts");

      
      const data = response.data;

      // agora vamos parar para o post oque estamos recebendo da api
      setPosts(data)

    } catch (error) {
      console.log(error)
    }
  }


    // Função de deletar post
    const deletePost = async (id) => {

        await blogFetch.delete(`/posts/${id}`)

        // excluir o registro da tela
        const filteredPosts = posts.filter((post) => post.id !== id)

        setPosts(filteredPosts)
    }


    // precisa fazer a useEffect para chamar a função getPosts
    useEffect(() => {
      getPosts()
    },[])

  return (
    <div className="admin">
        <h1>Gerenciar Post</h1>
        {posts.length === 0 ? 
        <p>Carregando</p> : 
        (
            posts.map((post) =>(
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <div className="actions">
                        <Link className="btn edit_btn" to={`/posts/edit/${post.id}`}>Editar</Link>
                        <button className="btn delete_btn" onClick={()=> deletePost(post.id)}>Excluir</button>
                    </div>
                </div>
            ))
        )
        }
    </div>
  )
}

export default Gerenciar