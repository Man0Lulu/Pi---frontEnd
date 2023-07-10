import { urlApi } from './FirebaseConfig'

//GET Livros
export async function listaLivros() {
    let livros = []
    await fetch(urlApi + "/livros.json")
        .then((response) => response.json())
        .then((data) => {
            for (let key in data) {
                livros.push({ key, ...data[key] })
            }
        })
        .catch((error) => {
            throw Error("Erro ao listar livro ", error.message)
        })

    return livros
}

//DELETE LivroQuantidade
export async function removerQuantidadeLivro(livro) {
    livro.quantidade -= 1
    await fetch(`${urlApi}/livros/${livro.key}.json`, {
      method: 'PATCH',
      body: JSON.stringify(livro)
    })
}

//POST LivroQuantidade
export async function adicionarQuantidadeLivro(livro) {
    livro.quantidade += 1
    
    await fetch(`${urlApi}/livros/${livro.key}.json`, {
      method: 'PATCH',
      body: JSON.stringify(livro)
    })
}

//GET LivrosReservados
export async function listaLivrosReservados(userId) {
    try {
        const response = await fetch(urlApi + `livrosReservados.json?orderBy="userId"&equalTo="${userId}"`)
        const data = await response.json()
        const livrosReservados = []

        for (let key in data) {
            livrosReservados.push({ key, ...data[key] })
        }
        return livrosReservados
    } catch (error) {
        throw new Error("Erro ao listar livros reservados ", error.message)
    }
}

//GET VerificaLivrosReservados
export async function verificarLivrosReservados(livroId, userId) {
    try {
        const response = await fetch(urlApi + `livrosReservados.json?orderBy="userId"&equalTo="${userId}"`);
        const data = await response.json();
        const livrosReservados = Object.values(data);
        const livroReservado = livrosReservados.find((livro) => livro.livroId === livroId);
        return !!livroReservado;
    } catch (error) {
        throw new Error("Erro ao verificar livro ", error.message);
    }
}


//POST LivrosReservados
export async function reservarLivro(livroId, userId, dataReserva, dataEntrega) {
    const LivroReservado = {
        livroId,
        userId,
        dataReserva,
        dataEntrega,
    }
    try {
        await fetch(urlApi + "livrosReservados.json", {
            method: "POST",
            body: JSON.stringify(LivroReservado),
            headers: { "Context-Type": "application/json" },
        })
    } catch (error) {
        throw new Error("Erro ao reservar livro ", error.message)
    }
}

//DELETE LivrosReservados
export async function removerLivro(livroId, userId) {

    try {
        const livrosReservados = await listaLivrosReservados(userId)

        const livroReservado = livrosReservados.find(
            (livro) => livro.livroId === livroId
        )

        if (livroReservado) {
            const response = await fetch(`${urlApi}livrosReservados/${livroReservado.key}.json`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Erro ao remover livro")
            }
        }

    } catch (error) {
        throw new Error("Erro ao remover livro ", error.message)
    }
}