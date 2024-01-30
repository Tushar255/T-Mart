import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';

const UserData = () => {
    const user = useSelector(state => state.user.user);

    return (
        <Flex borderRadius={'lg'} justify={'space-evenly'} align={'center'}
            color='white' bg='whiteAlpha.300' m='5' px='5' py='2' w='100%'
        >
            <Text fontSize='xl' align='center'>Name: {user.userName}</Text>
            <Text fontSize='xl' align='center'>Phone: {user.phone}</Text>
            <Text fontSize='xl' align='center'>Email: {user.email}</Text>
        </Flex>
    )
}

export default UserData