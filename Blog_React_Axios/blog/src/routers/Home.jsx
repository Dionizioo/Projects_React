// import axios from "axios" antes era esse import, mas como foi criado o arquivo config.js, agora é só importar o blogFetch
import blogFetch from "../axios/config"

import { useState,useEffect } from "react"

import {Link} from "react-router-dom"

import "../routers/Home.css"

const Home = () => {

  // resgatar os dados

  const [posts, setPosts] = useState([])


  // resgatar os dados da api
  const getPosts = async () => {
    
    // caso tenha erro, por causa de usar api
    try{
      // const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const response = await blogFetch.get("/posts");

      
      const data = response.data;

      // agora vamos parar para o post oque estamos recebendo da api
      setPosts(data)

    } catch (error) {
      console.log(error)
    }

  }
  // precisa fazer a useEffect para chamar a função getPosts
  useEffect(() => {
    getPosts()
  },[]) 
  // colocando um arry vazio, ele executa uma vez


  return (
    <div className="home">
      <h1>Ultimos Post</h1>
      {posts.length === 0 ? <p>Carregando...</p> : (
        posts.map((post) =>(
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {/* <h2>{post.id}</h2> */}
            {/* aqui vamos mandar para cada post unico para pagina dele pelo post.id usando o router */}
            <Link to={`/post/${post.id}`} className="btn">Ler mais</Link>

          </div>
        ))
      )}
    </div>
  )
}

export default Home