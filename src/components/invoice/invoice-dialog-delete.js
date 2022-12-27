/* eslint-disable react/jsx-max-props-per-line */
//Delete Confirmation
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import InvoiceDataService from "../../services/invoices";

export const InvoiceDialogDelete = (props) => {
  const { onClose, open, id, ...other } = props;
  const handleDeleteInvoice = (id) => {
    InvoiceDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        onClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box sx={{ my: 2, mx: 2 }}>
      <Dialog open={open} onClose={onClose} sx={{ alignment: "center" }}>
        <DialogTitle sx={{ fontSize: "h4.fontSize" }}>Confirm Deletion?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to delete this invoice?
          </DialogContentText>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => handleDeleteInvoice(id)}>Delete</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
