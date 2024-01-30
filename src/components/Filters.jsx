import { Flex } from '@chakra-ui/react';
import FilterOptions from './FilterOptions';

const Filters = ({ products }) => {
    return (
        <Flex
            display={{ base: 'none', lg: 'flex' }}
            w={'20%'} h={'100%'}
            p={'5'} mt='4' borderRadius={'lg'}
            justify={'space-between'} flexDir={'column'}
            bg='whiteAlpha.300' color='white'
        >
            <FilterOptions products={products} />
        </Flex>
    )
}

export default Filters