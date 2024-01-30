import { Avatar, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MdDelete } from 'react-icons/md'

const CartModalProduct = ({ product, removeFromCart }) => {
    return (
        <Flex w='100%' h='fit-content' p='3' bg='blackAlpha.600'>
            <Flex w='100%' h='100%'
                justify={'space-between'}
            >
                <Avatar
                    size='sm'
                    name={product.name}
                    src={product.image}
                />

                <Flex flexDir={'column'}>
                    <Text fontSize={'sm'} fontWeight={'semibold'}>{product.name}</Text>
                    <Text fontSize={'sm'}>Rs {product.price}</Text>
                </Flex>

                <Center
                    cursor={'pointer'} _hover={{ color: 'red' }}
                    onClick={() => removeFromCart(product)}
                >
                    <MdDelete />
                </Center>
            </Flex>
        </Flex>
    )
}

export default CartModalProduct