import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import IconButton from '../../components/IconButton';

export default function TodoList(props) {
   const { todoList, goUpdateTodo, deleteTodo, checkUncheckTodo, loading } = props;

   return (
      <View style={styles.container}>
         <ScrollView>
            {(todoList && todoList?.length > 0) ? (
               todoList.map((todo) => (
                  <View style={styles.rowTask} key={todo.id}>
                     <View style={styles.textTodoContent}>
                        <IconButton
                           iconName={todo.completed ? 'check-square-o' : 'square-o'}
                           iconStyle={todo.completed ? styles.checked : styles.unChecked}
                           onPress={() => checkUncheckTodo(todo.id)}
                           text={todo.title}
                           textStyle={styles.todoText}
                        />
                     </View>
                     <View style={styles.buttonSection}>
                        <IconButton 
                           iconName='edit'
                           iconStyle={styles.iconEdit}
                           onPress={() => goUpdateTodo(todo)}
                        />
                        <IconButton 
                           iconName='remove'
                           iconStyle={styles.iconRemove}
                           onPress={() => deleteTodo(todo.id)}
                        />
                     </View>
                  </View>
               ))
            ) : (
               <View style={{ alignItems: 'center' }}>
                  {loading 
                     ? (<Text style={styles.textLoading}>Cargando...</Text>) 
                     : (<Text style={styles.textLoading}>No hay tareas</Text>)
                  }
               </View>
            )}
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 5,
      paddingTop: 5
   },
   textLoading: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 15,
      color: 'gray'
   },
   iconEdit: {
      color: '#74DAEF',
      marginTop: 4
   },
   iconRemove: {
      color: 'red',
   },
   buttonSection: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 3,
   },
   rowTask: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   checkTodo: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   checked: {
      color: 'green'
   },
   unChecked: {
      color: 'gray'
   },
   todoText: {
      fontSize: 17,
   },
   textTodoContent: {
      flex: 7
   }
});