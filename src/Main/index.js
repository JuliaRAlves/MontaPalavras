/*
    O funcionamento do aplicativo ocorre da seguinte maneira:

    - Primeiro a entrada é tratada para que os acentos sejam excluídos
      e as letras maiúsculas se tornem minúsculas;
    - Depois há uma verificação da quantidade de letras da entrada e
      apenas as palavras do banco que forem do mesmo tamanho ou
      menores serão consideradas;
    - A partir dessas palavras selecionadas, há a verificação da letra
      inicial de cada uma delas para excluir quaisquer palavras que
      não comecem com letras disponíveis na entrada;
    - Em seguida é feita a mesma verificação porém com a letra final
      de cada palavra restante da etapa anterior;
    - Depois verifica-se se é possível formar cada uma das palavras
      restantes com as letras disponíveis, excluindo todas as palavras
      impossíveis de serem formadas;
    - O passo seguinte consiste no cálculo da pontuação de cada uma das
      palavras possíveis para que seja escolhida a palavra de maior
      pontuação;
    - Caso haja mais de uma palavra com a mesma pontuação, verifica-se
      qual dessas palavras é a menor para que seja escolhida;
    - Por fim, as letras usadas na palavra são excluídas da entrada
      para serem exibidas.
*/

import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Appbar, TextInput, Button, Divider } from 'react-native-paper'

import styles from './styles'

