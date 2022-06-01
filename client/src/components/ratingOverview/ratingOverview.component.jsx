import React from 'react';
import {Flex,Avatar,Box,Text} from '@chakra-ui/react';
import {Rating} from '@mui/material';

const RatingOverview = ({rating}) => {
    return(
      <Flex width="100%"  margin="10px 0px 15px 0px" padding="5px" borderBottom="1px solid #c2c2c2">
        <Avatar size="md" marginRight="5px" src={rating.user.image} />
       <Box>
       <Text fontWeight="600">{rating?.user?.name}</Text>
       <Rating value={rating?.rate}  readOnly/>
       <Text>{rating?.comment}</Text>
       </Box>
      </Flex>
    )
  }
  
export default RatingOverview;
