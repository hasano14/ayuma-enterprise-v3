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
import { CashbillDialogAdd } from "./cashbill-dialog-add";
import AddIcon from "@mui/icons-material/Add";

export const CashBillToolbar = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCashbill, setSearchCashbill] = useState("");

  //Search Cashbill From Database
  useEffect(() => {}, []);

  const handlePageUpdate = (result) => {
    setOpenDialog(false);
    if (result === "Received") {
      window.location.reload();
    }
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
            Cash Bill
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
              Add Cash Bill
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
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
                      <InputAdornment
                        position="end"
                        onClick={() => setOpenDialog(true)}
                        sx={{ input: { cursor: "pointer" } }}
                      >
                        <Button>Search</Button>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Cashbill"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <CashbillDialogAdd open={openDialog} onClose={(result) => handlePageUpdate(result)} />
    </>
  );
};
