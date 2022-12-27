import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Alert, Box, Container } from "@mui/material";
import { CashBillResults } from "../components/cashbill/cashbill-results";
import { CashBillToolbar } from "../components/cashbill/cashbill-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = (props) => {
  return (
    <>
      <Head>
        <title>Cash Bill | Ayuma Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CashBillToolbar />
          <Box sx={{ mt: 3 }}>
            <CashBillResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
