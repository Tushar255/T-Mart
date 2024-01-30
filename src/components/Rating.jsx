import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Center } from '@chakra-ui/react'

const Rating = ({ rating, handleRating }) => {
    return (
        <>
            {
                [...Array(5)].map((_, i) => (
                    <span key={i} onClick={() => handleRating(i)}>
                        {rating > i ? (
                            <Center h='100%' mt='0.5' cursor={'pointer'} color='yellow'>
                                <AiFillStar fontSize={'15px'} />
                            </Center>
                        ) : (
                            <Center h='100%' mt='0.5' cursor={'pointer'} color='yellow'>
                                <AiOutlineStar fontSize={'15px'} />
                            </Center>
                        )}
                    </span>
                ))
            }
        </>
    )
}

export default Rating;