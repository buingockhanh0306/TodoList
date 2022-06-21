import './App.css';
import {useEffect, useState} from "react";
import todoListAPI from "./axios/todoListAPI";
import {
    Box,
    Button, IconButton,
    Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure, useToast
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import SkeletonLoading from "./skeletonLoading";

function App() {

  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [valueEdit, setValueEdit] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const getTodoList = async ()=>{
    const list = await todoListAPI.getAll()
    setTodos(list.data.reverse())
    setIsLoading(false)
  }

  const handleAddTodo = async ()=>{
    await todoListAPI.postTodo({name: valueInput})
      setValueInput('')
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
    <Box
        w={{base: '100%', sm: '100%', md: '40%'}}
        m={{base: '0px', sm: '0px', md: '50px auto'}}
        minHeight={{base: '100vh', sm: '100vh', md: 'auto'}}
        border={'4px solid #EDF2F7'}
        p={'16px'} rounded={'6px'}
        bgColor={'#F7FAFC'}
    >
      <Box display={'flex'} gap={2}>
          <Input value={valueInput} onChange={(e)=>setValueInput(e.target.value)} variant='filled' placeholder='Please enter value...' />
          <Button onClick={()=>handleAddTodo()} colorScheme='teal' size='md'>
              Add
          </Button>
      </Box>

        <Box mt={'20px'}>
            {isLoading ? <SkeletonLoading/> : todos.map((todo, index)=>(
                <Box maxH={'80px'}  key={index} display={'flex'} gap={2} mt={'10px'}>
                    <Box
                        bgColor={'gray.300'}
                        rounded={'6px'}
                        w={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        p={"0 8px"}
                    >
                        <Text noOfLines={1} placeholder='Please enter value...'>{todo.name}</Text>
                    </Box>
                    <Button
                        onClick={()=>handleEdit(todo)}
                        color={'#fff'}
                        leftIcon={<EditIcon/>}
                        colorScheme='blue'
                        size='md'
                        display={{base: 'none', sm:'none', md: 'block'}}
                        minW={'auto'}
                    >
                        Edit
                    </Button>
                    <IconButton onClick={()=>handleEdit(todo)} colorScheme='blue' display={{base: 'block',sm: 'block', md: 'none'}} icon={<EditIcon />} />
                    <Button
                        display={{base: 'none', sm:'none', md: 'block'}}
                        onClick={()=>handleDeleteTodo(todo.id)}
                        leftIcon={<DeleteIcon/>}
                        colorScheme='red'
                        size='md'
                        minW={'auto'}
                    >
                        Delete
                    </Button>
                    <IconButton onClick={()=>handleDeleteTodo(todo.id)} colorScheme='red' display={{base: 'block',sm: 'block', md: 'none'}} icon={<DeleteIcon />} />
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
