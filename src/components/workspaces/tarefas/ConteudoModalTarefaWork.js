import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import FileUpload from "../../genericos/Upload";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdwnGenerico from "../../genericos/DropdownGenerico";
import Cronometro from "../../genericos/cronometro";
import { UploadFile, updateTarefaTime } from "../../../service/tarefa";
import { getStorageItem, storageItem } from "../../../functions/encryptedStorageFunctions";
import UserAvatar from "../../genericos/UserAvatar";
import ListaAnexos from "../../genericos/ListaAnexos";
// tarefaSelecionada, openModalEditarHandler, openModalHandler, deletarTarefaWorkspace, sttus, setStatus
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff"
  };

const ConteudoModalTarefaWork = (props) => {

    const [selectedFileName, setSelectedFileName] = useState('');

    const handleClearAttachment = () => {
        setSelectedFileName('');
    };

    const handleFileSelected = async (file) => {
        if (file && Array.isArray(file) && file.length > 0 && file[0].name) {
            const token = await getStorageItem('token');
            setSelectedFileName(file[0]);
            console.log('file', file)
            UploadFile(props.tarefaSelecionada?._id, file[0], token).then((res)=>{
                console.log('res', res.data)
            }).catch((error)=>{
                console.log('aqui', error.content || error.message)
            })
        } else {
            setSelectedFileName('Nome do arquivo não disponível');
        }
    };

    const formatarData = (data) => {
        if (data) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Date(data).toLocaleDateString('pt-BR', options);
            return formattedDate;
        }
        return '';
    }; 
     // --- Cronometro ---
     const putTime = () => {
        updateTarefaTime(props.tarefaSelecionada?._id).then((res) => {
            console.log(res.data, "conteudo modal tarefa work");
        }).catch(error => {
            console.error(error.response, 'tem ')
        });
    }

    const data = [
        { label: 'Completo', value: 1 },
        { label: 'Em Andamento', value: 2 },
        { label: 'Não Iniciado', value: 3 },
        { label: 'Atrasado', value: 4 },
        { label: 'Aguardando Validação', value: 5 },
    ];

    const getPrioridadeTitle = (prioridade) => {
        if (prioridade === 1) {
          return "Urgente";
        }
        else if (prioridade === 2) {
          return "Alta";
        }
        else if (prioridade === 3) {
          return "Média";
        }
        else if (prioridade === 4) {
          return "Baixo";
        }
      }
      
    return (
        <View style={styles.modal}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ ...styles.iconContainer, width: '75%' }} >
              <Checkbox
                onPress={() => {
                  // Lógica para a seleção
                }}
              />
              <Text style={styles.textoCheck}>{props.tarefaSelecionada?.titulo}</Text>
            </View>
            <View style={styles.iconContainerTittle}>

              {/* ----- Opções da Tarefa ----- */}
              <View style={styles.iconContainerTittle}>

                <View style={styles.fileUpload} marginLeft={-80}>
                  <FileUpload onFileSelected={handleFileSelected} marginLeft={20} btnColor={colors.roxo} />
                </View>
                <Icon name="edit" style={styles.icons} marginLeft={10} color={'#51336b'} size={20} onPress={props.openModalEditarHandler}/>
                <Icon name="user-plus" style={styles.icons} marginLeft={10} color={'#51336b'} size={20} onPress={props.openModalHandler} />
                <Icon name="trash" style={styles.icons} marginLeft={10} color={'red'} size={20} onPress={() => props.deletarTarefaWorkspace(props.tarefaSelecionada._id)} />
              </View>

            
            </View>
          </View>

          <View style={styles.espacamento}>
            <View style={styles.iconContainer}>
              <Icon name="bars" size={20} style={styles.icon} />
              <Text>{props.tarefaSelecionada?.descricao}</Text>
            </View>
          </View>
          <View style={styles.espacamento}>
            <View style={styles.iconContainer}>
              <Icon name="clock" size={20} style={styles.icon} />
              <Text>{formatarData(props.tarefaSelecionada?.data_estimada)}</Text>
            </View>
          </View>
          <View style={styles.espacamento}>
            <View style={styles.iconContainer}>
              <Icon name="flag" size={20} style={styles.icon} />
              <Text>{getPrioridadeTitle(props.tarefaSelecionada?.prioridade)}</Text>
            </View>
          </View>
          <View style={styles.espacamento}>
            <View style={styles.iconContainer}>
              <DropdwnGenerico 
                data={data} 
                label="Status" 
                status={props.status}
                setStatus={props.setStatus}
              />
            </View>
          </View>
          <View style={styles.espacamentoTimer}>
            <View style={styles.iconContainer}>
            {props.tarefaSelecionada!==""?(
            <Cronometro
                play={props.tarefaSelecionada?.play || false}
                btnColor={colors.roxo}
                tempoInicial={props.tarefaSelecionada?.cronometro || 0}
                getTarefaTime={putTime}
              >
              </Cronometro>):<></>}
            </View>
          </View>
          <View style={styles.espacamento}>
            <View style={styles.iconContainer}>
              <Text>Membros</Text>
            </View>
          </View>
          <View style={{ ...styles.iconContainer, paddingTop: 10, flexWrap: 'wrap' }}>
            {props.tarefaSelecionada?.usuarios?.map((n) => <UserAvatar name={n.usuario?.nome || ''} />)}
          </View>
          <View style={styles.espacamento}>
            <Text style= {styles.fileNameText}>Arquivos Selecionados</Text>
            {selectedFileName?.name && <Text style={styles.textos}>{selectedFileName?.name}</Text>}
            {selectedFileName?.name && (
                <TouchableOpacity onPress={handleClearAttachment}>
                    <Icon name="times-circle" size={20} color='red' marginLeft = {10} />
                </TouchableOpacity>
            )}
          </View>
          <ListaAnexos tarefa={props.tarefaSelecionada} workspace={true}/> 
        </View>
    )
}

export default ConteudoModalTarefaWork;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    }, 
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoCheck: {
        marginRight: '50%',
    },
    iconContainerTittle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
    },
    fileUpload:{
        marginRight:'10%'
    },
    icons: {
        padding: 0,
        textAlign: 'right',
        /* borderColor: 'red',
        borderWidth: 1,
        borderStyle: "solid", */
    },
    icon: {
        marginRight: 10,
    },
    espacamento: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    espacamentoTimer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0
    },
})