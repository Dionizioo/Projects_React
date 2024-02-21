import './App.css'

import Title from '../components/Title';
import Counter from '../components/Counter';
import { Outlet } from 'react-router-dom';


import Image from '../src/assets/img.jpg'

import { useContext } from 'react';
import { CountdownContext } from '../src/context/CountdownContext';

function App() {

  const {event} = useContext(CountdownContext)

  let evenImage = null
  if(event) evenImage = event.image



  return (
    // Imagem Dinamica por ser baseada em um arquivo importado
    <div className='App'  style={evenImage
       ? {backgroundImage: `url(${evenImage})`}
       :{backgroundImage: `url(${Image})`}
      }>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App
