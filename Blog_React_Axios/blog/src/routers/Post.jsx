import blogFetch from "../axios/config"

// useState para salvar os dados do post  e useEffect para fazer a requisição para a api
import { useState,useEffect } from "react"

import { useParams } from "react-router-dom"

import "./Post.css"



const Post = () => {

    // aqui estamos pegando o id do post pelo hook useParams
    const { id } = useParams()

    const [post, setPost] = useState({})

    const getPost = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)

            const data = response.data

            setPost(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])


  return (
    <div className="post_container">
        {!post.title ? (
            <p>Carregando...</p>
        ) : (
            <div className="post">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        )}

    </div>
  )
}

export default Post