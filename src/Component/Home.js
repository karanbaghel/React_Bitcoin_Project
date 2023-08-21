import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full0"} h={"85vh"}>

     <motion.div style={{
      height:"80vh"

     }}
     animate={{
      translateY:"20px"

     }}

     transition={{
      duration:2, 
      repeat: Infinity,
      repeatType: "reverse"
      
     }}
     
     >


     <Image

        w={"full"}
        h={"full"}
        objectFit={"contain"}
        src={btc}
        filter={"grayscale(1)"}
      ></Image>
      </motion.div> 
     

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.900"}
        mt={"-20"}
      >
        Xcrypto
      </Text>
    </Box>
  );
};
export default Home;
