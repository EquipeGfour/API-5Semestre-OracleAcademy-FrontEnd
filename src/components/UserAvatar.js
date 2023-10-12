import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const UserAvatar = ({ name }) => {
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substr(0, 2);
  
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    );
  };

export default UserAvatar;

const styles = StyleSheet.create({
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#51336b',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      avatarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})