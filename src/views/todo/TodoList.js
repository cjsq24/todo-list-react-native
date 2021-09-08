import React from 'react'
import { VStack, HStack, Checkbox, Text, View, Icon, IconButton } from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';

export default function TodoList(props) {
   const { todoList, goUpdateTodo, deleteTodo, checkUncheckTodo, loading } = props

   return (
      <VStack>
         {(todoList && todoList?.length > 0) ? (
            todoList.map((todo) => (
               <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={todo.id}
                  pb={2}
               >
                  <Checkbox
                     colorScheme="emerald"
                     isChecked={todo.completed}
                     onChange={() => checkUncheckTodo(todo.id)}
                     value={todo.title}
                  >
                     <Text mx={2}>
                        {todo.title}
                     </Text>
                  </Checkbox>
                  <View style={{flexDirection:'row'}}>
                     <IconButton 
                        icon={<Icon size='md' color='#5FC5FF' as={<IconFA name='edit' />} />}
                        onPress={() => goUpdateTodo(todo)}
                     />
                     <IconButton 
                        icon={<Icon size='md' color='red' as={<IconFA name='remove' />} />}
                        onPress={() => deleteTodo(todo.id)}
                     />
                  </View>
               </HStack>
            ))
         ) : (
            <HStack>
               {loading ? (
                     <Text>Cargando...</Text>
                  ) : (
                     <Text>No hay tareas</Text>
                  )
               }
            </HStack>
         )
         }
      </VStack>
   );
}