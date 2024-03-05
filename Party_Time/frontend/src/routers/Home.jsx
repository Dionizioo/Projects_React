//para ter acesso a api
import partyFetch from "../axios/config"

//useState para salvar dados e useEffect para fazer a requisição da api
import { useState, useEffect } from "react"

//ccs
import "../routers/Home.css"

import { Link } from "react-router-dom"

const Home = () => {

  //precisa de um maneira de salvar as festas 
  const [parties, setParties] = useState(null);

  //carregando as festas
  useEffect(() => {

    const loadParties = async () => {
      const res = await partyFetch.get("/parties");

      console.log(res.data)

      setParties(res.data)
    }

    loadParties()

  },[])

  //caso demore para carregar a api
  if(!parties) return <h1>Loading...</h1>

  return (
    <div className="home">
      <h1>Suas Festas</h1>
      <div className="parties_container">
        {parties.lenght === 0 && <h1>Não há festas</h1>}
        {parties.map((party) =>(
          <div className="party" key={party._id}>
            <img src={party.image} alt={party.title} />
            <h3>Nome: {party.title}</h3>

            <Link to={`/party/${party._id}`} className="btn_secondary">
              Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home