import { LineChart, StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  Center,
  Spinner,
  Stack,
  Heading,
  HStack,
  Box,
} from "native-base";

const screenWidth = Dimensions.get("window").width - 20;

function ChartBar({ vacunatorio, datos, campania }) {
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `#000000`,
    labelColor: (opacity = 1) => `#000000`,
    style: {
      borderRadius: 16,
      p: 2,
    },
  };

  const [data, setData] = useState({
    labels: ["L", "M", "M", "J", "V"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
      },
    ],
  });

  useEffect(() => {
    setData(datos);
  }, [data]);

  return (
    <NativeBaseProvider>
      <Box mx={2}>
        <Center px={2}>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {vacunatorio}
          </Heading>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {campania}
          </Heading>
          <LineChart
            data={data}
            width={screenWidth} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#24ad25",
              backgroundGradientFrom: "#24ad25",
              backgroundGradientTo: "#24ad25",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",

                stroke: "#68c7c8",
              },
            }}
            bezier
            style={{
              marginVertical: 8,

              borderRadius: 16,
            }}
          />
        </Center>
      </Box>
    </NativeBaseProvider>
  );
}

export default ChartBar;
