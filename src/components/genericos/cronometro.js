import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
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

const Cronometro = () => {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(90000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);



return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title}>
              TIMER
            </Text>
            <View style={styles.sectionStyle}>
              <Timer
                totalDuration={timerDuration}
                msecs
                start={isTimerStart}
                reset={resetTimer}
                options={options}
                handleFinish={() => {
                  alert('Timer Concluído!');
                }}
                getTime={(time) => {
                  console.log(typeof(time));
                }}
              />
              <TouchableHighlight
                onPress={() => {
                  setIsTimerStart(!isTimerStart);
                  setResetTimer(false);
                }}>
                <Text style={styles.buttonText}>
                  {!isTimerStart ? 'START' : 'STOP'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setIsTimerStart(false);
                  setResetTimer(true);
                }}>
                <Text style={styles.buttonText}>RESET</Text>
              </TouchableHighlight>
            </View>
            <Text style={styles.title}>
              CRONÔMETRO
            </Text>
            <View style={styles.sectionStyle}>
              <Stopwatch
                laps
                msecs
                start={isStopwatchStart}
                reset={resetStopwatch}
                options={options}
                getTime={(time) => {
                  console.log(time);
                }}
              />
              <TouchableHighlight
                onPress={() => {
                  setIsStopwatchStart(!isStopwatchStart);
                  setResetStopwatch(false);
                }}>
                <Text style={styles.buttonText}>
                  {!isStopwatchStart ? 'START' : 'STOP'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setIsStopwatchStart(false);
                  setResetStopwatch(true);
                }}>
                <Text style={styles.buttonText}>RESET</Text>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 20,
    },
    sectionStyle: {
      flex: 1,
      marginTop: 30,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 20,
      marginTop: 10,
    },
  });
  
  const options = {
    container: {
      backgroundColor: 'blue',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: 'white',
      marginLeft: 7,
    },
  };


export default Cronometro;