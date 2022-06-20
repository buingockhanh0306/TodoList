import './App.css';
import {useEffect, useState} from "react";
import todoListAPI from "./axios/todoListAPI";
import {
    Box,
    Button,
    Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure, useToast
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";

function App() {

  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [valueEdit, setValueEdit] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getTodoList = async ()=>{
    const list = await todoListAPI.getAll()
    setTodos(list.data)
  }

  const handleAddTodo = async ()=>{
    await todoListAPI.postTodo({name: valueInput})
      toast({
          title: 'Todo created.',
          description: "We've created your todo for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })
    getTodoList()
  }

  const handleDeleteTodo = async (id)=>{
      console.log(id)
      await todoListAPI.deleteTodo(id)
      toast({
          title: 'Todo deleted',
          description: "We've deleted your todo for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })
      getTodoList()
  }

  useEffect(()=>{
    getTodoList()
  },[])

  const handleEdit = (todo)=>{
      localStorage.setItem('id', todo.id)
      setValueEdit(todo.name)
      onOpen()

  }

  const handleUpdate = async ()=>{
      await todoListAPI.updateTodo(localStorage.getItem('id'), {name: valueEdit})
      getTodoList()
      onClose()
      toast({
          title: 'Todo updated',
          description: "We've updated your todo for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })
  }

  return (
    <Box w={'40%'} m={'50px auto'} border={'4px solid #EDF2F7'} p={'16px'} rounded={'6px'} bgColor={'#F7FAFC'}>
      <Box display={'flex'} gap={2}>
          <Input onChange={(e)=>setValueInput(e.target.value)} variant='filled' placeholder='Please enter value...' />
          <Button onClick={()=>handleAddTodo()} colorScheme='teal' size='md'>
              Add
          </Button>
      </Box>

        <Box mt={'20px'}>
            {todos?.map((todo, index)=>(
                <Box key={index} display={'flex'} gap={2} mt={'10px'}>
                    <Box
                        bgColor={'gray.300'}
                        rounded={'6px'}
                        w={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        p={"0 8px"}
                    >
                        <Text placeholder='Please enter value...'>{todo.name}</Text>

                    </Box>
                    <Button onClick={()=>handleEdit(todo)} color={'#fff'} leftIcon={<DeleteIcon/>} colorScheme='blue' size='md'>
                        Edit
                    </Button>
                    <Button onClick={()=>handleDeleteTodo(todo.id)} leftIcon={<EditIcon/>} colorScheme='red' size='md'>
                        Delete
                    </Button>
                </Box>
            ))}

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Todo List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input
                            value={valueEdit}
                            variant='filled'
                            placeholder='Please enter value...'
                            onChange={(e)=>setValueEdit(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={()=>handleUpdate()} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    </Box>
  );
}

export default App;
