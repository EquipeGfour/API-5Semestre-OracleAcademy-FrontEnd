// import React from "react";

// const ModalObjetivo = ({}) => {

//     const navigation = useNavigation();
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [text, setText] = React.useState('');

//     const openModal = () => {
//         setModalVisible(true);
//     };

//     const closeModal = () => {
//         setModalVisible(false);
//     };

//     return (
        
//         <Modal isVisible={isModalVisible}>
//             <View style={styles.modalContainer}>
//             <TextInput style = {styles.modalText} multiline={true} placeholder='Nome' label = "Nome" />
//             <TextInput style = {styles.modalText} multiline={true} placeholder='Descrição' label = "Descrição"/>
//             <Button title="Fechar" onPress={closeModal} color = {verdeEscuro}/>
//             </View>
//         </Modal>
//     )
// }

// export default ModalObjetivo