export default function App() {
    const [entrada, setEntrada] = useState('')
    const [ok, setOk] = useState(0)
    const bancoDePalavras = [
        "Abacaxi", "Manada", "mandar", "porta", "mesa", "Dado", "Mangas", "Já", "coisas", "radiografia",
        "matemática", "Drogas", "prédios", "implementação", "computador", "balão", "Xícara", "Tédio",
        "faixa", "Livro", "deixar", "superior", "Profissão", "Reunião", "Prédios", "Montanha",
        "Botânica", "Banheiro", "Caixas", "Xingamento", "Infestação", "Cupim", "Premiada", "empanada",
        "Ratos", "Ruído", "Antecedente", "Empresa", "Emissário", "Folga", "Fratura", "Goiaba",
        "Gratuito", "Hídrico", "Homem", "Jantar", "Jogos", "Montagem", "Manual", "Nuvem", "Neve",
        "Operação", "Ontem", "Pato", "Pé", "viagem", "Queijo", "Quarto", "Quintal", "Solto", "rota",
        "Selva", "Tatuagem", "Tigre", "Uva", "Último", "Vitupério", "Voltagem", "Zangado", "Zombaria",
        "Dor"
    ]
    const qtdBanco = bancoDePalavras.length

    var palavrasPossiveis, palavraFinal, resto, pontosFinal
    const [palavra, setPalavra] = useState([])
    const [sobra, setSobra] = useState([])
    const [pontos, setPontos] = useState(0)

    function verificaTamanho() {
        let i

        for (i=0; i<qtdBanco; i++) {
            if (bancoDePalavras[i].length <= entrada.length) {
                palavrasPossiveis.push(bancoDePalavras[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toLowerCase())
            }
        }
    }

    function verificaInicial() {
        let palavrasPossiveisAux = [], i, j

        for (i=0; i<palavrasPossiveis.length; i++) {
            for (j=0; j<entrada.length; j++) {
                if (palavrasPossiveis[i][0] === entrada[j]){
                    palavrasPossiveisAux.push(palavrasPossiveis[i])
                    break
                }
            }
        }

        palavrasPossiveis = [...palavrasPossiveisAux]
    }

    function verificaFinal() {
        let i, j, palavrasPossiveisAux = []

        for (i=0; i<palavrasPossiveis.length; i++) {
            for (j=0; j<entrada.length; j++) {
                if (palavrasPossiveis[i][palavrasPossiveis[i].length-1] === entrada[j]){
                    palavrasPossiveisAux.push(palavrasPossiveis[i])
                    break
                }
            }
        }
        
        palavrasPossiveis = [...palavrasPossiveisAux]
    }

    function verificarPalavras() {
        let i, j
  
        for (i=0; i<palavrasPossiveis.length; i++) {
            let entradaCopia = [...entrada], aux = 0, palavra = [...palavrasPossiveis[i]]
            
            for (j=0; j<entradaCopia.length; j++) {
                let letraIndex = palavra.indexOf(entradaCopia[j])
                if (letraIndex != -1) {
                    entradaCopia.splice(j, 1)
                    palavra.splice(letraIndex, 1)
                    j--
                    aux++
                }
            }
            
            if (palavra.length > 0) {
                palavrasPossiveis.splice(i, 1)
                i--
            }
        }
    }

    function calcularPontos(pontos) {
        let i, j

        for (i=0; i<palavrasPossiveis.length; i++) {
            let soma = 0

            for (j=0; j<palavrasPossiveis[i].length; j++) {
                switch(palavrasPossiveis[i][j]) {
                    case 'e':
                    case 'a':
                    case 'i':
                    case 'o':
                    case 'n':
                    case 'r':
                    case 't':
                    case 'l':
                    case 's':
                    case 'u':
                        soma += 1
                        break
                    case 'w':
                    case 'd':
                    case 'g':
                        soma += 2
                        break
                    case 'b':
                    case 'c':
                    case 'm':
                    case 'p':
                        soma += 3
                        break
                    case 'f':
                    case 'h':
                    case 'v':
                        soma += 4
                        break
                    case 'j':
                    case 'x':
                        soma += 8
                        break
                    case 'q':
                    case 'z':
                        soma += 10
                        break
                }
            }
            pontos.push(soma)
        }
    }

    function calcularMaior(pontos) {
        let i, maior = pontos[0]

        for (i=1; i<pontos.length; i++) {
            if (pontos[i] > maior) {
                maior = pontos[i]
            }
        }

        return maior
    }

    function compararMenor() {
        let i, menorIndex = 0

        for (i=1; i<palavrasPossiveis.length; i++) {
            if (palavrasPossiveis[i].length < palavrasPossiveis[menorIndex].length) {
                menorIndex = i
            }
        }
        
        return menorIndex
    }

    function escolherPalavra() {
        let pontos = [], maiorPontuacao, i, menorPalavra

        calcularPontos(pontos)
        maiorPontuacao = calcularMaior(pontos)
        pontosFinal = maiorPontuacao

        for (i=0; i<pontos.length; i++) {
            if (pontos[i] < maiorPontuacao) {
                palavrasPossiveis.splice(i, 1)
                pontos.splice(i, 1)
                i--
            }
        }

        if (palavrasPossiveis.length > 1) {
            // setPalavraFinal(palavrasPossiveis[compararMenor()])
            palavraFinal = palavrasPossiveis[compararMenor()]
            palavraFinal.split('')
        } else if (palavrasPossiveis.length == 1) {
            // setPalavraFinal(palavrasPossiveis[0])
            palavraFinal = palavrasPossiveis[0]
            palavraFinal.split('')
        }

        
    }

    function guardarResto() {
        let i, entradaCopia = [...entrada]
        
        for (i=0; i<palavraFinal.length; i++) {
            let letraIndex = entradaCopia.indexOf(palavraFinal[i])
            entradaCopia.splice(letraIndex, 1)
        }
       
        resto = [...entradaCopia]
    }

    function mostrarResultado() {
        if (entrada != ''){
            palavrasPossiveis = []
            palavraFinal = []
            resto = []
            pontosFinal = 0

            verificaTamanho()
            verificaInicial()
            verificaFinal()
            verificarPalavras()
            escolherPalavra()
            guardarResto()
            
            setPalavra(Array.from(palavraFinal))
            setSobra(Array.from(resto))
            setPontos(pontosFinal)

            setOk(1)
        }
    }

    return(
        <SafeAreaView style={styles.fundo}>
            <View style={styles.tela}>
                <Appbar.Header style={styles.header}>
                    <Appbar.Content
                        title="Monta Palavras"
                    />
                </Appbar.Header>

                {ok ?
                    <View style={styles.textView}>
                        <Text style={styles.text}>Palavra de {pontos} {pontos==1 ? 'ponto' : 'pontos'}</Text>

                        <View style={styles.letras}>
                            {palavra.map((letra, index) =>
                                <Text style={styles.letra} key={index}>{letra}</Text>
                            )}
                        </View>

                        <Divider
                            style={styles.divisor}
                         />

                        <Text style={styles.text}>Sobraram:</Text>

                        <View style={styles.letras}>
                            {sobra.map((letra, index) =>
                                <Text style={styles.letra} key={index}>{letra}</Text>
                            )}
                        </View>
                    </View>
                :
                    <View style={styles.textView}>
                        <Text style={styles.text}>Digite as letras disponíveis nesta jogada</Text>
                    </View>
                }

                <View style={styles.entradaView}>
                    <TextInput
                        placeholder="Digite aqui"
                        onChangeText={text => setEntrada(text.normalize('NFD').replace(/([\u0300-\u036f]|[\u0020])/g, '').toLowerCase())}
                        style={styles.inputText}
                        theme={{colors: {primary: '#005df2', underlineColor: 'transparent'}}}
                    />

                    <Button
                        mode='contained'
                        onPress={() => mostrarResultado()}
                        color='#005df2'
                        labelStyle={styles.inputButton}
                    >
                        OK
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}