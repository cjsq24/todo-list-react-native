import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({ onPress, iconName, iconStyle, text, textStyle }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
         <View>
            <Icon name={iconName} style={[styles.icon, iconStyle]} />
         </View>
         {text &&
            <View>
               <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
         }
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   icon: {
      fontSize: 30,
   },
   container: {
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
   },
   text: {
      marginLeft: 10,
      color: 'gray'
   }
});

export default IconButton;