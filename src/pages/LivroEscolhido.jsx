import Section from "../components/Section";
import { useParams } from "react-router-dom";
import Image from "../components/Images";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import LivroContext from "../contexts/LivroContext";
import UserContext from "../contexts/UserContext";

export default function LivroEscolhido(props) {
    const { userId } = useContext(UserContext)
    const { id } = useParams()
    const { livros, reservaLivro, verificarReservaLivro } = useContext(LivroContext)
    const navigate = useNavigate()

    const livro = livros.find((livro) => livro.key === id)
    const [usuarioJaReservou, setUsuarioJaReservou] = useState(false)

    useEffect(() => {
        if (!livro || userId === null) {
            return navigate('/Error')
        }
        const fetchReservaLivro = async () => {
            const usuarioJaReservou = await verificarReservaLivro(livro.key, userId)
            setUsuarioJaReservou(usuarioJaReservou)
        }
        fetchReservaLivro()
    }, [livro, userId, verificarReservaLivro()])

    function handleReservar(key) {
        if (usuarioJaReservou) {
            navigate('/errorreserva')
        } else {
            reservaLivro(key, userId)
            navigate('/livroreservadosucesso')
        }
    }

    return (
        <>
            <h2>Título</h2>
            <Section titulo={livro.nome} className="my-5">
                <br />
                <h2>Descrição</h2>
                <p className="my-5">{livro.descricao}</p>
                <Image book={`/${livro.caminhoImagem}`} alt={livro.nome} />
                <div>
                    <div className="bg-primary px-4 py-1 rounded">
                        <button onClick={() => handleReservar(livro.key)} className="bg-blue-400 px-4 py-1 rounded">Reservar.</button>
                    </div>
                </div>
            </Section>
        </>
    )
}
