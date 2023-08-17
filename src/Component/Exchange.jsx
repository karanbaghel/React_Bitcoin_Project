import axios from "axios";

import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import Exchangecard from "./Exchangecard";
import Errors from "./Errors";



function Exchange() {
  const [exchange, setExchange] = useState([]);
  const [Loding, setLoading] = useState(true);
  const [error, setError]=  useState(false)

  useEffect(() => {
    abc();
  }, []);

  async function abc() {

    try { 
      const getdata = await axios.get(`${server}/exchanges?`);
      console.log("api real-time data", getdata.data);
      setExchange(getdata.data);
      setLoading(false)
    }
    catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError(true)
    }
    // const getdata = await axios.get(`${server}/exchanges?`);
    // console.log("api real time data", getdata.data);
    // setCoindata(getdata.data);
    // setLoding(false);
    
  }

  if(error) return <Errors/>

  return (
    <>
      <Container maxW={"container.xl"}>
        {Loding ? (
          <Loader />
        ) : (
          <>
            {/* <p>data</p> */}

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {
                exchange.map((value)=>(
                
                <Exchangecard 
                key={value.id}
                name={value.name}
                img={value.image}
                rank={value.trust_score_rank}
                url={value.url}
                />
              

                ))
              }
            </HStack>
          </>
        )}
      </Container>
    </>
  );
}


export default Exchange;
