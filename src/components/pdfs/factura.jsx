import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});



// Create Document Component
const Factura = ({record}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Factura</Text>
         <br/>
         <br/>
        <Text>Factura pentru {record.nume} in data de {record.Data}</Text>
        <br/>
        <br/>
        <Text>Din Localitatea {record.Localitate} </Text>
      </View>
    </Page>
  </Document>
  );

  export default Factura

