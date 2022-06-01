// import { Card, styled } from "@mui/material";
import styled from 'styled-components';
import { Box } from '@chakra-ui/react'

export const HomepageContainer = styled("div")(() => ({
  width: "100%",
  height: "100%",
  overflow: 'scroll',
  padding:'10px 30px 20px 30px',

}));

export const HomepageBanner = styled(Box)(({url})=>({
    width:'100%',
    // height:'400px',
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:10,
    margin: "20px auto",
}))

