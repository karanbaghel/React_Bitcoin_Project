
import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const Errors = () => {
  return (
    // <div>Errors while fetching exchanges</div>

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

    Errors while fetching exchanges
  </Alert>
   
  );
};
export default Errors;
