import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import CartItems from '../components/CartItems'
import PersonalInfo from '../components/PersonalInfo'
import { useSelector } from 'react-redux'
import Success from './Success'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.user.user);
  const selectedAddress = useSelector(state => state.user.selectedAddress);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toast = useToast();

  const order = async () => {
    if (!user) {
      navigate('/login');
    }

    if (!selectedAddress) {
      toast({
        title: 'Select an Address or Create one',
        status: 'warning',
        duration: '3000'
      })

      const addressSection = document.getElementById('addresses');
      if (addressSection) {
        addressSection.scrollIntoView({ behavior: 'smooth' });
      }

      return;
    }

    setTimeout(() => {
      setOrderPlaced(true); // Set orderPlaced to true after a successful order
    }, 2000); // Simulate a 2-second order processing time
  }

  return (
    <>
      {orderPlaced ? (
        <Success setOrderPlaced={setOrderPlaced} /> // when the order is placed
      ) : (
        <Flex w='100%' minH={'91vh'} bg='black' color='white'
          justify='space-evenly' align={{ base: 'center', lg: 'flex-start' }}
          flexDir={{ base: 'column-reverse', lg: 'row' }} py='7'
        >

          {/* Address Info */}
          <Flex id='start' w={{ base: '90%', md: '60%', lg: '50%' }} h='fit-content'
            bg='whiteAlpha.400' p='6' flexDir={'column'} borderRadius={'lg'}
          >
            <Text fontSize={'2xl'} fontWeight={'semibold'}>Personal Information</Text>
            <Text fontSize={'sm'} color={'gray.400'}>
              Use a permanent adrress where you can recieve mail
            </Text>
            <PersonalInfo />
          </Flex>

          {/* Cart Items */}
          <Flex mb={{ base: '6', lg: '0' }} w={{ base: '90%', md: '60%', lg: '40%', xl: '30%' }}
            h='fit-content' bg='whiteAlpha.400' p='6' borderRadius={'lg'} flexDir={'column'}
          >
            <Text fontSize={'3xl'} fontWeight={'bold'}>Cart</Text>
            <CartItems handleOrderNow={order} />
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Cart