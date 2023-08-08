import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const PDFFile = () => {
  return (
    <Document>
      <Page>
        <h1 className="text-center">PDF File</h1>
      </Page>
    </Document>
  );
};

export default PDFFile;
