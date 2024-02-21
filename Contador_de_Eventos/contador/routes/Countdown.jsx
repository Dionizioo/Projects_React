import Title from '../components/Title';
import Counter from '../components/Counter';

import useCountdown from '../src/hooks/useCounterdown';

import { CountdownContext } from '../src/context/CountdownContext';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

const Countdown = () => {

    const Navigate = useNavigate()
  

    // verificar onde tem dados, o evento
    const {event} = useContext(CountdownContext)

    // se não tiver dados, vai redirecionar para a pagina inicial
    if(!event){
        return <Navigate to = '/' />
    }

    // Pegando o titulo do evento
    const eventTitle = event.title
    // pegando a color do evento
    const eventColor = event.color



    // Chamando o hook useCountdown, 
  //agora vamos extrair cada dado do array que ele retorna
  const [day, hour,minute,second]= useCountdown(event.date)

  return (
    <>
    <Title title = {eventTitle} eventColor={eventColor} />
        <div className="countdown_container">
          <Counter title = "dias" number = {day} eventColor={eventColor}/>
          <Counter title = "Horas" number = {hour} eventColor={eventColor}/>
          <Counter title = "minutos" number = {minute} eventColor={eventColor}/>
          <Counter title = "segundos" number = {second} eventColor={eventColor}/>
        </div>
        <button onClick = {() => Navigate('/')}>Voltar</button>
    </>
  )
}

export default Countdown
