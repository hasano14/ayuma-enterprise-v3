import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { InvoiceListResults } from "../components/invoice/invoice-list-results";
import { InvoiceListToolbar } from "../components/invoice/invoice-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
// import { invoices } from "../__mocks__/invoices";

const Page = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = React.useState("");
  const [invoiceDate, setInvoiceDate] = React.useState("");
  const [invoiceName, setInvoiceName] = React.useState("");
  const [invoiceAmount, setInvoiceAmount] = React.useState("");

  return (
    <>
      <Head>
        <title>Invoices | Ayuma Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <InvoiceListToolbar />
          <Box sx={{ mt: 3 }}>
            <InvoiceListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
