/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SeverityPill } from "../severity-pill";
import CashbillDataService from "../../services/cashbill";

// import { CashbillDialogView } from "./cashbill-dialog-view";
import { CashbillDialogUpdate } from "./cashbill-dialog-update";
import { CashbillDialogDelete } from "./cashbill-dialog-delete";

export const CashBillResults = () => {
  const [cashbills, setCashbills] = useState([]);
  //Dialog
  const [openDialogView, setOpenDialogView] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  //Selected Cashbill ID
  const [selectedCashbillIds, setSelectedCashbillIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [cashbillId, setCashbillId] = useState("");
  const [cashbillIdDelete, setCashbillIdDelete] = useState("");

  useEffect(() => {
    retrieveCashbills();
  }, []);

  const retrieveCashbills = () => {
    CashbillDataService.getAll()
      .then((response) => {
        setCashbills(response.data.cashbillData);
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Handle View Cashbill
  const handleOpenDialogView = (id) => {
    setCashbillId(id);
    setOpenDialogView(true);
  };

  //Handle Update Cashbill
  const handleOpenDialogUpdate = (id) => {
    setCashbillId(id);
    setOpenDialogUpdate(true);
  };

  //Handle Delete Cashbill
  const handleDeleteCashbill = (id) => {
    setCashbillIdDelete(id);
    setOpenDialogDelete(true);
  };

  //Refresh page after update/delete
  const handlePageUpdate = () => {
    if (openDialogUpdate === true) {
      setOpenDialogUpdate(false);
    }
    if (openDialogDelete === true) {
      setOpenDialogDelete(false);
    }
    if (openDialogView === true) {
      setOpenDialogView(false);
    }
    retrieveCashbills();
  };

  //Handle Select All Cashbill
  // const handleSelectAll = (event) => {
  //   let newSelectedCashbillIds;
  //   if (event.target.checked) {
  //     newSelectedCashbillIds = cashbills.map((cashbill) => cashbill._id);
  //   } else {
  //     newSelectedCashbillIds = [];
  //   }

  //   setSelectedCashbillIds(newSelectedCashbillIds);
  // };

  //Handle Select One Cashbill
  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCashbillIds.indexOf(id);
  //   let newSelectedCashbillIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCashbillIds = newSelectedCashbillIds.concat(selectedCashbillIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCashbillIds = newSelectedCashbillIds.concat(selectedCashbillIds.slice(1));
  //   } else if (selectedIndex === selectedCashbillIds.length - 1) {
  //     newSelectedCashbillIds = newSelectedCashbillIds.concat(selectedCashbillIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCashbillIds = newSelectedCashbillIds.concat(
  //       selectedCashbillIds.slice(0, selectedIndex),
  //       selectedCashbillIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCashbillIds(newSelectedCashbillIds);
  // };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCashbillIds.length === cashbills.length}
                      color="primary"
                      indeterminate={
                        selectedCashbillIds.length > 0 && selectedCashbillIds.length < cashbills.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell>Bill Reference</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cashbills.map((cashbill) => (
                  <TableRow
                    hover
                    key={cashbill._id}
                    selected={selectedCashbillIds.indexOf(cashbill._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCashbillIds.indexOf(cashbill._id) !== -1}
                        onChange={(event) => handleSelectOne(event, cashbill._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{cashbill.CashbillNumber}</TableCell>
                    <TableCell>{cashbill.Name}</TableCell>
                    <TableCell>{cashbill.CashbillDate}</TableCell>
                    {/* <TableCell>{format(cashbill.CashbillAddedDate, "dd/MM/yyyy")}</TableCell> */}
                    <TableCell>
                      <SeverityPill
                        color={
                          (cashbill.Status === "Paid" && "success") ||
                          (cashbill.Status === "Refunded" && "error") ||
                          "warning"
                        }
                      >
                        {cashbill.Status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{cashbill.CashbillAmount}</TableCell>

                    {/* Actions */}
                    <TableCell>
                      {/* View Cashbill */}
                      <Tooltip title="View">
                        <IconButton
                          aria-label="view"
                          onClick={() => handleOpenDialogView(cashbill._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>

                      {/* Edit Cashbill */}
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpenDialogUpdate(cashbill._id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      {/* Delete Cashbill */}
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteCashbill(cashbill._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={cashbills.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      {/* <CashbillDialogView
        // open={openDialogView}
        onClose={() => handlePageUpdate()}
        CashbillNumber={cashbillId}
      /> */}

      {/* <CashbillDialogUpdate
        open={openDialogUpdate}
        onClose={() => handlePageUpdate()}
        id={cashbillId}
      /> */}

      <CashbillDialogDelete
        open={openDialogDelete}
        onClose={() => handlePageUpdate()}
        id={cashbillIdDelete}
      />
    </>
  );
};

CashBillResults.propTypes = {
  cashbills: PropTypes.array.isRequired,
};
