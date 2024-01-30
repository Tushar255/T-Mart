import { Flex, Input, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import CartDrawer from './Drawer/CartDrawer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../state/FilterSlice';
import MobileViewHeader from './Drawer/MobileViewHeader';
import { BiSolidUserCircle } from 'react-icons/bi'
import { setLogout } from '../state/UserSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const user = useSelector(state => state.user.user);

    const searchQuery = useSelector(state => state.filters.searchQuery)

    const [search, setSearch] = useState(searchQuery);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value))
    }

    const handleSignout = () => {
        dispatch(setLogout());

        toast({
            title: 'Signout Successfull',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    }

    const openNewWindow = (url) => {
        window.open(url, '_blank');
    }

    return (
        <Flex w='100%' h='9vh' bg='blackAlpha.800' px='4%'
            justify={'space-between'} align={'center'}
        >
            <MobileViewHeader />
            <Text cursor={'pointer'} fontSize={'2xl'}
                fontWeight={'bold'} color='white'
                onClick={() => navigate('/')}
                fontFamily={'cursive'}
            >
                T-Mart
            </Text>
            <Input
                display={{ base: 'none', lg: 'block' }}
                bg='whiteAlpha.400'
                _placeholder={{ color: 'white' }}
                color='white'
                placeholder='search'
                w='30%'
                value={search}
                onChange={handleSearch}
            />

            <Flex align='center'>
                <CartDrawer />

                <Menu>
                    <MenuButton color='white' ml='2'>
                        <BiSolidUserCircle fontSize={'45px'} />
                    </MenuButton>
                    <MenuList bg='gray.800' color='white' borderStyle={'none'}>
                        {
                            !user ?
                                <MenuItem bg='blackAlpha' onClick={() => openNewWindow('/login')}>
                                    Sign In
                                </MenuItem>
                                :
                                <>
                                    <MenuItem bg='gray.800' onClick={() => navigate('/profile')}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem bg='gray.800' onClick={() => handleSignout()}>
                                        Sign Out
                                    </MenuItem>
                                </>
                        }
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Header