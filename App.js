import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors.js";
import temporario from "./temporario";
import ListaTarefas from "./components/ListaTarefas";
import AdicionarListaModal from "./components/AdicionarListaModal";

export default class App extends React.Component {
    state = {
        listaVisivel: false,
        lists: temporario
    };

    alterarListaModal() {
        this.setState({ listaVisivel: !this.state.listaVisivel });
    }

    renderList = list => {
        return <ListaTarefas list={list} updateList={this.updateList} />;
    };

    adicionarLista = list => {
        this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, fazer: [] }] });
    };

    updateList = list => {
        this.setState({
            lists: this.state.lists.map(item => {
                return item.id === list.id ? list : item;
            })
        });
    };

    render() {
        return (
            <View style={estilo.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.listaVisivel}
                    onRequestClose={() => this.alterarListaModal()}
                >
                    <AdicionarListaModal fecharModal={() => this.alterarListaModal()} adicionarLista={this.adicionarLista} />
                </Modal>
                <View style={{ flexDirection: "row" }}>
                    <View style={estilo.dividir} />
                    <Text style={estilo.titulo}>
                        Lista<Text style={{ fontWeight: "300", color: colors.blue }}>Tarefas</Text>
                    </Text>
                    <View style={estilo.dividir} />
                </View>

                <View style={{ marginVertical: 48 }}>
                    <TouchableOpacity style={estilo.adicionarLista} onPress={() => this.alterarListaModal()}>
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </TouchableOpacity>

                    <Text style={estilo.adicionar}>Adicionar</Text>
                </View>

                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        data={this.state.lists}
                        keyExtractor={item => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item)}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </View>
        );
    }
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    dividir: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    titulo: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64
    },
    adicionarLista: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    adicionar: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8
    }
});