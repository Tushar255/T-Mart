import React, { useState } from 'react'
import {
    Button,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast,
    Radio,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddresses, deleteAddress, selectAddress } from '../state/UserSlice';
import Address from './Address';

const PersonalInfo = () => {
    const addresses = useSelector(state => state.user.addresses);
    const dispatch = useDispatch();
    const toast = useToast();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [ZIP, setZIP] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
    const handleCreateAddress = () => {
        const addressSection = document.getElementById('start');
        if (addressSection) {
            addressSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const isAddressDuplicate = (newAddress) => {
        return addresses.some(address => address.id === newAddress.id);
    };

    const handleSaveAddress = () => {
        const newAddress = {
            id: `${name}-${email}-${phone}`,
            name: name,
            email: email,
            phone: phone,
            address: address,
            city: city,
            state: state,
            ZIP: ZIP
        };

        if (isAddressDuplicate(newAddress)) {
            toast({
                title: 'Duplicate Address',
                status: 'error',
                duration: '2000'
            })
            return;
        }

        dispatch(setAddresses(newAddress));

        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setCity('');
        setState('');
        setZIP('');
    }

    return (
        <>
            <Flex flexDir={'column'} align={'flex-end'}>
                <FormControl mt={{ base: '3', lg: '6' }}>
                    <FormLabel>Full Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type='text' />
                </FormControl>

                <FormControl mt={{ base: '3', lg: '6' }}>
                    <FormLabel>Email address</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                </FormControl>

                <FormControl mt={{ base: '3', lg: '6' }}>
                    <FormLabel>Phone</FormLabel>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' />
                </FormControl>

                <FormControl mt={{ base: '3', lg: '6' }}>
                    <FormLabel>Street address</FormLabel>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} type='text' />
                </FormControl>

                <Flex flexDir={{ base: 'column', lg: 'row' }} mt={{ base: '0', lg: '3' }} justify={'space-between'} w={'100%'}>
                    <FormControl w={{ base: '100%', lg: '32%' }} mt={{ base: '3', lg: '0' }}>
                        <FormLabel>City</FormLabel>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} type='text' />
                    </FormControl>

                    <FormControl w={{ base: '100%', lg: '32%' }} mt={{ base: '3', lg: '0' }}>
                        <FormLabel>State / Province</FormLabel>
                        <Input value={state} onChange={(e) => setState(e.target.value)} type='text' />
                    </FormControl>

                    <FormControl w={{ base: '100%', lg: '32%' }} mt={{ base: '3', lg: '0' }}>
                        <FormLabel>ZIP / Postal code</FormLabel>
                        <Input value={ZIP} onChange={(e) => setZIP(e.target.value)} type='text' />
                    </FormControl>
                </Flex>

                <Button mt='8' w='fit-content'
                    bg='blackAlpha.600'
                    border='1px solid white' color='white'
                    _hover={{ color: 'black', bg: 'white' }}
                    onClick={handleSaveAddress}
                >
                    Save
                </Button>
            </Flex>

            <Flex flexDir={'column'} mt='3' color='white'>
                <Text fontSize={'xl'} fontWeight={'semibold'}>Address</Text>
                <Text mb='6' fontSize={'sm'} color={'gray.400'}>Choose from existing address</Text>

                <Box id='addresses' maxH='45vh' overflowY={'scroll'}>
                    {addresses && addresses.length > 0 ?
                        addresses.map(address => (
                            <Address
                                key={address.id}
                                address={address}
                                handleSelectedAddress={(address) => dispatch(selectAddress(address))}
                                handledeleteAddress={(address) => dispatch(deleteAddress(address))}
                            />
                        ))
                        :
                        <Flex justify='center' mb='3'>
                            <Text color='red.400'>No existing Addresses,</Text>
                            <Text color='green.400' ml='1'
                                cursor='pointer' onClick={handleCreateAddress}
                            >
                                Create one
                            </Text>
                        </Flex>
                    }
                </Box>

                <Box mt='3'>
                    <Radio w='100%' mb='3'
                        value="COD"
                        isChecked={paymentMethod === "COD"} onChange={handlePaymentMethod}
                    >
                        Cash On Delivery
                    </Radio>
                    <Radio w='100%' mb='3'
                        value="UPI"
                        isChecked={paymentMethod === "UPI"} onChange={handlePaymentMethod}
                    >
                        Card / UPI / Net Banking
                    </Radio>
                </Box>
            </Flex>
        </>
    )
}

export default PersonalInfo