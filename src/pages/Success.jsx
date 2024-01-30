import { Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Product from '../components/Product'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Success = ({ setOrderPlaced }) => {
    const cart = useSelector(state => state.cart.cart);
    console.log(cart);
    const navigate = useNavigate();

    const backToHome = () => {
        setOrderPlaced(false);
        navigate('/');
    }

    return (
        <Flex w='100%' bg='black' flexDir={{ base: 'column', md: 'row' }}>
            <Flex w={{ base: '100%', md: '50%' }} h={{ base: '50vh', md: '100vh' }}
                flexDir={'column'} color='white' justify='center' align='center'
            >
                <Text fontSize='4xl' fontFamily={'cursive'} mb='6'>Order Successfull</Text>
                <Text fontSize='2xl' fontFamily='cursive' >Thank You for purchasing!</Text>
                <Text fontSize='2xl' mb='6'>🥳🥳🥳</Text>

                <Flex onClick={backToHome} color='green' cursor='pointer'>
                    <Text fontSize={'xl'} fontWeight={'semibold'} fontFamily={'cursive'}>
                        Back to Home Page
                    </Text>
                    <Center ml='1' mt='1'>
                        <AiOutlineArrowRight />
                    </Center>
                </Flex>
            </Flex>

            <Flex w={{ base: '100%', lg: "50%" }}
                py="4" borderRadius={'lg'} overflowY={'scroll'}
                flexWrap="wrap" maxWidth="1100px"
                gap='5' justify={'center'} align='center'
            >
                {cart && cart.length > 0 && cart.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))}
            </Flex>
        </Flex >
    )
}

export default Success