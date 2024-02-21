import './Counter.css'

const Counter = ({title , number,eventColor}) => {
  return (
    <div className='counter'>
        <p className='counter_number' style={{backgroundColor:eventColor}}>{number}</p>
        <p className='counter_text ' style={{color:eventColor}}>{title}</p>
    </div>
  )
}

export default Counter