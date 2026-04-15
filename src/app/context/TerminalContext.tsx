import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type OrderStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "executed";

export type OrderAction = "BUY" | "SELL";
export type OrderType = "MARKET" | "LIMIT" | "STOP";

export interface Order {
  id: string;
  assetCode: string;
  assetName: string;
  isin: string;
  market: string;
  action: OrderAction;
  orderType: OrderType;
  quantity: number;
  price: number;
  estimatedValue: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  controller?: string;
  notes?: string;
}

export interface OrderDraft {
  assetCode?: string;
  assetName?: string;
  isin?: string;
  market?: string;
}

interface TerminalContextType {
  // Order panel
  isOrderPanelOpen: boolean;
  orderDraft: OrderDraft | null;
  openOrderPanel: (draft?: OrderDraft) => void;
  closeOrderPanel: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  // AI panel
  isAIPanelOpen: boolean;
  aiInitialPrompt: string;
  openAIPanel: (prompt?: string) => void;
  closeAIPanel: () => void;
}

const TerminalContext = createContext<TerminalContextType | null>(null);

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-2026-0041",
    assetCode: "SONATEL",
    assetName: "Sonatel SA",
    isin: "SN0000000045",
    market: "BRVM",
    action: "BUY",
    orderType: "LIMIT",
    quantity: 150,
    price: 16800,
    estimatedValue: 2520000,
    status: "approved",
    createdAt: "08 Avr 2026 · 09:32",
    updatedAt: "08 Avr 2026 · 10:15",
    controller: "Diallo Mamadou",
    notes: "Validé — stratégie télécom Q2 2026",
  },
  {
    id: "ORD-2026-0042",
    assetCode: "PALM CI",
    assetName: "Palmci Côte d'Ivoire",
    isin: "CI0000000089",
    market: "BRVM",
    action: "BUY",
    orderType: "MARKET",
    quantity: 200,
    price: 7295,
    estimatedValue: 1459000,
    status: "under_review",
    createdAt: "08 Avr 2026 · 11:48",
    updatedAt: "08 Avr 2026 · 12:05",
    controller: "Diallo Mamadou",
    notes: "En attente de validation contrôleur — seuil 1,4M XOF",
  },
  {
    id: "ORD-2026-0039",
    assetCode: "OAT CIV 7Y",
    assetName: "OAT Côte d'Ivoire 2031",
    isin: "CI0000OAT031",
    market: "UMOA-Titres",
    action: "BUY",
    orderType: "LIMIT",
    quantity: 50,
    price: 95400,
    estimatedValue: 4770000,
    status: "executed",
    createdAt: "07 Avr 2026 · 14:22",
    updatedAt: "07 Avr 2026 · 15:30",
    controller: "Diallo Mamadou",
    notes: "Exécuté · Rendement 6,89% · Règlement J+2",
  },
  {
    id: "ORD-2026-0038",
    assetCode: "SGBCI",
    assetName: "SocGen Banques CI",
    isin: "CI0000000046",
    market: "BRVM",
    action: "SELL",
    orderType: "LIMIT",
    quantity: 80,
    price: 13750,
    estimatedValue: 1100000,
    status: "rejected",
    createdAt: "07 Avr 2026 · 10:15",
    updatedAt: "07 Avr 2026 · 11:42",
    controller: "Diallo Mamadou",
    notes: "Rejeté — hors mandat stratégique banques",
  },
];

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOrderPanelOpen, setIsOrderPanelOpen] = useState(false);
  const [orderDraft, setOrderDraft] = useState<OrderDraft | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState("");

  const openOrderPanel = useCallback((draft?: OrderDraft) => {
    setIsAIPanelOpen(false);
    setOrderDraft(draft ?? null);
    setIsOrderPanelOpen(true);
  }, []);

  const closeOrderPanel = useCallback(() => {
    setIsOrderPanelOpen(false);
    setOrderDraft(null);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status, updatedAt: new Date().toLocaleString("fr-FR") }
          : o
      )
    );
  }, []);

  const openAIPanel = useCallback((prompt?: string) => {
    setIsOrderPanelOpen(false);
    setAiInitialPrompt(prompt ?? "");
    setIsAIPanelOpen(true);
  }, []);

  const closeAIPanel = useCallback(() => {
    setIsAIPanelOpen(false);
    setAiInitialPrompt("");
  }, []);

  return (
    <TerminalContext.Provider
      value={{
        isOrderPanelOpen,
        orderDraft,
        openOrderPanel,
        closeOrderPanel,
        orders,
        addOrder,
        updateOrderStatus,
        isAIPanelOpen,
        aiInitialPrompt,
        openAIPanel,
        closeAIPanel,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used within TerminalProvider");
  return ctx;
}
