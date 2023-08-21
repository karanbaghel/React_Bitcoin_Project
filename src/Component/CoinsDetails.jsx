import {
  Container,
  Box,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router-dom";

import Errors3 from "./Errors3";
// import { Chart } from "chart.js";
import Chart from "./Chart";

const CoinsDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartarray, setChartarray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$  ";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartstats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading("true ")
        break;

        case "7d":
          setDays("7d");
          setLoading("true ")
          break;

          case "17d":
            setDays("17d");
            setLoading("true ")
            break;

            case "30d":
              setDays("30d");
              setLoading("true ")
              break;

              case "60d":
                setDays("60d");
                setLoading("true ")
                break;

                case "200d":
                  setDays("200d");
                  setLoading("true ")
                  break;

                  case "1y":
                    setDays("1y");
                    setLoading("true ")
                    break;

                    case "max":
                      setDays("max");
                      setLoading("true ")
                      break;

        default:

        setDays("24h");
        setLoading("true ")
          break;
    }
  };

  const params = useParams();

  useEffect(() => {
    fetchcoin();
  }, [params.id, currency, days]);

  async function fetchcoin() {
    try {
      const fetchcoinID = await axios.get(`${server}/coins/${params.id}`);
      const { data: chartdata } = await axios.get(
        `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      console.log(" fetch coin id", fetchcoinID.data);
      console.log("chartdata", chartdata);

      setCoin(fetchcoinID.data);
      setChartarray(chartdata.prices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError(true);
    }
  }

  if (error) return <Errors3 />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box borderWidth={1} width={"full"}>
              <Chart arr={chartarray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p={"4"} overflow={"auto"}>
              {btns.map((i) => (
                <Button key={i} onClick={() => switchChartstats(i)}>
                  {i}
                </Button>
              ))}
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}> INR</Radio>
                <Radio value="usd"> USD</Radio>
                <Radio value="eur"> EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                Last Updated on{Date().split("G")[0]}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}

                //  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$  ";
              />
              <Stat>
                <StatLabel>{coin.data}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >
                {`#${coin.market_cap_rank}`}
              </Badge>

              <CustomBar
                // high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                // low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />

              <Box w={"full"} p={"4"}>
                {/* <itemsss title={"Max supply"} value={2335}/> */}
                <Itemsss
                  title={"Max supply"}
                  value={coin.market_data.max_supply}
                />
                <Itemsss
                  title={"Circulating supply"}
                  value={coin.market_data.circulating_supply}
                />

                <Itemsss
                  title={"Market cap"}
                  value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
                  // value={coin.market_data.circulating_supply}
                />
                <Itemsss
                  title={"All time low"}
                  value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
                />
                <Itemsss
                  title={"All time high"}
                  value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
};

export default CoinsDetails;

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />

      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"red"} />
    </HStack>
  </VStack>
);

const Itemsss = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {value}
    </Text>
  </HStack>
);
