// objetos dos AXios, para aquisição de dados
// como isso podemos usar em qualquer lugar da aplicação, sem precisar ficar repetindo o codigo como por exemplo a url do api

import axios from "axios"

const blogFetch = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    // podemos configurar os headers aqui tambem 
    headers:{
        "Content-type": "application/json"
    }
})

export default blogFetch