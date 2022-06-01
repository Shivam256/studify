import styled from 'styled-components';
import { Box } from '@chakra-ui/react'


export const CourseContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  overflow: 'scroll',
//   padding:'10px 30px 20px 30px',
  // display:'flex',
  // flexDirection:'column',
  // alignItems:'center',
}));


export const CourseImage = styled(Box)(({url})=>({
    width:'95%',
    height:'300px',
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:'10px',
    margin:'0px auto 10px auto ',
}))

