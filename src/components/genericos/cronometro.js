import React, { useState,useEffect, memo } from 'react';
import {SafeAreaView, StyleSheet, Text, View,TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { updateTarefaTime } from '../../service/tarefa';
import { Button } from 'react-native-paper';

const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7",
    vermelho: "#FF0000",
    rosa: "#FFC0CB", // Cor rosa personalizada
};

const Cronometro = (props) => {
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [time,setTime] = useState(0);
    const [tempoInicial, setTempoInicial] = useState(0)
    const [timeSend,setTimeSend] = useState(false)

    const sendTime = (t) => {
        if (!isStopwatchStart && timeSend){
          console.log(t, 'log do T');
          props.getTarefaTime && props.getTarefaTime(t)
        }
        setTimeSend(false)
      }    

    useEffect(() => {
      console.log(props.tempoInicial, 'TESTEE');
      setTempoInicial(props.tempoInicial);
  }, [props.tempoInicial])

return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Timer
            </Text>
            <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            startTime={props.tempoInicial}
            start={isStopwatchStart}
            options={options}
            getMsecs={sendTime}
          />
          <Button
            onPress={() => {
              setTimeSend(true)
              setIsStopwatchStart(!isStopwatchStart);
            }}>
              <Icon style={styles.iconePlay} name={!isStopwatchStart ? "play":"pause"} size={20} color={props.btnColor}>                  
              </Icon>
          </Button>
        </View>
          </View>
      );

};

const styles = StyleSheet.create({
    container: {
      padding: 9,
      marginTop:0
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    sectionStyle: {
      marginTop:2,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
    },
    iconePlay: {
      marginTop: 5,
      marginLeft: 15,
    },
  });  
  const options = {
    container: {
      height: 30,
      width: 150,
      borderColor: 'black',
      borderWidth: 0.7,
      borderRadius: 5,
      paddingHorizontal: 8,
    },
    text: {
      fontSize: 20,
      color: colors.cinza,
      marginLeft: 7,
    },
  };


export default Cronometro;