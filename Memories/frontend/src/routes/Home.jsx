import axios from '../components/axiosConfig';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getMemories = async () => {
      try {
        const response = await axios.get('/memories');
        const memoriesWithFavorite = response.data.map((memory) => ({
          ...memory,
          isFavorite: false,
        }));
        setMemories(memoriesWithFavorite);
      } catch (error) {
        console.log(error);
      }
    };
    getMemories();
  }, []);

  const removeMemory = async (id) => {
    try {
      await axios.delete(`/memories/${id}`);
      setMemories(memories.filter((m) => m._id !== id));
      toast.success('Memória removida com sucesso');
    } catch (error) {
      console.log(error);
    }
  };
  const toggleFavorite = async (id) => {
    try {
      const response = await axios.patch(`/memories/favorite/${id}`);
      // Atualiza o estado do favorito da memória
      setMemories((prevMemories) =>
        prevMemories.map((memory) =>
          memory._id === id ? { ...memory, favorite: !memory.favorite } : memory
        )
      );
      // Se a memória foi marcada como favorita, mova-a para o início da lista
      if (response.data.memory.favorite) {
        setMemories((prevMemories) => [
          response.data.memory,
          ...prevMemories.filter((memory) => memory._id !== id),
        ]);
      }
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao favoritar memória');
    }
  };


  const filteredMemories = memories.filter((memory) =>
    memory.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='home'>
      <div className='header'>
        <div>
          <h2>Explore sua Curisidade<br></br>
          <p>Bem-vindo ao site! Aqui, você poderá registrar suas memórias e compartilhar pontos interessantes com seus amigos. Neste espaço, você pode comentar sobre tudo, desde uma simples caminhada nas montanhas até uma viagem inesquecível.
          </p>
          <br></br>
            Crie sua Historia
            <br></br>
            <Link className='btns' to="/add_memory">Criar</Link></h2>
        </div>
        
         <img className='img' src={`${axios.defaults.baseURL}${memories.length > 0 ? memories[0].src : ''}`} alt={memories.length > 0 ? memories[0].title : ''} />
      </div>
      <h2>Pesquise sua Historia</h2>
      <input
        className='input'
        type='text'
        placeholder='Pesquisar'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='memories_container'>
        {filteredMemories.length > 0 ? (
          filteredMemories.map((memory) => (
            <div className={`memory ${memory.favorite ? 'favorite-memory' : ''}`} key={memory._id}>
            <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
            <p>{memory.title}</p>
            <div className='memory-buttons'>
              <Link className='btn' to={`/memories/${memory._id}`}>
                Comentar
              </Link>
              <button className='btn' onClick={() => removeMemory(memory._id)}>
                Remover
              </button>
              <button className='btn' onClick={() => toggleFavorite(memory._id)}>
                Favoritar
              </button>
            </div>
          </div>
          ))
        ) : (
          <p>Nenhuma memória encontrada</p>
        )}
      </div>
    </div>
  );
};

export default Home;
