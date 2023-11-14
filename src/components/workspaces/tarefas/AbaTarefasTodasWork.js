import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, Checkbox, IconButton, Text, Menu, Divider, Provider, Modal, Chip } from 'react-native-paper';
import { Linking } from 'react-native';
import { getStorageItem, storageItem } from "../../../functions/encryptedStorageFunctions";
import { addUserToTarefa, deleteTarefa, getTarefaById, getTarefas, getTarefasWorkspacePorStatus, updateTarefaTime } from '../../../service/tarefa';
import { TextInput } from 'react-native-paper';

import Toast from 'react-native-toast-message';
import DataPicker from '../../genericos/dataPicker';
import PrioridadeTarefaWork from './PrioridadeTarefasWork';
import { editarStatusTarefaWork, editarTarefaWork } from '../../../service/workspace';

import { useIsFocused } from "@react-navigation/native";
import ModalGenerico from '../../genericos/ModalGenerico';
import ConteudoModalTarefaWork from './ConteudoModalTarefaWork';
import CardTarefa from '../../genericos/cardTarefa';

// --- Cores do Sistema ---
const colors = {
  verde: "#346c68",
  azul: "#4974a5",
  roxo: "#51336b",
  branco: "#ffffff"
};

const AbaTarefasTodasWorkspace = ({ _id, workspaceUsuarios, statusFiltro }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [tarefaStatus, setTarefaStatus] = useState({});
  const [status,setStatus] = useState(3)
  const isFocused = useIsFocused();

  // ----- Timer -----
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  // --- Modal Visualizar Tarefa Workspace ---
  const [tarefaSelecionada, setTarefaSelecionado] = useState("")
  const toggleModal = (_id) => {
    getTarefaById(_id).then((res) => {
      setModalVisible(!isModalVisible);
      setTarefaSelecionado(res.data)
      setStatus(res.data.status)
    })
  };

  const closeModal = () => {
    setModalVisible(false);
    editarStatusTarefa()
    buscarTarefasWorkspace();
    setTarefaSelecionado("")
  };

  // --- Modal Editar Tarefa Workspace ---
  const [isModalEditarTarefaVisible, setModalEditarTarefaVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const openModalEditarHandler = () => {
    setEditarNome(tarefaSelecionada.nome);
    setEditarDescricao(tarefaSelecionada.descricao);
    setEditarDataEstimada(new Date(tarefaSelecionada.data_estimada));
    setEditarPrioridade(tarefaSelecionada.prioridade)
    setModalEditarTarefaVisible(true);
  }

  const closeModalEditarHandler = () => {
    setModalEditarTarefaVisible(false);
  }

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  // --- Modal Usuários ---
  const [isModalUserVisible, setModalUserVisible] = useState(false);
  const openModalHandler = () => {
    setModalUserVisible(true);
  };

  const closeModalHandler = () => {
    setModalUserVisible(false);
    setUsuariosSelecionado([])
    setUsuariosBusca([])
  };

  // --- Prioridades Tarefa Workspace ---
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

  // --- Status das Tarefas ---
  const data = [
    { label: 'Completo', value: 1 },
    { label: 'Em Andamento', value: 2 },
    { label: 'Não Iniciado', value: 3 },
    { label: 'Atrasado', value: 4 },
    { label: 'Aguardando Validação', value: 5 },
  ];
  const statusLabel = {
    1: 'Completo',
    2: 'Em Andamento',
    3: 'Não Iniciado',
    4: 'Atrasado',
    5: 'Aguardando Validação'
  }

  // --- Busca Tarefas Workspace ---
  const buscarTarefasWorkspace = () => {
    if (statusFiltro) {
      getTarefasWorkspacePorStatus(_id, statusFiltro).then((res) => {
        setTarefas(res.data);
      }).catch(error => {
        console.error('Erro', error)
      })
    }
    else{
      getTarefas(_id).then((res) => {
        setTarefas(res.data);
      }).catch(error => {
        console.error('Erro', error)
      })

    }
  }

  // --- Editar Tarefas Worspace ---
  const [editarNome, setEditarNome] = useState("");
  const [editarDescricao, setEditarDescricao] = useState("");
  const [editarDataEstimada, setEditarDataEstimada] = useState(new Date()); // Inicialize com a data atual
  const [editarPrioridade, setEditarPrioridade] = useState("");

  const editarTarefaWorkspace = () => {
    const obj = {
      titulo: editarNome || tarefaSelecionada?.titulo,
      descricao: editarDescricao,
      data_estimada: editarDataEstimada,
      prioridade: editarPrioridade
    };
    editarTarefaWork(tarefaSelecionada._id,obj) 
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Tarefa editada com sucesso!',
        });
        closeModalEditarHandler();
        closeModal()
        buscarTarefasWorkspace();
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Ocorreu algum problema...',
        });
        console.log('Erro', error)
      });
  }

  // --- Deletar Tarefas Workspace ---
  const deletarTarefaWorkspace = (id) => {
    deleteTarefa(id).then(res => {
      Toast.show({
        type: 'success',
        text1: 'Tarefa excluida com sucesso!',
      });
      buscarTarefasWorkspace()
      setModalVisible(false);
    }).catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu algum problema...',
      });
      console.error('Erro', error.response);
      console.log(id);
    })
  }

