import React from 'react'

import { Alert, AlertIcon } from "@chakra-ui/react";

 const Errors2 = () => {
  return (
    // <div>Errors while fetching coins</div>
    <>
    
    <Alert
      status="error"
      position={"fixed"}
      bottom={"4"}
      left={"50%"}
      justifyContent={"center"}
      transform={"translateX(-50%)"}
      w={"container.lg"}
        
    >
      <AlertIcon />

      Errors while fetching coins
    </Alert>
  </>
  )
}
export default Errors2;