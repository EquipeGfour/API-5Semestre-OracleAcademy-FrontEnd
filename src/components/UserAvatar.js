import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const UserAvatar = ({ name, color, colorText }) => {
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substr(0, 2);
  
    return (
      <View style={{...styles.avatarContainer, backgroundColor: color || '#51336b'}}>
        <Text style={{...styles.avatarText, color: colorText || 'white',}}>{initials}</Text>
      </View>
    );
  };

export default UserAvatar;

const styles = StyleSheet.create({
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      avatarText: {
        
        fontSize: 16,
        fontWeight: 'bold',
      },
})