import { Box, Button, FormControl, FormLabel, Heading, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr } from "@chakra-ui/react";
import useTasks from "../hooks/useTasks";
import Swal from "sweetalert2";

const Home = () => {

    const [tasks, setControl, control] = useTasks();
    console.log(tasks)
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target
        const taskName = form.task.value;
        const taskDesc =form.taskDesc.value
        const saveTask = { taskName, taskDesc, taskStatus: 'pending' }
        console.log(saveTask)
        fetch('http://localhost:3000/tasks',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveTask)
            })
            .then(res => res.json())
            .then(data => {
                setControl(!control)
                console.log(data)
                
            })
    }
    const pendingTasks = tasks.filter(task=>task.taskStatus=== 'pending')
    const handleApproveTask = (id) => {
    
        const response = {decision: true, id}
        fetch(`http://localhost:3000/tasks/response`, {
            method: 'PATCH',
          headers: { 'content-type': 'application/json' },
            body: JSON.stringify(response)
        })
            .then(res => res.json())
            .then(data => {
              if (data.modifiedCount) {
                
                setControl(!control)
                    Swal.fire({
                        title: `Task has been completed`,
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
      const handleDenyTask = (id) => {
        const response = {decision: false, id}
        fetch(`http://localhost:3000/tasks/response`, {
            method: 'PATCH',
          headers: { 'content-type': 'application/json' },
            body: JSON.stringify(response)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setControl(!control)
                  
                    Swal.fire({
                        title: `Task is labeled as uncompleted`,
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
        <Box width='70%' mx='auto' p={10}>
            <Heading>Add A Task</Heading>
            <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
  <Input placeholder='Task Name' name='task'/>
                </FormControl>
                

  
  
      <Text mb='8px'>Add Description</Text>
      <Textarea
       
        placeholder='Today I am going to ...'
                    size='sm'
                    name='taskDesc'></Textarea>
                
                <Button type="submit">Submit</Button>
      
            </form>
            
            <TableContainer>
  <Table variant='simple'>
    <TableCaption>Priorities of the days</TableCaption>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Description</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
                        {pendingTasks.map(task => {
                            const { taskName, taskDesc, taskStatus, _id } = task;
                            return (<Tr key={_id}>
                                <Td>{taskName}</Td>
                                <Td>{taskDesc}</Td>
                                <Td>{taskStatus}</Td>
                                <Td>
                                    <Button onClick={()=>handleApproveTask(_id)} variant='outline'>Completed</Button>
                                </Td>
                                <Td>
                                    <Button handleDenyTask={()=>handleDenyTask(_id)}>Uncompleted</Button>
                                </Td>
                              </Tr>)
      })}
     
    </Tbody>
   
  </Table>
</TableContainer>
        </Box>
    );
};

export default Home;