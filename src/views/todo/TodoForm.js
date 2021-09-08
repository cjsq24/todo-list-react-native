import React, { useState, useEffect } from 'react'
import { FormControl, Input, Icon, IconButton } from 'native-base'
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAn from 'react-native-vector-icons/AntDesign';
import IconFe from 'react-native-vector-icons/Feather';

export default function TodoForm(props) {
   const [todo, setTodo] = useState('')

   useEffect(() => {
      if (props.action === 'edit' && props.todo) {
         setTodo(props.todo)
      } else if (props.action === 'add') {
         setTodo('')
      }
   }, [props.todo, props.action])

   const submit = () => {
      if (!validEmptyInput(todo)) {
         if (props.action === 'add') {
            props.addTodoToList(todo)
         } else {
            props.updateTodo(todo)
         }
         setTodo('')
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
      props.cancelUpdate()
      setTodo('')
   }
   return (
      <FormControl>
         <Input
            value={todo}
            onChangeText={(e) => setTodo(e)}
            variant="filled"
            InputRightElement={
               props.action === 'add' ? (
                  <IconButton 
                     icon={<Icon size='md' color='emerald.400' as={<IconFA name='plus' />} />}
                     onPress={submit}
                  />
               ) : (
                  <>
                     <IconButton 
                        icon={<Icon size='md' color='#5FC5FF' as={<IconFe name='edit-3' />} />}
                        onPress={submit}
                     />
                     <IconButton
                        icon={<Icon size='md' color='red' as={<IconAn name='back' />} />}
                        onPress={cancelUpdate}
                     />
                  </>
               )
            }
         />
      </FormControl>
   );
}