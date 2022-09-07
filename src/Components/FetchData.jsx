import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"
import "./Fetch.css"
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Button,
    Input,
   
  } from '@chakra-ui/react';

export const FetchData = () => {
    const [item,setItem]=useState([]);
    const [page,setpage]=useState(1)
    const [lastpage,setlastpage]=useState(0)
    const [limit,setlimit]=useState(12)
    const [searchdata,setsearchdata]=useState('')
    // console.log(searchdata)
    const [search,setsearch]=useState('')
//get all data with pagination 12 itmes will show on ui after first render after
//clicking on show more button 12 will add to exsting tweleve and so on
useEffect(()=>{
  searchdata.length>=3?setsearch(searchdata):setsearch('')
  console.log(search,"hellosearch")
},[searchdata])
console.log("this",search)
   useEffect(()=>{
    GetData(limit,search)
   },[limit,search])
    const handleSearch=(limit,searchdata)=>{
            GetData(limit,searchdata)
    }
    const GetData=(limit,search)=>{
      // console.log("hello",search)
      axios.get(`https://jsonplaceholder.typicode.com/posts`,{
        params:{
          _limit:limit,
          q:search
          
        }
      })
      .then((res)=>setItem(res.data))
      .catch((err)=>console.log(err.message))
    }
    const handlepage=()=>{
      if(page>=1){
       setpage(page+1)
       setlimit(limit+5)
      }
   }
   const showless=()=>{
           if(page>1){
             setpage(page-1)
             setlimit(limit-5)
           }
   }

const handle=(i)=>{
  console.log(i)

axios.get(`https://jsonplaceholder.typicode.com/users/${i}`)
.then((res)=>{
  return(
  
 alert(` Name:${res.data.name}
 Username:${res.data.username}
 Email:${res.data.email}
 And below the address of user,
 Street:${res.data.address.street}
 City:${res.data.address.city}
 ZipCode:${res.data.address.zipcode}
 Mobile:${res.data.address.mobile}`)
  )
  
    
  
})



}

  return (
   
   <Box className='main'> 
   <Box margin={"auto"}>
   <Input margin={"auto"} height="50px" 
    placeholder='enter something to search' bg={"black"} width={"25%"} type="text"
    color={"whiteAlpha.900"}
    onChange={(e)=>setsearchdata(e.target.value)}/>
    <Button backgroundColor={"black"} color={"white"} 
    disabled={searchdata.length<=2}
    onClick={()=>handleSearch(limit,searchdata)}>Search data</Button> 
   </Box>
   <Box className="prod"   >
  
  {item.map((e)=>{
    return(
      <Box>
        <Center key={e.id} py={12} className="inner" >
          
          
          <Stack pt={10} align={'center'} className="st" >
         
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {e.title}
            </Heading>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
           {e.body}
            </Text>
            </Stack>
      </Center>
      <Stack className='btn'>
            <Button color={"blue.100"} bg={"teal.800"} onClick={()=>handle(e.id)} >View</Button>
            </Stack>
      </Box>
    )
  })}
  </Box> 


<Button bg={"teal"} ml={"38em"} mt={"20px"} onClick={handlepage} disabled={page==lastpage}>Show more</Button>
{page>1?<Button bg={"teal.600"} onClick={showless} mt={"20px"}>show less</Button>:null}


</Box> 

  )
}
