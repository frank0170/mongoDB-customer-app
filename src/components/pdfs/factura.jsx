import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Factura = ({ record, dateFactura }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Factura</Text>
        <br />
        <br />
        <Text>
          Factura pentru {record.nume} verificarea in {record.Data}
        </Text>
        <br />
        <Text> Lista: </Text>
        {dateFactura.items.map((item) => {
          return(
          <div style={{display: 'flex', flexDirection:'row'}}>
            <Text>{item.name} - </Text>
            <Text>{item.quantity} - </Text>
            <Text>{item.price}</Text>
          </div>
          )
        })}

        <br />
        <br />
        <br />
        <Text>Pret final: {dateFactura.pretTotal}</Text>
        <Text> TVA: {dateFactura.tva}</Text>
        <Text> Data emitere factura: {dateFactura.dateInv} </Text>
      </View>
    </Page>
  </Document>
);

export default Factura;
