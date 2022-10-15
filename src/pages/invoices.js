import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { InvoiceListResults } from '../components/invoice/invoice-list-results';
import { InvoiceListToolbar } from '../components/invoice/invoice-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { invoices } from '../__mocks__/invoices';

const Page = () => (
  <>
    <Head>
      <title>
        Invoices | Ayuma Admin 
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <InvoiceListToolbar />
        <Box sx={{ mt: 3 }}>
          <InvoiceListResults invoices={invoices} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
