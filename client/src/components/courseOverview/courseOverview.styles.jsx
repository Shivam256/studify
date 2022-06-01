import styled from 'styled-components';

export const CourseOverviewContainer = styled("div")(()=>({
    width:'95%',
    height:'350px',
    backgroundColor:'white',
    boxShadow:'0px 8px 20px rgba(35, 35, 35, 0.1)',
    display: 'flex',
    flexDirection:'column',
    marginBottom:'20px',
    borderRadius:"5px",
    transition:'0.3s ease-in',
    '&:hover':{
        transform:'scale(1.05)',
        boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    }
})) 

export const CourseImage = styled("div")(({url})=>({
    width:'100%',
    height:'60%',
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius:"5px 5px 0px 0px",

}))

export const CourseData = styled("div")(()=>({
    width:'100%',
    flex:1,
    // backgroundColor:'red',
    padding:'8px ',
    '& .course-author':{
        fontSize:'0.8em',
        color:'#646464'
    },
    '& .course-name':{
        fontWeight:700
    }
}))