import React, { useEffect, useState } from 'react'
import { Button, Divider, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from 'axios';
import { setLogin } from '../state/UserSlice';
// import axios from 'axios'
// import { setLogin } from '../State/authSlice';

const Signup = () => {
    const [showP, setShowP] = useState(false)
    const [showCP, setShowCP] = useState(false)
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClick1 = () => setShowP(!showP)
    const handleClick2 = () => setShowCP(!showCP)

    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        if (token) {
            navigate(-1);
        }
    }, [])

    const handleRegister = async () => {
        setLoading(true);

        if (password !== cPassword) {
            toast({
                title: "Password doesn't match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { data } = await axios.post("http://localhost:2001/auth/signup", { userName, email, password, phone }, config);

            console.log(data);

            toast({
                title: "Registered!",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });

            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token
                })
            );
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            // toast({
            //     title: err.response.data.error,
            //     status: "error",
            //     duration: 4000,
            //     isClosable: true,
            //     position: "top"
            // });
            return;
        }
    }

    return (
        <Flex
            w='100%'
            h='100vh'
            justify='center'
            align='center'
            bg='blackAlpha.900'
        >
            <Flex
                w={{ base: '90%', sm: '75%', md: '60%', lg: '38%' }}
                h={'fit-content'} px={{ base: '5', sm: '10', md: '10' }} py='5'
                flexDir={'column'}
                justify={'space-between'}
                borderRadius={'lg'}
                bg='black'
            >
                <Text align='center' fontSize={'3xl'} fontWeight={'bold'} color='red.600' mb='6'>
                    Sign Up
                </Text>

                <Flex flexDir={'column'} align={'center'} justify={'center'} w='100%'>
                    <FormControl id="user_name" isRequired mb='6'>
                        <Input
                            p={{ base: '3', md: '6' }}
                            autoComplete="off"
                            _placeholder={{ color: 'white' }}
                            color='white' variant={'flushed'}
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            borderBottom={'1px solid red'}
                        />
                    </FormControl>

                    <FormControl id="email-login" isRequired mb='6'>
                        <Input
                            p={{ base: '3', md: '6' }}
                            placeholder="Email"
                            _placeholder={{ color: 'white' }}
                            color='white'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={'flushed'}
                            borderBottom={'1px solid red'}
                        />
                    </FormControl>

                    <FormControl id="password-login" w={{ base: '100%' }} isRequired mb='6'>
                        <InputGroup>
                            <Input
                                p={{ base: '3', md: '6' }}
                                type={showP ? 'text' : 'password'}
                                placeholder="Password"
                                _placeholder={{ color: 'white' }}
                                color='white'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant={'flushed'}
                                borderBottom={'1px solid red'}
                            />
                            <InputRightElement width='4.5rem' mt={{ base: '0', sm: '1' }}>
                                <Button h='1.75rem' size='xs' bg='black' color='white' onClick={handleClick1} _hover={{ bg: 'white', color: 'black' }}>
                                    {showP ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl id="confirmPassword" w={{ base: '100%' }} isRequired mb='6'>
                        <InputGroup>
                            <Input
                                p={{ base: '3', md: '6' }}
                                type={showCP ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                _placeholder={{ color: 'white' }}
                                color='white'
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                                variant={'flushed'}
                                borderBottom={'1px solid red'}
                            />
                            <InputRightElement width='4.5rem' mt={{ base: '0', sm: '1' }}>
                                <Button h='1.75rem' size='xs' bg='black' color='white' onClick={handleClick2} _hover={{ bg: 'white', color: 'black' }}>
                                    {showCP ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl id="phone" isRequired mb='6'>
                        <Input
                            p={{ base: '3', md: '6' }}
                            placeholder="Phone no."
                            _placeholder={{ color: 'white' }}
                            color='white'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant={'flushed'}
                            borderBottom={'1px solid red'}
                        />
                    </FormControl>

                    <Button bg='red.600' color='white'
                        isLoading={loading}
                        _hover={{ color: 'black' }}
                        size={{ base: 'sm', md: 'md' }}
                        onClick={() => handleRegister()}
                    >
                        Register
                    </Button>
                </Flex>

                <Flex justify={'center'} mt='6'>
                    <Text fontSize={{ base: 'sm', md: 'md' }} color='white'>Already have an account?
                    </Text>

                    <Text as='b' color='green.400' ml='1' mr={{ base: '0', md: '8' }}
                        _hover={{ cursor: 'pointer' }} mb='3'
                        onClick={() => navigate('/login')}
                        fontSize={{ base: 'sm', md: 'md' }}
                    >
                        Login
                    </Text>
                </Flex>
            </Flex >
        </Flex >
    )
}

export default Signup