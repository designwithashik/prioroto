import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, RadioGroup, Table, Tbody, Td, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from '../assets/Group 2.svg'
import useTasks from "../hooks/useTasks";
import Swal from "sweetalert2";

const MainLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [placement, setPlacement] = useState('left')
  const [tasks, setControl, control] = useTasks();

  const handleDeleteTask = (id) => {
        fetch(`http://localhost:3000/tasks/delete/${id}`, {
            method: 'DELETE',
          headers: { 'content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
              if (data) {
                
                setControl(!control)
                    Swal.fire({
                        title: `Task has been deleted`,
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
            }
        })
    }
  
    return (
        <Flex flexDir={'row'}  gap={5}>
                  <RadioGroup defaultValue={placement} onChange={setPlacement}>
                <Box value='left'>
                    
        </Box>
      </RadioGroup>
      <Box justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
                <Box cursor='pointer' onClick={onOpen}>
                <img src={logo} alt="" />
                All Tasks
                </Box>
      </Box>
      <Drawer w='xl' placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>All Tasks</DrawerHeader>
            <DrawerBody>
              <Table>
                <Thead></Thead>
                <Tbody>
                  {tasks.map(task => {
                    const { taskName, taskStatus, _id } = task;
                    return (<Tr key={_id}>
                      <Td>{taskName}</Td>
                      
                      <Td>{taskStatus}</Td>
                      <Td>
                        <Button onClick={() => handleDeleteTask(_id)} variant='outline'>Delete</Button>
                      </Td>
                      
                    </Tr>)
                  })}
                    </Tbody>
              </Table>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

            <Outlet/>
        </Flex>
    );
};

export default MainLayout;