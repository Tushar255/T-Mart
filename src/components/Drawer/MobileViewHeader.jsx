import React, { useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    Text,
    Center,
    useDisclosure,
    Flex,
    Collapse,
    Box,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../../state/FilterSlice'
import FilterOptions from '../FilterOptions'
import { useNavigate } from 'react-router-dom'

const MobileViewHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchQuery = useSelector(state => state.filters.searchQuery)

    const [search, setSearch] = useState(searchQuery);
    const [toggleOpen, setToggleOpen] = useState(false);

    const toggleMenu = () => {
        setToggleOpen(prev => !prev);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value))
    }

    return (
        <>
            <Center display={{ lg: 'none' }} onClick={onOpen}>
                <GiHamburgerMenu fontSize={'30px'} />
            </Center>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent
                    bg='rgb(51 51 51)' color='white'
                >
                    <DrawerCloseButton />

                    <DrawerBody
                        display='flex'
                        flexDir={'column'}
                        gap='2' py='10' mt='5'
                    >
                        <Input
                            display={{ base: 'block', lg: 'none' }}
                            bg='whiteAlpha.400'
                            _placeholder={{ color: 'white' }}
                            color='white'
                            placeholder='Search'
                            w={'100%'}
                            value={search}
                            onChange={handleSearch}
                        />

                        <Box>
                            <Text mt='6' onClick={toggleMenu} border='1px solid white' p='2' borderRadius={'lg'}>
                                Filters
                            </Text>

                            <Collapse in={toggleOpen}>
                                <Flex
                                    display={'flex'}
                                    w={'100%'} h={'fit-content'}
                                    p={'5'} mt='4' borderRadius={'lg'}
                                    justify={'space-between'} flexDir={'column'}
                                    bg='whiteAlpha.300' color='white'
                                >
                                    <FilterOptions />
                                </Flex>
                            </Collapse>

                            <Text mt='3' border='1px solid white' p='2' borderRadius={'lg'}
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </Text>

                            <Text mt='3' border='1px solid white'
                                p='2' borderRadius={'lg'}
                                onClick={() => {
                                    navigate('/cart')
                                    onClose()
                                }}
                            >
                                Cart
                            </Text>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            w='full'
                            border='1px solid white'
                            bg='blackAlpha.600' color='white'
                            _hover={{ color: 'black', bg: 'white' }}
                        >
                            Log out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MobileViewHeader