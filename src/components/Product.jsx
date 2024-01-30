import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Rating from './Rating';

const Product = ({ product, cart, addToCart, removeFromCart }) => {
    const isProductInCart = cart && cart.some(item => item.id === product.id);

    const handleProductInCart = () => {
        if (isProductInCart) {
            removeFromCart(product);
        } else {
            addToCart(product);
        }
    }

    return (
        <Flex maxW='xs' h='fit-content' flexDir={'column'} overflow={'hidden'}
            borderRadius={'lg'}
            border={{ base: 'none', sm: '1px solid white' }}
        >
            <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                h='50%'
            />

            <Flex
                p='5' w='100%' h='100%' bg='whiteAlpha.400'
                flexDir={'column'} color={'white'}
            >
                <Text fontSize={'lg'} fontWeight={'semibold'} mb='2'>{product.name}</Text>
                <Text>Rs {product.price}</Text>
                <Text mb='1'>{product.fastDelivery ? "Fast Delivery" : 'No Fast Delivery'}</Text>
                <Flex mb='5'>
                    <Rating rating={product.ratings} />
                </Flex>

                {
                    addToCart && removeFromCart &&
                    <Button
                        size='sm'
                        colorScheme={isProductInCart ? 'red' : 'blue'}
                        my='auto'
                        onClick={handleProductInCart}
                    >
                        {isProductInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                }
            </Flex>
        </Flex>
    )
}

export default Product