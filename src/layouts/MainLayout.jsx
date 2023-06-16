import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, RadioGroup, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from '../assets/Group 2.svg'

const MainLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [placement, setPlacement] = useState('left')

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
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>All Tasks</DrawerHeader>
                    <DrawerBody>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

            <Outlet/>
        </Flex>
    );
};

export default MainLayout;