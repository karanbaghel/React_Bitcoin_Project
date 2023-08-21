import { Avatar, Box, Image, Stack, Text, VStack } from "@chakra-ui/react";

import React from "react";
import img2 from "../assets/karan.png"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"
import img5 from "../assets/img5.jpg"
import img1 from "../assets/img1.jpg"


const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >

        <Stack direction={['column', "row"]}
        h={"full"}
        alignItems={"center"}
        
        >
            <VStack w={"full"} alignItems={["center", "flex-start"]}>

                <Text fontWeight={"bold"}>About Us</Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={["center", "left"]}> We are the best crypto trading app in India, we provide our guidance at a very cheap price</Text>


            </VStack>

            <VStack>
                <Avatar boxSize={"28"} mt={["4", "0"]}  objectFit={"contain"}  src={img4}>  
                {/* <Image  src={img2}  alt="Founder Avatar" />  */}
                </Avatar>
                <Text>Our Founder</Text>
            </VStack>

        </Stack>
    </Box>
  );
};
export default Footer;
