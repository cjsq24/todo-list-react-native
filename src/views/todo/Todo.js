import React, { useEffect, useState } from 'react';
import { Heading, Center, NativeBaseProvider, VStack } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function Todo() {
   const [action, setAction] = useState('add')
   //const [todoList, setTodoList] = useLocalStorage('cs_todo_list')
   const [todoList, setTodoList] = useState()
   const [todoUpdate, setTodoUpdate] = useState({})
   const [loading, setLoading] = useState(true)

   const setTodoLocal = async (newTodoList) => {
      try {
         await AsyncStorage.setItem('cs_todo_list', JSON.stringify(newTodoList))
      } catch (e) {
         console.log(e)
      }
   }

   useEffect(() => {
      const getTodoLocal = async () => {
         try {
            const todoListLocal = JSON.parse(await AsyncStorage.getItem('cs_todo_list'))
            setTodoList(todoListLocal)
            setLoading(false)
            //setTodoList(todoListLocal != null ? JSON.parse(todoListLocal) : null)
         } catch (e) {
            console.log(e)
            setLoading(false)
            //return null
         }
      }

      getTodoLocal()
   }, [])

   const addTodoToList = async (todo) => {
      const prevTodoList = (todoList && todoList?.length > 0) ? todoList : []

      const newTodoList = [
         {
            id: Math.floor(Math.random() * 1000),
            title: todo,
            completed: false
         },
         ...prevTodoList
      ]
      setTodoLocal(newTodoList)
      setTodoList(newTodoList)
   }

   const goUpdateTodo = (todo) => {
      setTodoUpdate(todo)
      setAction('edit')
   }

   const cancelUpdate = () => {
      setTodoUpdate({})
      setAction('add')
   }

   const updateTodo = (title) => {
      const updatedTodo = todoList.map((todo => {
         if (todo.id === todoUpdate.id) {
            todo.title = title
            setTodoUpdate({})
         }
         return todo
      }))
      setAction('add')
      setTodoLocal(updatedTodo)
      setTodoList(updatedTodo)
   }

   const deleteTodo = (id) => {
      const newList = todoList.filter(todo => todo.id !== id)
      setAction('add')
      setTodoUpdate({})
      setTodoLocal(newList)
      setTodoList(newList)
   }

   const checkUncheckTodo = (id) => {
      const newTodoList = todoList.map(todo => {
         if (todo.id === id) {
            todo.completed = !todo.completed
         }
         return todo
      })
      setTodoLocal(newTodoList)
      setTodoList(newTodoList)
   }

   return (
      <NativeBaseProvider>
         <Center flex={1} style={{ backgroundColor: 'white' }}>
            <VStack space={4} flex={1} w="90%" mt={4}>
               <Heading color="emerald.400">
                  My To-Do List
               </Heading>
               <TodoForm
                  addTodoToList={addTodoToList}
                  action={action}
                  todoUpdate={todoUpdate}
                  updateTodo={updateTodo}
                  todo={todoUpdate.title}
                  cancelUpdate={cancelUpdate}
               />
               <TodoList
                  todoList={todoList}
                  goUpdateTodo={goUpdateTodo}
                  deleteTodo={deleteTodo}
                  checkUncheckTodo={checkUncheckTodo}
                  loading={loading}
               />
            </VStack>
         </Center>
      </NativeBaseProvider>
   );
}