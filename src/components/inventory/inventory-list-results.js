import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
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
import { InventoryDialog } from "./inventory-dialog";

export const InventoryListResults = ({ inventories, title, ...rest }) => {
  const [selectedInventoryIds, setSelectedInventoryIds] = useState([]);
  const [inventoryTitle, setInventoryTitle] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClick = () => {
    title === "Packagings" ? setInventoryTitle("Packagings") : setInventoryTitle("Raw-Materials");
    console.log(inventoryTitle);
  };

  const handleSelectAll = (event) => {
    let newSelectedInventoryIds;

    if (event.target.checked) {
      newSelectedInventoryIds = inventories.map((inventory) => inventory.id);
    } else {
      newSelectedInventoryIds = [];
    }

    setSelectedInventoryIds(newSelectedInventoryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInventoryIds.indexOf(id);
    let newSelectedInventoryIds = [];

    if (selectedIndex === -1) {
      newSelectedInventoryIds = newSelectedInventoryIds.concat(selectedInventoryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedInventoryIds = newSelectedInventoryIds.concat(selectedInventoryIds.slice(1));
    } else if (selectedIndex === selectedInventoryIds.length - 1) {
      newSelectedInventoryIds = newSelectedInventoryIds.concat(selectedInventoryIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedInventoryIds = newSelectedInventoryIds.concat(
        selectedInventoryIds.slice(0, selectedIndex),
        selectedInventoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedInventoryIds(newSelectedInventoryIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Card {...rest}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 1,
            flexWrap: "wrap",
          }}
        >
          <CardHeader title={title} />
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => setOpenDialog(true)}
          >
            Add {title}
          </Button>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ overflow: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedInventoryIds.length === inventories.length}
                      color="primary"
                      indeterminate={
                        selectedInventoryIds.length > 0 &&
                        selectedInventoryIds.length < inventories.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventories.slice(0, limit).map((inventory) => (
                  <TableRow
                    hover
                    key={inventory.id}
                    selected={selectedInventoryIds.indexOf(inventory.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedInventoryIds.indexOf(inventory.id) !== -1}
                        onChange={(event) => handleSelectOne(event, inventory.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{inventory.name}</TableCell>
                    <TableCell>{inventory.quantity}</TableCell>
                    <TableCell>{inventory.unit}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
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
          count={inventories.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <InventoryDialog open={openDialog} onClose={() => setOpenDialog(false)} title={title} />
    </>
  );
};

InventoryListResults.propTypes = {
  inventories: PropTypes.array.isRequired,
};
