import { NextRequest, NextResponse } from 'next/server'
import ReactPDF from '@react-pdf/renderer'
import React from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'

// Define ResidencyCertificateProps
interface ResidencyCertificateProps {
  name: string
  purok: string
  yearOfResidency: string
  dateIssued: string
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: 'center',
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 50,
    fontSize: 12,
    textAlign: 'center',
  },
})

// ResidencyCertificate Component
const ResidencyCertificate: React.FC<ResidencyCertificateProps> = ({
  name,
  purok,
  yearOfResidency,
  dateIssued,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>BARANGAY BAMBANG</Text>
      <Text style={styles.title}>Certificate of Residency</Text>
      <Text style={styles.subtitle}>TANGGAPAN NG PUNONG BARANGAY</Text>
      <Text style={styles.text}>
        This is to certify that, {name} a bonafide resident of {purok}
        Barangay Bambang Bulakan, Bulacan.
      </Text>
      <Text style={styles.text}>
        This certifies further {name} been living in this barangay since{' '}
        {yearOfResidency}.
      </Text>
      <Text style={styles.text}>
        Issued this {dateIssued} at Barangay Bambang Bulakan, Bulacan.
      </Text>
      <Text style={styles.signature}>
        JOSE NARCISO C. ROQUE Punong Baranggay
      </Text>
    </Page>
  </Document>
)
