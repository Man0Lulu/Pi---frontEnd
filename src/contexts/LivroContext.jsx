import { createContext, useState } from "react";
import { listaLivros, reservarLivro, adicionarQuantidadeLivro, listaLivrosReservados, verificarLivrosReservados, removerLivro, removerQuantidadeLivro } from "../services/BookService";

const LivroContext = createContext({
    livros: [],
    livrosReservados: [],
    listarLivros: () => { },
    listarLivrosReservados: () => { },
    listarLivrosPesquisados: () => { },
    reservaLivro: () => { },
    adicionarQtdLivro: () => { },
    verificarReservaLivro: () => { },
    removerLivroReservado: () => { },
    removerQtdLivro: () => { },
})

export function LivroContextProvider(props) {
    const [livros, setLivros] = useState([])
    const [livrosReservados, setLivrosReservados] = useState([])

    async function listarLivros() {
        try {
            const data = await listaLivros()
            setLivros(data)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function listarLivrosReservados(userId) {
        try {
            const livrosReservadosIds = await listaLivrosReservados(userId);
            const livrosReservadosComDetalhes = []
            for (const livroId of livrosReservadosIds) {
                const livro = livros.find((livro) => livroId.livroId === livro.key)
                if (livro) {
                    livro.dataEntrega = livroId.dataEntrega
                    livro.dataReserva = livroId.dataReserva

                    livrosReservadosComDetalhes.push(livro);
                }
            }
            setLivrosReservados(livrosReservadosComDetalhes);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function listarLivrosPesquisados(pesquisa) {
        try {
            const resultadoLivrosPesquisados = livros.filter((livroPesquisado) => livroPesquisado.nome.toLowerCase().includes(pesquisa.toLowerCase()))
            return resultadoLivrosPesquisados
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function reservaLivro(livroId, userId, dataReserva, dataEntrega) {
        try {
            await reservarLivro(livroId, userId, dataReserva, dataEntrega)
            setLivrosReservados((livrosReservados) => [...livrosReservados, livroId])
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function adicionarQtdLivro(livroId) {
        const livro = livros.find((livro) => livroId === livro.key)
        return await adicionarQuantidadeLivro(livro)
    }

    async function verificarReservaLivro(livroId, userId) {
        return await verificarLivrosReservados(livroId, userId)
    }

    async function removerLivroReservado(livroId, userId) {
        await adicionarQtdLivro(livroId)
        return await removerLivro(livroId, userId)
    }
    
    async function removerQtdLivro(livroId) {
        const livroVerificado = livros.find((livro) => livroId === livro.key)
        return await removerQuantidadeLivro(livroVerificado)
    }

    const contexto = {
        livros,
        livrosReservados,
        listarLivros,
        listarLivrosPesquisados,
        listarLivrosReservados,
        reservaLivro,
        adicionarQtdLivro,
        verificarReservaLivro,
        removerLivroReservado,
        removerQtdLivro,
    }

    return (
        <LivroContext.Provider value={contexto}>
            {props.children}
        </LivroContext.Provider>
    )
}

export default LivroContext