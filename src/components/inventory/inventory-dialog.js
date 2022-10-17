/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import ms from "date-fns/locale/ms";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const InventoryDialog = (props) => {
  const { onClose, open, title, ...other } = props;
  const [dateValue, setDateValue] = useState(null);

  return (
    <Box
      sx={{
        my: 2,
        mx: 2,
      }}
    >
      <Dialog open={open} onClose={onClose} sx={{ alignment: "center" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            m: 1,
            flexWrap: "wrap",
          }}
        >
          <DialogTitle sx={{ fontSize: "h5.fontSize" }}>{`Add ${title}`}</DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ alignItems: "center", display: "flex" }}>
          <form action="/" method="POST">
            <FormControl required fullWidth>
              <TextField
                name="inventoryName"
                label="Item Name *"
                hintText="Item Name *"
                sx={{ mt: 2, display: "block" }}
                fullWidth
              />
            </FormControl>
            <Grid container spacing={2} sx={{ mt: 2, justifyContent: "space-between" }}>
              <Grid item xs={8}>
                <FormControl required fullWidth>
                  <TextField
                    name="inventoryAmount"
                    hintText="Amount *"
                    label="Amount *"
                    sx={{ display: "block" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl required fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select id="inventoryUnit" label="Unit">
                    <MenuItem value="" disabled>
                      Unit
                    </MenuItem>
                    <MenuItem value="G">Gram</MenuItem>
                    <MenuItem value="KG">Kilogram</MenuItem>
                    <MenuItem value="ML">Millilitre</MenuItem>
                    <MenuItem value="L">Litre</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ my: 2 }}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
