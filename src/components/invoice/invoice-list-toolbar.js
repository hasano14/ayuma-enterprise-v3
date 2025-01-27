/* eslint-disable react/jsx-max-props-per-line */
import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { InvoiceDialogAdd } from "./invoice-dialog-add";
import InvoiceDataService from "../../services/invoices";
import { InvoiceDialogSearch } from "./invoice-dialog-search";
import AddIcon from "@mui/icons-material/Add";

export const InvoiceListToolbar = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogSearch, setOpenDialogSearch] = useState(false);
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState(null);

  const onChangeSearchInvoiceNumber = (e) => {
    const searchInvoiceNumber = e.target.value;
    setSearchInvoiceNumber(searchInvoiceNumber);
  };

  const handlePageUpdate = (result, clearSearch) => {
    setOpenDialog(false);
    if (result === "Received") {
      window.location.reload();
    }
  };

  const handlePageSearchClose = () => {
    setOpenDialogSearch(false);
    setSearchInvoiceNumber("");
  };

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Invoices
          </Typography>
          <Box sx={{ m: 1 }}>
            {/* <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Import
            </Button>
            <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Export
            </Button> */}
            <Button
              startIcon={<AddIcon fontSize="small" />}
              color="primary"
              variant="contained"
              onClick={() => setOpenDialog(true)}
            >
              Add Invoice
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  value={searchInvoiceNumber}
                  onChange={onChangeSearchInvoiceNumber}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        <InputAdornment
                          position="end"
                          sx={{ input: { cursor: "pointer" } }}
                          onClick={() => {
                            setOpenDialogSearch(true);
                          }}
                        >
                          <Button>Search</Button>
                        </InputAdornment>
                      </>
                    ),
                  }}
                  placeholder="Search by Invoice Number"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <InvoiceDialogAdd open={openDialog} onClose={(result) => handlePageUpdate(result)} />
      <InvoiceDialogSearch
        open={openDialogSearch}
        onClose={() => handlePageSearchClose()}
        search={searchInvoiceNumber}
      />
    </>
  );
};
