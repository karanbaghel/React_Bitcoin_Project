import axios from "axios";

import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
// import Exchangecard from "./Exchangecard";
import Errors2 from "./Errors2";
import Coincard from "./Coincard";

function Coins() {
  const [coindata, setCoindata] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$  ";

  useEffect(() => {
    abc();
  }, [currency, page]);

  // function changepage(newpage){
  //   setPage(newpage)
  //   setLoading(true);

  // }

  async function abc() {
    try {
      const fetchingdata = await axios.get(
      
        `${server}/coins/markets?vs_currency=${currency}&page=${page}`
      );
      console.log("api real-time data", fetchingdata.data);
      setCoindata(fetchingdata.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError(true);
    }
   
  }

  if (error) return <Errors2 />;

  function changepage(newpage) {
    setPage(newpage);
    setLoading(true);
  }

  const btns = new Array(132).fill(1)

  return (
    <>

      <Container maxW={"container.xl"}>
        {
        Loading ? (
          <Loader />
        ) : (
          <>
            {/* <p>data</p> */}

            {/* currency === "inr" ? "₹" : currency === "eur" ? "€" : "$  "; */}
            <RadioGroup value={currency } onChange={setCurrency}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}> INR</Radio>
                <Radio value="usd">  USD</Radio>
                <Radio value="EUR"> EUR</Radio> 
              
              </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coindata.map((value) => (
                <Coincard
                  key={value.id}
                  id={value.id}
                  name={value.name}
                  price={value.current_price}
                  img={value.image}
                  symbol={value.symbol}
                  currencySymbol={currencySymbol}
                  url={value.url}
                />
              ))}
            </HStack>

            {/* <HStack>
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={changepage(2)}
              ></Button>
            </HStack> */}

            <HStack w={"full"} overflowX={"auto"} p={"8"} >
             { 
              btns.map((item, index)=>(
                <Button key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changepage(index+1)}
              >
                {index+1}
              </Button>

               ) )
             }
            </HStack>
          </>
        )}
      </Container>
    </>
  );
}

export default Coins;
