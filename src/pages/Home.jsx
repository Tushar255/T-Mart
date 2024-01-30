import { Flex } from '@chakra-ui/react'
import React from 'react'
import Filters from '../components/Filters'
import { faker } from '@faker-js/faker'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../state/CartSlice'
import { setProducts } from '../state/ProductSlice'

import Header from '../components/Header'

const Home = () => {
    const user = useSelector(state => state.user.user);
    const cart = useSelector(state => state.cart.cart);
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();

    const sort = useSelector(state => state.filters.sort)
    const inStock = useSelector(state => state.filters.inStock)
    const fastDelivery = useSelector(state => state.filters.fastDelivery)
    const ratings = useSelector(state => state.filters.ratings)
    const searchQuery = useSelector(state => state.filters.searchQuery)

    const randomProducts = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: 1,
        image: faker.image.url(),
        inStock: faker.helpers.arrayElement([0, 3, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5])
    }))

    if (products && products.length == 0) {
        dispatch(setProducts(randomProducts))
    }

    const tansformProducts = () => {
        let sortedProducts = [...products];

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) => (
                sort === 'ascendingOrder' ? a.price - b.price : b.price - a.price
            ))
        }

        if (inStock) {
            sortedProducts = sortedProducts.filter(prod => prod.inStock > 0);
        }

        if (fastDelivery) {
            sortedProducts = sortedProducts.filter(prod => prod.fastDelivery)
        }

        if (ratings) {
            sortedProducts = sortedProducts.filter(prod => prod.ratings >= ratings)
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        return sortedProducts;
    }

    return (
        <>
            <Header />
            <Flex w='100%' minH={'91vh'}
                bg='black'
                px='3' py='3'
                justify={'space-evenly'}
            >
                <Filters products={tansformProducts} />

                <Flex w={{ base: '100%', lg: "70%" }} h="100%"
                    py="4" borderRadius={'lg'}
                    flexWrap="wrap" maxWidth="1100px"
                    gap='5' justify={'center'}
                >
                    {products.length > 0 && tansformProducts().map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            cart={cart}
                            addToCart={product => dispatch(addToCart(product))}
                            removeFromCart={product => dispatch(removeFromCart(product))}
                        />
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

export default Home