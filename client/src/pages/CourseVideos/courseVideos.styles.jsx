// import { Card, styled } from "@mui/material";
import styled from 'styled-components';
import { Box } from '@chakra-ui/react'

export const CoursesVideoPage = styled("div")(() => ({
  width: "100%",
  height: "100%",
  // overflow: 'scroll',
  // padding:'10px 30px 20px 30px',
  display:'flex',
  flexDirection:'column',
  '&::-webkit-scrollbar':{
    display:'none'
  }
}));