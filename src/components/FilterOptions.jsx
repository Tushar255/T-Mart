import React, { useState } from 'react'
import { Button, Center, Checkbox, Flex, Radio, Text } from '@chakra-ui/react'
import { applyInStock, applyFastDelivery, ascendingOrder, descendingOrder, resetOrder, applyRatings } from '../state/FilterSlice';
import Rating from './Rating';
import { useDispatch } from 'react-redux';

const FilterOptions = ({ products }) => {
    const [radioValue, setRadioValue] = useState(null);
    const [inStock, setInStock] = useState(false);
    const [fastDelivery, setFastDelivery] = useState(false);
    const [rate, setRate] = useState(0);
    const dispatch = useDispatch();

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);

        if (event.target.value === '1') {
            dispatch(ascendingOrder());
        } else if (event.target.value === '2') {
            dispatch(descendingOrder());
        }
    }

    const handleCheckBoxChange = (e) => {
        const value = e.target.value

        if (value === 'delivery') {
            setFastDelivery(prev => !prev)
            dispatch(applyFastDelivery())
        }

        else if (value === 'stock') {
            setInStock(prev => !prev)
            dispatch(applyInStock())
        }
    }

    const handleRating = (idx) => {
        setRate(idx + 1);
        dispatch(applyRatings(idx + 1));
    }

    const handleClear = () => {
        setRadioValue(null);
        setFastDelivery(false);
        setInStock(false);
        setRate(0)
        dispatch(resetOrder());
    }

    return (
        <>
            <Text display={{ base: 'none', lg: 'block' }} fontSize={'2xl'} fontWeight={'semibold'} mb='6'>
                Filter Products
            </Text>

            <Flex flexDir='column' id='filters'>
                <Radio w='100%' mb='3'
                    value="1"
                    isChecked={radioValue === '1'} onChange={handleRadioChange}
                >
                    Ascending
                </Radio>
                <Radio w='100%' mb='3'
                    value="2"
                    isChecked={radioValue === '2'} onChange={handleRadioChange}
                >
                    Descending
                </Radio>

                <Checkbox mb='3' w='100%' value={'stock'}
                    onChange={handleCheckBoxChange}
                    isChecked={inStock}
                >
                    <Flex>
                        <Text mr='2'>In Stock</Text>
                        {inStock && products && <Text>({products().length} results)</Text>}
                    </Flex>
                </Checkbox>
                <Checkbox mb='3' value={'delivery'}
                    onChange={handleCheckBoxChange}
                    isChecked={fastDelivery}
                >
                    <Flex>
                        <Text mr='2'>Fast Delivery</Text>
                        {fastDelivery && products && <Text>({products().length} results)</Text>}
                    </Flex>
                </Checkbox>

                <Flex>
                    <Text mr='2' align={'center'} fontSize={'lg'}>Rating: </Text>
                    <Rating
                        rating={rate}
                        handleRating={(i) => handleRating(i)}
                    />
                    {rate > 0 && products && <Text ml='2'>({products().length} results)</Text>}
                </Flex>
            </Flex>

            <Button size='sm' bg={{ lg: 'blackAlpha.600' }} mt={{ base: '5', lg: '8' }}
                border={'1px solid white'} color={{ lg: 'white' }}
                _hover={{ color: 'black', bg: 'white' }}
                onClick={handleClear} w='fit-content'
            >
                Clear Filters
            </Button >
        </>
    )
}

export default FilterOptions