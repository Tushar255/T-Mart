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
    useDisclosure,
    Flex,
    Center,
} from '@chakra-ui/react'
import React from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartDrawerProduct from './CartDrawerProduct'
import { removeFromCart } from '../../state/CartSlice'

const CartDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    return (
        <>
            <Flex>
                {cart && cart.length > 0 &&
                    <Text
                        position={'relative'}
                        left='3' bottom='2'
                        zIndex={'1'}
                        bg='red' color='white'
                        minW='25px'
                        px='2'
                        h='fit-content'
                        align={'center'}
                        borderRadius={'full'}
                        className="spinning"
                    >
                        <Text align="center">{cart.length}</Text>
                    </Text>
                }
                <Button bg='black' color='white'
                    onClick={onOpen}
                    _hover={{ bg: 'rgb(100 100 100)' }}
                >
                    <Center mr='2'>
                        <FaShoppingCart fontSize='25px' />
                    </Center>
                    <AiFillCaretDown />
                </Button>
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent
                    bg='rgb(51 51 51)' color='white'
                >
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {cart && cart.length} {cart && cart.length > 1 ? 'Items' : 'Item'}
                    </DrawerHeader>

                    <DrawerBody
                        display='flex'
                        flexDir={'column'}
                        gap='2'
                    >
                        {cart.map((product) => (
                            <CartDrawerProduct
                                key={product.id}
                                product={product}
                                removeFromCart={product => dispatch(removeFromCart(product))}
                            />
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            w='full'
                            border='1px solid white'
                            bg='blackAlpha.600' color='white'
                            _hover={{ color: 'black', bg: 'white' }}
                            onClick={() => {
                                navigate('/cart')
                                onClose()
                            }}
                        >
                            Go to Cart
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CartDrawer