import { useContext, useEffect } from "react"
import LivroContext from "../contexts/LivroContext"
import UserContext from "../contexts/UserContext"
import { Link } from "react-router-dom"
import Section from "../components/Section"
import Image from "../components/Images"

export default function MinhasReservas() {
  const { userId } = useContext(UserContext)
  const { livrosReservados, listarLivrosReservados, removerLivroReservado } = useContext(LivroContext)

  useEffect(() => {
    listarLivrosReservados(userId)
  }, [userId, listarLivrosReservados])

  function handleRemover(livroId) {
    removerLivroReservado(livroId, userId)
  }

  return (
    <Section className="flex flex-col items-center p-4 mt-2">
      {livrosReservados === null || livrosReservados.length === 0 ? (
        <p className="text-gray-700 mt-28 font-roboto-bold">
          Você não possui nenhuma reserva de livros.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 mb-24">
          {livrosReservados.map((livro) => (
            <li key={livro.id} className="bg-white rounded-lg shadow flex flex-col">
              <Link to={`/livroescolhido/${livro.id}`} key={livro.id}>
                <div className="flex items-center justify-center overflow-hidden mt-6">
                  <Image book={livro.caminhoImagem} className="w-full h-auto object-cover" />
                </div>
              </Link>
              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <h2 className="flex items-center justify-center text-lg font-bold text-gray-800">
                    {livro.nome}
                  </h2>
                  <hr className="border-gray-600 my-2" />
                  <p className="text-gray-600 mt-3">{livro.descricao}</p>
                </div>
                <hr className="border-none my-2" />
                <div className="flex flex-col mt-2">
                  <p className="text-gray-600 font-bold flex items-center justify-center">
                    Data da Reserva:
                    <span className="text-gray-800 ml-2">{livro.dataReserva}</span>
                  </p>
                  <p className="text-gray-600 font-bold flex items-center justify-center">
                    Data da Entrega:
                    <span className="text-gray-800 ml-2">{livro.dataEntrega}</span>
                  </p>
                </div>
                <hr className="border-none my-2" />
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleRemover(livro.id)}
                    className="btn-remove transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 focus:outline-none text-white font-semibold py-2 px-4 rounded-full">
                    Remover da Reserva
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
    </Section>
  )
}  