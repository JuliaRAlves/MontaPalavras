import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    fundo: {
        backgroundColor: '#f5f5f5',
        height: '100%',
        flex: 1
    },
    tela: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90%'
    },
    header: {
        backgroundColor: '#005df2'
    },
    entradaView: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    inputText: {
        backgroundColor: 'transparent',
        width: '70%'
    },
    inputButton: {
        justifyContent: 'center'
    },
    textView: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#344c73',
        fontSize: 20,
        marginBottom: 30
    },
    letras: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    letra: {
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: 25,
        backgroundColor: '#c5c5c5',
        textTransform: 'uppercase',
        margin: 2,
        padding: 5,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    divisor: {
        marginHorizontal: '5%',
        marginVertical: 20
    }
})