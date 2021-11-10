import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import IconButton from '../../components/IconButton';

export default function TodoForm(props) {
   const [todo, setTodo] = useState('');

   useEffect(() => {
      if (props.action === 'edit' && props.todo) {
         setTodo(props.todo);
      } else if (props.action === 'add') {
         setTodo('');
      }
   }, [props.todo, props.action]);

   const submit = () => {
      if (!validEmptyInput(todo)) {
         if (props.action === 'add') {
            props.addTodoToList(todo);
         } else {
            props.updateTodo(todo);
         }
         setTodo('');
      }
   }

   const validEmptyInput = (value) => {
      value = value.replace("&nbsp;", "");
      value = value === undefined ? "" : value;
      if (!value || 0 === value.trim().length) {
         return true;
      } else {
         return false;
      }
   }

   const cancelUpdate = () => {
      props.cancelUpdate();
      setTodo('');
   }

   return (
      <View style={styles.container}>
         <TextInput
            value={todo}
            onChangeText={(e) => setTodo(e)}
            style={styles.input}
            placeholder='Enter your task'
         />
         <View style={[styles.buttonSection, { flex: props.action === 'add' ? 2 : 3 }]}>
            {props.action === 'add' ? (
               <IconButton onPress={submit} iconName='plus-circle' iconStyle={styles.iconAdd} />
            ) : (
               <>
                  <IconButton onPress={submit} iconName='edit' iconStyle={[styles.iconEdit, { marginTop: 3, fontSize: 32 }]} />
                  <IconButton onPress={cancelUpdate} iconName='window-close' iconStyle={styles.iconClose} />
               </>
            )}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
   },
   input: {
      fontSize: 16,
      flex: 7
   },
   iconAdd: {
      color: '#66D57F',
   },
   iconEdit: {
      color: '#74DAEF',
   },
   iconClose: {
      color: 'red',
   },
   buttonSection: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
});