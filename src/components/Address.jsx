import {
    Box,
    Center,
    Flex,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useState } from 'react';
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux';


const Address = ({ address, handleSelectedAddress, handledeleteAddress }) => {
    const addresses = useSelector(state => state.user.addresses);

    const handleAddress = (e) => {
        const address = addresses.find(address => address.id === e.target.value);
        handleSelectedAddress(address);
    }

    return (
        <Box mb='3'>
            <Flex borderRadius={'lg'} justify="space-between" alignItems={{ base: 'flex-start', sm: "center" }}
                border='1px solid white' flexDir={{ base: 'column', sm: 'row' }}
                overflowY={'scroll'} maxH={{ base: '17vh', sm: 'none' }}
            >
                <VStack spacing="4" alignItems="flex-start" p='3'>
                    <input
                        onChange={handleAddress}
                        name="address"
                        type="radio"
                        value={address.id}
                    />

                    <Text fontSize="sm" fontWeight="semibold" color="white">
                        {address.name}
                    </Text>

                    <Text fontSize="xs" color="white">
                        {address.address}
                    </Text>

                    <Text fontSize="xs" color="white">
                        {address.ZIP}
                    </Text>
                </VStack>

                <VStack p='3' spacing="4" alignItems={{ base: 'flex-start', sm: "flex-end" }}
                    display={'flex'}
                >
                    <Center
                        cursor={'pointer'} color='red' _hover={{ color: 'black' }}
                        onClick={() => handledeleteAddress(address)}
                    >
                        <MdDelete />
                    </Center>

                    <Text fontSize="sm" color="white">
                        Phone: {address.phone}
                    </Text>

                    <Text fontSize="sm" color="white">
                        {address.city}
                    </Text>

                    <Text visibility={'hidden'}>
                        Random
                    </Text>
                </VStack>
            </Flex>
        </Box>
    )
}

export default Address