import React from "react";

import {
  Center,
  Stack,
  AspectRatio,
  VStack,
  Text,
  Heading,
  HStack,
  Box,
  Button
} from "native-base";

import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'

function Historial({ campania, marca, fecha, lote }) {
  const fechaTurno = new Date(fecha);
  fechaTurno.setMonth(fechaTurno.getMonth() + 1);
  const html = `
  <html>
    <body>
      <h1>Certificado fiebre amarilla</h1>
      <h3> Usted se ha vacunado contra la fiebre amarilla el dia
        ${new Date(fecha).getUTCDate() +"/"+ fechaTurno.getMonth() +"/"+  new Date(fecha).getUTCFullYear() } </h3>
      <h3>Datos de la vacuna: marca: ${marca}. lote: ${lote}</h3>
    </body>
  </html>
`;

let generatePdf = async() => {
  const file = await printToFileAsync({
    html:html,
    base64: false

  });

await shareAsync(file.uri);
}
  return (
    <Box p="20px">
      <Box
        maxW="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="emerald.500"
        borderWidth="3"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Stack p="4" space={5}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {campania}
            </Heading>
          </Stack>
          <VStack space={4} justifyContent="space-between">
            <Text>
              Fecha:{new Date(fecha).getUTCDate() +"/"+ fechaTurno.getMonth() +"/"+  new Date(fecha).getUTCFullYear() }
            </Text>
            <Text>Marca: {marca}</Text>
            <Text>Nro lote: {lote}</Text>
            {(campania == "Fiebre amarilla") && (marca != "N/A") ?
            <Button onPress={generatePdf}>Descargar certificado</Button>: null }
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Historial;