// --- Alterar Status da Tarefa ---
const editarStatusTarefa = async() => {
  const token = await getStorageItem('token');
  const obj = {
    status: status
  }
  console.log(_id, 'AQuiiii');
  editarStatusTarefaWork(_id,tarefaSelecionada._id, obj, token).then(res =>{
  }).catch(error => {
    console.log(error);
    Toast.show({
        type: 'error',
        text1: 'Ocorreu algum problema...',
    })
  })

}
// --- UseEffect Status ---


  useEffect(() => {
    buscarTarefasWorkspace();
  }, [isFocused])

  // --- Adicionar Usuário a uma Tarefa ---
  const adicionarUsuario = (usuario) => {
    if (!usuariosSelecionado.some((u) => u._id === usuario._id)) {
      setUsuariosSelecionado([...usuariosSelecionado, usuario]);
    }
  };

  // --- Adicionar Todos Usuários a uma Tarefa ---
  const adicionarTodosUsuariosATarefa = async (id) => {
    const token = await getStorageItem('token');
    const usuariosIds = usuariosSelecionado.map((usuario) => usuario['_id']);
    addUserToTarefa(id, usuariosSelecionado).then((res) => {
      setModalUserVisible(false)
      setUsuariosSelecionado([])
      setUsuariosBusca([])
      buscarTarefasWorkspace()
    }).catch((error) => {
      console.error(error.response)
    });
    setUsuariosSelecionado([]);
  };

  // --- Remover Usuário de uma Tarefa  ---
  const removerUsuario = (user) => {
    const novaLista = usuariosSelecionado.filter(u => u._id != user._id)
    setUsuariosSelecionado(novaLista)
  }

  // --- Busca de Usuários ---  
  const [userQuery, setUserQuery] = useState('')
  const [usuariosBusca, setUsuariosBusca] = useState([])
  const [usuariosSelecionado, setUsuariosSelecionado] = useState([])
  const buscaUsuario = async () => {
    const busca = workspaceUsuarios.filter(u => {
      return u.usuario.nome.toLowerCase().includes(userQuery.toLowerCase())
    })
    setUsuariosBusca(busca)
  }

  // --- Cronometro ---
  const putTime = () => {
    updateTarefaTime(tarefaSelecionada._id).then((res) => {
      console.log(res.data, "UPDATEEEEEEEEEEEEEEEEE");
    }).catch(error => {
      console.error(error.response, 'tem ')
    });
  }

  // --- DatePicker Tarefas Workspace --- 
  const formatarData = (data) => {
    if (data) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedDate = new Date(data).toLocaleDateString('pt-BR', options);
      return formattedDate;
    }
    return '';
  };

  // --- Use Effects --- 
  useEffect(() => {
    buscaUsuario()
  }, [userQuery])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUserQuery(nomeUsuario)
    }, 500)
  }, [nomeUsuario])

  const atualizarStatusTarefa = async (tarefaId, novoStatus) => {
    try {
      // Faça uma solicitação para a rota do backend para atualizar o status da tarefa.
      const token = await getStorageItem('token');
      const response = await editarStatusTarefaWork(_id, tarefaId, { status: novoStatus }, token)
      setTarefaStatus((prevStatus) => ({
        ...prevStatus,
        [tarefaId]: !prevStatus[tarefaId],
      }));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Você não tem permissão !!!',
      });
      console.error('Erro ao atualizar o status da tarefa', error);
    }
  }
  const [selectedFileName, setSelectedFileName] = useState('');
  const handleFileSelected = (file) => {
      if (file && Array.isArray(file) && file.length > 0 && file[0].name) {
          console.log('Nome do arquivo:', file[0].name);
          setSelectedFileName(file[0].name);
      } else {
          setSelectedFileName('Nome do arquivo não disponível');
      }
  };

  const handleClearAttachment = () => {
      setSelectedFileName('');
  };


  return (
    <>
      {/* ----- Card de Tarefas Workspace ----- */}
      <ScrollView style={{marginBottom: 70, paddingTop: '5%',}}>
        {tarefas.map((tarefa) => (
          <>
          <CardTarefa
          tarefa={tarefa}
          checkboxDisabled={tarefaStatus[tarefa._id] || tarefa.status === 1}
          checkboxStatus={tarefaStatus[tarefa._id] || tarefa.status === 1 ? 'checked' : 'unchecked'}
          onCheckboxChange={() => {
            atualizarStatusTarefa(tarefa._id, 1);
          }}
          subtitle={`Data Conclusão: ${formatarData(tarefa.data_estimada)}\nPrioridade: ${getPrioridadeTitle(tarefa.prioridade)}\nStatus: ${statusLabel[tarefa.status]}`}
          onCardPress={() => { toggleModal(tarefa._id) }}
          />
         
          </>
        ))}
      </ScrollView>

      {/* ----- Modal Visualizar Tarefa Workspace ----- */}
      <ModalGenerico isModalVisible={isModalVisible} closeModal={closeModal} altura={400}>
        
        <ConteudoModalTarefaWork 
          tarefaSelecionada={tarefaSelecionada}
          openModalEditarHandler={openModalEditarHandler}
          openModalHandler={openModalHandler}
          deletarTarefaWorkspace={deletarTarefaWorkspace}
          status={status}
          setStatus={setStatus}workspace
        />
                              <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://drive.google.com/file/d/167yvj_uzs6kFV0r_cXDGS3D7GnLKAAGc/view')}>
  Google
</Text>
      </ModalGenerico>

      {/* ----- Modal Editar Tarefa ----- */}
        <ModalGenerico isModalVisible={isModalEditarTarefaVisible} closeModal={closeModalEditarHandler} altura={400}>
          <View style={styles.modal}>
            <Text style={styles.textoEditarTarefaWorkspace}>Editar Tarefa</Text>
              <TextInput
                  style={styles.usuario}
                  mode='outlined'
                  // textColor="#545F71"
                  value={editarNome}
                  label={isInputFocused ? "Titulo" : ""}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChangeText={(e) => setEditarNome(e)}
              />
              <TextInput
                  style={styles.usuario}
                  mode='outlined'
                  // textColor="#545F71"
                  value={editarDescricao}
                  label={isInputFocused ? "Descrição" : ""}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChangeText={(e) => setEditarDescricao(e)}
              />
              <View style={styles.dataPickerContainer}>
              <DataPicker
                  selectedDate={editarDataEstimada}
                  onSelectDate={(e) => setEditarDataEstimada(e)}
              />
              </View>
              <View style={styles.prioridadeContainer}>
              <PrioridadeTarefaWork 
                prioridade={editarPrioridade}
                setPrioridade={setEditarPrioridade}/>
              </View>
              <View style={{ marginTop: 30 }}>
                  <TouchableOpacity onPress={editarTarefaWorkspace} style={styles.botaoCriar}>
                      <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </ModalGenerico>

      {/* ----- Modal Adicionar Usuário a Tarefa ----- */}   
      <ModalGenerico isModalVisible={isModalUserVisible} closeModal={closeModalHandler} altura={400} >
        <View style={styles.modal}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Adicionar membros à tarefa</Text>
          <TextInput
            style={styles.modalText}
            multiline={true}
            placeholder='Digite o nome do usuário'
            value={nomeUsuario}
            onChangeText={(e) => setNomeUsuario(e)}
            onSubmitEditing={adicionarUsuario} // Chama a função quando pressionar "Enter"
          />
          <FlatList
            data={usuariosBusca}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ marginTop: 10 }} onPress={() => adicionarUsuario(item.usuario)}>
                <Text style={{ fontSize: 18 }}>{item.usuario.nome}</Text>
              </TouchableOpacity>
            )}
          />
          {usuariosSelecionado.map((user) => (
            <Chip closeIcon={'window-close'} onClose={() => removerUsuario(user)} style={{ marginTop: 5 }}>
              {user.nome}
            </Chip>
          ))}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
              <TouchableOpacity onPress={() => adicionarTodosUsuariosATarefa(tarefaSelecionada?._id)}  style={styles.botaoCriar}>
                  <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModalHandler}  style={styles.botaoCriar}>
                  <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ModalGenerico>
    </>
  );
};

