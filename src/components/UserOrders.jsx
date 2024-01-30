import { Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const UserOrders = () => {
    const products = useSelector(state => state.product.products)
    return (
        <Flex mt='8' flexDir={'column'} align='center'
            color='white' bg='whiteAlpha.300' w={{ base: '90%', lg: '50%' }}
            m='5' px='5' py='2' borderRadius={'lg'}
        >
            <Text fontSize={'2xl'} fontWeight={'bold'} mt='3'>Previous Orders</Text>

            <VStack mt='8' spacing={'3'} w='100%'>
                {products.map(product => (
                    <Flex w={'100%'} justify={'space-between'}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            objectFit="cover"
                            h='100px'
                        />
                        <Flex>
                            <Text>{product.name}</Text>
                        </Flex>
                    </Flex>
                ))}
            </VStack>
        </Flex>
    )
}

export default UserOrders