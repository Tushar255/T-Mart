import React, { useEffect, useState } from 'react'
import { Button, Divider, Flex, FormControl, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLogin } from '../state/UserSlice';
// import { setLogin } from '../State/authSlice';

const Login = () => {
    const [showP, setShowP] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleClick1 = () => setShowP(!showP)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const token = useSelector((state) => state.user.token)

    useEffect(() => {
        if (token) {
            navigate(-1);
        }
    }, [])

    const handleLogin = async () => {
        setLoading(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { data } = await axios.post("http://localhost:2001/auth/login", { email, password }, config);

            toast({
                title: 'Login Successfull',
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
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (err) {
            toast({
                title: err.response.data,
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            setEmail("");
            setPassword("");
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
                h='fit-content' px={{ base: '5', sm: '10', md: '10' }} py='10'
                flexDir={'column'}
                justify={'space-between'}
                borderRadius={'lg'}
                bg='black'
            >
                <Text align='center' fontSize={'3xl'} fontWeight={'bold'} color='green' mb='6'>Login</Text>

                <Flex mt='5' flexDir={'column'} align={'center'} justify={'center'} w='100%'>
                    <FormControl id="email-login" isRequired mb='6'>
                        <Input
                            p={{ base: '3', sm: '6' }}
                            placeholder="Email"
                            _placeholder={{ color: 'white' }}
                            color='white' variant='flushed'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            borderBottom={'1px solid green'}
                        />
                    </FormControl>

                    <FormControl id="password-login" w={'100%'} isRequired>
                        <InputGroup>
                            <Input
                                p={{ base: '3', sm: '6' }}
                                type={showP ? 'text' : 'password'}
                                placeholder="Password"
                                _placeholder={{ color: 'white' }}
                                color='white' variant='flushed'
                                value={password} mb='6'
                                onChange={(e) => setPassword(e.target.value)}
                                borderBottom={'1px solid green'}
                            />
                            <InputRightElement width='4.5rem' mt={{ base: '0', sm: '1' }}>
                                <Button h='1.75rem' size='xs' bg='black' color='white' onClick={handleClick1} _hover={{ bg: 'white', color: 'black' }}>
                                    {showP ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        bg='green' color='white' size={{ base: 'sm', md: 'md' }}
                        _hover={{ bg: '#178449', color: 'black' }}
                        onClick={() => handleLogin()}
                        isLoading={loading}
                    >
                        Log in
                    </Button>
                </Flex>

                <Flex
                    mt='6' justify='center'
                >
                    <Text fontSize={{ base: 'sm', md: 'md' }} color='white'>Don't have an account?</Text>

                    <Text as='b' color='red.600' ml='2'
                        _hover={{ cursor: 'pointer' }}
                        onClick={() => navigate('/signup')}
                        fontSize={{ base: 'sm', md: 'md' }}
                    >
                        Create
                    </Text>

                </Flex>
            </Flex>
        </Flex>
    )
}

export default Login