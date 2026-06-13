export type CurrencyCode = "AED";

export type CommerceMoney = {
  amountMinor: number;
  currency: CurrencyCode;
};

export type OrderStatus = "draft" | "pending" | "cancelled" | "completed";

export type OrderItem = {
  id: string;
  orderId: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: CommerceMoney;
  lineTotal: CommerceMoney;
  createdAt: string | null;
  updatedAt: string | null;
};

export type Order = {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: CommerceMoney;
  createdAt: string | null;
  updatedAt: string | null;
};

export type PaymentStatus = "pending" | "failed" | "completed" | "refunded";

export type Payment = {
  id: string;
  orderId: string;
  status: PaymentStatus;
  amount: CommerceMoney;
  method: "online" | "counter" | null;
  externalReference: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};
