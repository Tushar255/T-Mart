import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserData from '../components/UserData'
import UserOrders from '../components/UserOrders'

const Profile = () => {
    return (
        <Flex flexDir='column' align='center' w='100%' minH='100vh' bg='black' py='7'>
            <Text fontSize={'4xl'} fontFamily={'sans-serif'} fontWeight={'semibold'}
                color='white' align='center'
            >
                Profile
            </Text>

            {/* User's Data */}
            <UserData />

            {/* User's Orders */}
            <UserOrders />
        </Flex>
    )
}

export default Profile