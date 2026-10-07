import { prisma } from "@/lib/prisma";

export interface PaymentMethodConfigData {
  id?: string;
  methodId: "bkash" | "nagad" | "rocket";
  name: string;
  isActive: boolean;
  accountType: "MERCHANT" | "PERSONAL" | "AGENT";

  // Legacy fallback fields
  number?: string;
  counter?: string;
  instructions?: string;

  // Merchant specific
  merchantNumber: string;
  merchantCounter: string;
  merchantInstructions: string;

  // Personal specific
  personalNumber: string;
  personalInstructions: string;

  // Agent specific
  agentNumber: string;
  agentInstructions: string;

  displayOrder: number;
}

export const DEFAULT_PAYMENT_METHODS: PaymentMethodConfigData[] = [
  {
    methodId: "bkash",
    name: "bKash",
    isActive: true,
    accountType: "MERCHANT",
    number: "01892-019281",
    counter: "1",
    instructions: "Open your bKash app, select 'Make Payment' to our merchant number, and enter the received Transaction ID (TrxID) below.",
    merchantNumber: "01892-019281",
    merchantCounter: "1",
    merchantInstructions: "Open your bKash app, select 'Make Payment' to our merchant number, and enter the received Transaction ID (TrxID) below.",
    personalNumber: "01892-019281",
    personalInstructions: "Open your bKash app or dial *247#, select 'Send Money' to our personal number, and enter the received Transaction ID (TrxID) below.",
    agentNumber: "01892-019281",
    agentInstructions: "Cash out to our agent number using your bKash app or from your nearest bKash agent point, and enter the received Transaction ID (TrxID) below.",
    displayOrder: 1,
  },
  {
    methodId: "nagad",
    name: "Nagad",
    isActive: true,
    accountType: "MERCHANT",
    number: "01918-293810",
    counter: "1",
    instructions: "Open your Nagad app, select 'Merchant Pay' to our merchant number, and enter the received Transaction ID (TrxID) below.",
    merchantNumber: "01918-293810",
    merchantCounter: "1",
    merchantInstructions: "Open your Nagad app, select 'Merchant Pay' to our merchant number, and enter the received Transaction ID (TrxID) below.",
    personalNumber: "01918-293810",
    personalInstructions: "Open your Nagad app or dial *167#, select 'Send Money' to our personal number, and enter the received Transaction ID (TrxID) below.",
    agentNumber: "01918-293810",
    agentInstructions: "Cash out to our agent number using your Nagad app or from your nearest Nagad agent point, and enter the received Transaction ID (TrxID) below.",
    displayOrder: 2,
  },
  {
    methodId: "rocket",
    name: "Rocket",
    isActive: true,
    accountType: "MERCHANT",
    number: "01712-345678",
    counter: "1",
    instructions: "Open your Rocket app, select 'Merchant Pay' to our merchant number, and enter the received Transaction ID (TrxID) below.",
    merchantNumber: "01712-345678",
    merchantCounter: "1",
    merchantInstructions: "Open your Rocket app, select 'Merchant Pay' to our merchant number, and enter the received Transaction ID (TrxID) below.",
    personalNumber: "01712-345678",
    personalInstructions: "Open your Rocket app or dial *322#, select 'Send Money' to our personal number, and enter the received Transaction ID (TrxID) below.",
    agentNumber: "01712-345678",
    agentInstructions: "Cash out to our agent number using your Rocket app or from your nearest Rocket agent point, and enter the received Transaction ID (TrxID) below.",
    displayOrder: 3,
  },
];

export async function getOrSeedPaymentMethods() {
  try {
    const existing = await prisma.paymentMethodSetting.findMany({
      orderBy: { displayOrder: "asc" },
    });

    if (existing.length === 0) {
      for (const item of DEFAULT_PAYMENT_METHODS) {
        await prisma.paymentMethodSetting.create({
          data: item,
        });
      }
      return await prisma.paymentMethodSetting.findMany({
        orderBy: { displayOrder: "asc" },
      });
    }

    // Ensure all 3 default gateways exist and have per-account-type configs filled
    for (const item of DEFAULT_PAYMENT_METHODS) {
      const found = existing.find((m) => m.methodId === item.methodId);
      if (!found) {
        await prisma.paymentMethodSetting.create({
          data: item,
        });
      } else if (!found.merchantInstructions || !found.personalInstructions || !found.agentInstructions) {
        // Migrate existing row with new per-account-type defaults
        await prisma.paymentMethodSetting.update({
          where: { id: found.id },
          data: {
            merchantNumber: found.merchantNumber || found.number || item.merchantNumber,
            merchantCounter: found.merchantCounter || found.counter || item.merchantCounter,
            merchantInstructions: found.merchantInstructions || found.instructions || item.merchantInstructions,
            personalNumber: found.personalNumber || found.number || item.personalNumber,
            personalInstructions: found.personalInstructions || item.personalInstructions,
            agentNumber: found.agentNumber || found.number || item.agentNumber,
            agentInstructions: found.agentInstructions || item.agentInstructions,
          },
        });
      }
    }

    return await prisma.paymentMethodSetting.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Error retrieving payment methods:", error);
    return DEFAULT_PAYMENT_METHODS;
  }
}
