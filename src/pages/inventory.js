import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { InventoryListResults } from "../components/inventory/inventory-list-results";
import { InventoryListToolbar } from "../components/inventory/inventory-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { rawMaterials } from "../__mocks__/rawMaterials";
import { packagings } from "../__mocks__/packagings";

const Page = () => (
  <>
    <Head>
      <title>Inventory | Admin</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <InventoryListToolbar />
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <InventoryListResults inventories={rawMaterials} title="Raw Materials" />
            </Grid>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <InventoryListResults inventories={packagings} title="Packagings"/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