const styles = StyleSheet.create({
  fileUpload:{
    marginRight:'10%'
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalUserContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
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
  textoCheck: {
    marginRight: '50%',
  },
  iconContainerTittle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    padding: 0,
    textAlign: 'right',
    /* borderColor: 'red',
    borderWidth: 1,
    borderStyle: "solid", */
  },
  modalText: {
    backgroundColor: "white",
    marginVertical: 20,
    height: 50,
    fontSize: 18
  },
  filtros: {
    // Estilização para seus filtros, se necessário
  },
 
 
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 0,
  },
  title: {
    flexDirection: 'row',


  },
  iconCheck: {
    marginLeft: 16,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  btn: {
    borderRadius: 50,
    padding: 5,
    fontSize: 15
  },
  modalAddUserContainer: {
    width: '96%',
    height: 470,
    borderStyle: 'solid',
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#FFF'
  },
  // Modal Editar Tarefa Workspace
  modalEditarContainer: {
    backgroundColor: 'white',
    marginTop: 125,
    padding: 20, // tamanho modal
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: colors.cinza, // Cor da borda modal
    borderWidth: 1, // Largura da borda modal
  },
  textoEditarTarefaWorkspace: {
    textAlign: 'center',
    color: colors.roxo,
    fontSize: 18,
    fontWeight: 'bold'
  },
  botaoCriar: {
    width: 150,
    borderRadius: 20,
    backgroundColor: colors.roxo,
    alignSelf: 'center', // Centraliza o botão horizontalmente
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  usuario: {
    marginTop: 20,
    alignSelf: 'center',
    width: 325,
    backgroundColor: 'transparent'
  },
  prioridadeContainer: {
    marginTop: -15,
    marginLeft: 30,
    backgroundColor: 'transparent'
  },
  dataPickerContainer: {
    left: -23,
    padding: 25,

  },
});

export default AbaTarefasTodasWorkspace;
