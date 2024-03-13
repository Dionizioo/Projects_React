import axios from "../components/axiosConfig";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Memory.css";

const Memory = () => {
  const { id } = useParams();

  // Definindo os estados para armazenar os dados da memória e os comentários
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);

  // Estados para armazenar o nome e o texto do novo comentário
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // UseEffect para carregar os dados da memória e os comentários quando o componente for montado
  useEffect(() => {
    const getMemory = async () => {
      try {
        const res = await axios.get(`/memories/${id}`);
        // Atualizando o estado da memória com os dados recebidos do servidor
        setMemory(res.data);
        // Atualizando o estado dos comentários com os comentários recebidos do servidor
        setComments(res.data.comments);
      } catch (error) {
        console.error("Erro ao carregar memória:", error);
        // Exibindo uma mensagem de erro caso ocorra um problema ao carregar a memória
        toast.error("Erro ao carregar memória");
        console.error(error);
      }
    };

    getMemory();
  }, [id]); // Adicionando id como uma dependência para que o useEffect seja acionado sempre que id mudar

  // Função para lidar com o envio de um novo comentário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Criando um objeto com o nome e o texto do comentário
      const comment = { name, text };
      // Enviando uma requisição PATCH para adicionar o comentário à memória
      const res = await axios.patch(`/memories/${memory._id}/comment/`, comment);
      // Atualizando o estado dos comentários com o novo comentário
      const lastComment = res.data.memory.comments.pop();
      setComments((comments) => [...comments, lastComment]);
      // Limpando os campos de nome e texto do comentário após o envio bem-sucedido
      setName("");
      setText("");
      // Exibindo uma mensagem de sucesso
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      // Exibindo uma mensagem de erro caso ocorra um problema ao adicionar o comentário
      toast.error(error.response.data.msg);
    }
  };

  // Renderização condicional enquanto os dados estão sendo carregados
  if (!memory) return <p>Carregando...</p>;
  // Verificando se memory.comments está definido para evitar erros
  if (!memory.comments) return null;

  // Renderização do componente quando os dados foram carregados
  return (
    <div className="memory-page">
      <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
      <h2>{memory.title}</h2>
      <p>{memory.description}</p>
      <div className="comment-form">
        <h3>Envie seu comentário:</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Seu nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <textarea
              type="text"
              placeholder="Seu comentário"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </label>
          <input className="btn" type="submit" value="Enviar" />
        </form>
      </div>
      <div className="comments-container">
        <h3>Comentários ({comments.length})</h3>
        {/* Renderizando os comentários */}
        {comments.length === 0 && <p>Não há comentários</p>}
        {comments.length > 0 &&
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p className="comment-name">{comment.name}</p>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Memory;
