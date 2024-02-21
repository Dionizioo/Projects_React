import { useState,useContext } from 'react'

import './Home.css'

// import context
import { CountdownContext } from '../src/context/CountdownContext'

//hook
import { useNavigate } from 'react-router-dom'

const Home = () => {


// Pegandos os dados do formulario
const [title,setTitle] = useState('')
const [date,setDate] = useState('')
const [image,setImage] = useState('')
const [color,setColor] = useState('')

// Função para enviar os dados do formulario
const {setEvent} = useContext(CountdownContext)

// Redirecionar as paginas
const navigate = useNavigate()


const handleSubmit = (e) => {
    e.preventDefault()

    const eventObject = {
        title,
        date,
        image,
        color
    }
    // salvar o evento no localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || []
    localStorage.setItem('events',JSON.stringify([...savedEvents,eventObject]));

    setEvent(eventObject)
    // quando for criador com sucesso, vai direcionar a pagina para countdown
    navigate('/countdown')
}
const handleEventListClick = () => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    if (savedEvents.length === 0) {
      // Exibir alerta se não houver nenhum evento
      alert('Não há nenhum evento salvo.');
    } else {
      navigate('/event-list');
    }
}

return (
<div className='home'>
    <h2>Monte a sua contagem</h2>
    <form className='countdown_form' onSubmit={handleSubmit}>
        <label>
            <span>Titulo: </span>
            <input
                type="text"
                name="title"
                placeholder='Digite o titulo do evento'
                onChange={(e)=> setTitle(e.target.value)}
                // Obrigatoria preencher o campo
                required
                />
        </label>
        <label>
            <span>Data do Evento: </span>
            <input
                type="date"
                name="date" 
                onChange={(e)=>setDate(e.target.value)}
                required
                />
        </label>
        <label>
            <span>Imagem: </span>
            <input
                type="text"
                name="title"
                placeholder='Insira a URL da imagem'
                onChange={(e)=>setImage(e.target.value)}
            />
        </label>
        <label>
            <span>Cor do tema: </span>
            <input
                type="color"
                name="color" 
                onChange={(e)=>setColor(e.target.value)}
            />
        </label>
        <input
            type="submit"
            value="Enviar"/>
    </form>
    {/* botão para outra pagina */}
    <button onClick={handleEventListClick}>Lista de Eventos</button>
</div>
)
}

export default Home