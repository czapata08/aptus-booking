import { Elysia, t } from "elysia";

const BusinessType = t.Object({
  id: t.Number(),
  name: t.String(),
  domainName: t.String(),
  locale: t.String(),
  currencyCode: t.String(),
  timeZone: t.String(),
});

const ExperienceType = t.Object({
  id: t.Number(),
  name: t.String(),
  amountCents: t.Number(),
});

const OptionType = t.Array(
  t.Object({
    id: t.Number(),
    name: t.String(),
    amountCents: t.Number(),
  })
);

const DiscountType = t.Array(
  t.Object({
    description: t.String(),
    discountType: t.String(),
    amountCents: t.String(), // Should ideally be a number if representing cents accurately
  })
);

const PatronType = t.Object({
  id: t.Number(),
  email: t.String(),
  firstName: t.String(),
  lastName: t.String(),
  phone: t.String(),
  phoneCountryCode: t.String(),
});

const ReservationType = t.Object({
  id: t.Number(),
  business: BusinessType,
  dateTime: t.String(),
  partySize: t.Number(),
  experience: ExperienceType,
  option: OptionType,
  fee: t.Array(t.Unknown()), // Define as needed
  customCharge: t.Array(t.Unknown()), // Define as needed
  keyValue: t.Array(t.Unknown()), // Define as needed
  subtotalCents: t.Number(),
  taxRate: t.Number(),
  taxCents: t.Number(),
  serviceChargeRate: t.Number(),
  serviceChargeCents: t.Number(),
  selectedGratuityRate: t.Number(),
  gratuityCents: t.Number(),
  eventFeeRate: t.Number(),
  eventFeeCents: t.Number(),
  totalPriceCents: t.Number(),
  discount: DiscountType,
  netAmountPaidCents: t.Number(),
  createdTimestamp: t.Number(),
  lastUpdatedTimestamp: t.Number(),
  transferredOut: t.Boolean(),
  isCancelled: t.Boolean(),
  ownerPatron: PatronType,
  dinerPatron: PatronType,
  versionId: t.Number(),
});

export const ReservationModelG = new Elysia().model({
  reservation: ReservationType
})

export const reservationModel = new Elysia().model({
  reservation: t.Object({
    id: t.Number(),
    dateTime: t.String(),
    partySize: t.Number(),
    business: BusinessType,
    experience: ExperienceType,
    option: OptionType,
    fee: t.Array(t.Unknown()),
    customCharge: t.Array(t.Unknown()),
    keyValue: t.Array(t.Unknown()),
    subtotalCents: t.Number(),
    taxRate: t.Number(),
    taxCents: t.Number(),
    serviceChargeRate: t.Number(),
    serviceChargeCents: t.Number(),
    selectedGratuityRate: t.Number(),
    gratuityCents: t.Number(),
    eventFeeRate: t.Number(),
    eventFeeCents: t.Number(),
    totalPriceCents: t.Number(),
    discount: DiscountType,
    netAmountPaidCents: t.Number(),
    createdTimestamp: t.Number(),
    lastUpdatedTimestamp: t.Number(),
    transferredOut: t.Boolean(),
    isCancelled: t.Boolean(),
    ownerPatron: PatronType,
    dinerPatron: PatronType,
  }),
});
