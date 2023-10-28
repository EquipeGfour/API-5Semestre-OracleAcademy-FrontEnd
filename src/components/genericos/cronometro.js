import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

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

return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Timer
            </Text>
            <View style={styles.sectionStyle}>
              <Stopwatch
                laps
                msecs
                // startTime={1000}
                start={isStopwatchStart}
                reset={resetStopwatch}
                options={options}
                getMsecs={(time) => {
                  console.log(time);
                }}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsStopwatchStart(!isStopwatchStart);
                  setResetStopwatch(false);
                }}>
                <Icon style={styles.iconePlay} >                  
                  {!isStopwatchStart ? <Icon name='play' size={20} color={props.btnColor}/> : <Icon name='pause' size={20}/>}
                </Icon>
              </TouchableWithoutFeedback>
              {/* <TouchableHighlight
                onPress={() => {
                  setIsStopwatchStart(false);
                  setResetStopwatch(true);
                }}>
                <Text style={styles.buttonText}>RESET</Text>
              </TouchableHighlight> */}
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