import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestInvoice } from "../components/dashboard/latest-invoice";
import { Sales } from "../components/dashboard/sales";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>Dashboard | Ayuma Admin</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xl={12} lg={8} sm={12} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={8} md={12} xl={6} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={8} md={12} xl={6} xs={12}>
            <LatestInvoice />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
