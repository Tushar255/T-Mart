import { Box, Button, Center, Flex, Image, Text } from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../state/CartSlice'
import { useNavigate } from 'react-router-dom'
import Rating from './Rating'

const CartItems = ({ handleOrderNow }) => {
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Box w='100%' mt='9'>
            <Flex w='100%' maxH={'35vh'} overflowY={'scroll'} flexDir={'column'} gap='5'>
                {
                    cart && cart.length > 0 ?
                        cart.map(item =>
                            <Item
                                key={item.id}
                                item={item}
                                removeFromCart={item => dispatch(removeFromCart(item))}
                                increaseQuantity={item => dispatch(increaseQuantity(item.id))}
                                decreaseQuantity={item => dispatch(decreaseQuantity(item.id))}
                            />
                        )
                        :
                        <Text as='b' color='red.400' mb='6' fontSize={'2xl'} align='center'>
                            Cart is Empty
                        </Text>
                }
            </Flex>

            <Flex mt='6' flexDir={'column'}>
                <Flex justify={'space-between'}>
                    <Text>Subtotal</Text>
                    <Text>Rs {calculateTotal()}</Text>
                </Flex>

                <Flex mt='3' justify={'space-between'}>
                    <Text>Total Items in Cart</Text>
                    <Text>{cart && cart.length}</Text>
                </Flex>
                {
                    cart && cart.length !== 0 && <>

                        <Text mt='3' fontSize={'sm'} color={'gray.400'}>
                            Shipping and taxes calculated at checkout.
                        </Text>
                        <Button mt='3' bg='black'
                            color='white' _hover={{ bg: 'white', color: 'black' }}
                            onClick={handleOrderNow}
                        >
                            Order Now
                        </Button>
                    </>
                }
                <Flex mt='3' justify={'center'}>
                    {cart && cart.length !== 0 && <Text mr='2'>or</Text>}
                    <Flex cursor={'pointer'} onClick={() => navigate('/')} align='center' color='green.400'>
                        <Text>
                            Continue Shopping
                        </Text>

                        <Center ml='1'>
                            <AiOutlineArrowRight />
                        </Center>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

const Item = ({ item, removeFromCart, increaseQuantity, decreaseQuantity }) => {
    return (
        <Flex justify={'space-between'} borderBottom={'1px solid white'} pb='3'>
            <Flex>
                <Image
                    src={item.image}
                    alt={item.name}
                    objectFit="cover"
                    w='35%'
                />
                <Flex ml='2' flexDir={'column'} justify={'space-between'}>
                    <Box>
                        <Text fontWeight={'semibold'}>{item.name}</Text>
                        <Flex mt='1'>
                            <Rating rating={item.ratings} />
                        </Flex>
                    </Box>

                    <Flex mt={{ base: '2', lg: '0' }}>
                        <Button bg='black' _hover={{ bg: 'blackAlpha.700' }} color='white' size='xs'
                            onClick={() => decreaseQuantity(item)}
                        >
                            -
                        </Button>
                        <Text mx='1'>{item.quantity}</Text>
                        <Button bg='black' _hover={{ bg: 'blackAlpha.700' }} color='white' size='xs'
                            onClick={() => increaseQuantity(item)}
                        >
                            +
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            <Flex w='38%' flexDir={'column'} justify={'space-between'}>
                <Text>Rs {(item.price) * (item.quantity)}</Text>
                <Text color='red' cursor={'pointer'} onClick={() => removeFromCart(item)}>Remove</Text>
            </Flex>
        </Flex>
    )
}

export default CartItems