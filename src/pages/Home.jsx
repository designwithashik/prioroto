import { Box, Button, FormControl, FormLabel, Heading, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr } from "@chakra-ui/react";
import useTasks from "../hooks/useTasks";

const Home = () => {
    const [tasks, refetch] = useTasks();
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
                console.log(data)
                
            })
            refetch()
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
                        {tasks.map(task => {
                            const { taskName, taskDesc, taskStatus, _id } = task;
                            return (<Tr key={_id}>
                                <Td>{taskName}</Td>
                                <Td>{taskDesc}</Td>
                                <Td>{taskStatus}</Td>
                              </Tr>)
      })}
     
    </Tbody>
   
  </Table>
</TableContainer>
        </Box>
    );
};

export default Home;