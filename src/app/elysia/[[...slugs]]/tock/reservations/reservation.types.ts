interface Business {
  id: number;
  name: string;
  domainName: string;
  locale: string;
  currencyCode: string;
  timeZone: string;
}

interface Experience {
  id: number;
  name: string;
  amountCents: number;
}

interface Option {
  id: number;
  name: string;
  amountCents: number;
}

type Discount = Array<{
  description: string;
  discountType: string;
  amountCents: string; // Consider changing to number if possible
}>;

interface Patron {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneCountryCode: string;
}

interface Reservation {
  id: number;
  business: Business;
  dateTime: string;
  partySize: number;
  experience: Experience;
  option: Option[];
  fee: unknown[]; // Define as needed
  customCharge: unknown[]; // Define as needed
  keyValue: unknown[]; // Define as needed
  subtotalCents: number;
  taxRate: number;
  taxCents: number;
  serviceChargeRate: number;
  serviceChargeCents: number;
  selectedGratuityRate: number;
  gratuityCents: number;
  eventFeeRate: number;
  eventFeeCents: number;
  totalPriceCents: number;
  discount: Discount;
  netAmountPaidCents: number;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
  transferredOut: boolean;
  isCancelled: boolean;
  ownerPatron: Patron;
  dinerPatron: Patron;
  versionId: number;
}

export type { Reservation };
