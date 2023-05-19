import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});



// Create Document Component
const Contract = ({record}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Contract</Text>
         <br/>
         <br/>
        <Text>Contract pentru {record.nume} in data de {record.Data}</Text>
        <br/>
        <br/>
        <Text>Din Localitatea {record.Localitate} </Text>
      </View>
    </Page>
  </Document>
  );

  export default Contract

