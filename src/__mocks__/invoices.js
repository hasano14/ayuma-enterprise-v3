import { v4 as uuid } from "uuid";

export const invoices = [
  {
    id: uuid(),
    invoiceRef: "#8215",
    createdAt: 1555016400000,
    company: "Emart",
    status: "refunded",
  },
  {
    id: uuid(),
    invoiceRef: "#2812",
    createdAt: 1555016400000,
    company: "Choice Daily",
    status: "pending",
  },
  {
    id: uuid(),
    invoiceRef: "#8212",
    createdAt: 1555016400000,
    company: "CS Supermarket",
    status: "received",
  },
  {
    id: uuid(),
    invoiceRef: "#7235",
    createdAt: 1555016400000,
    company: "BS Supermarket",
    status: "received",
  },
];
