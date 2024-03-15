import { expect, test } from "@playwright/test"

test("Tock 🥂 WS Resos Test POST", async ({ request }) => {
  const response = await request.post(
    "http://localhost:3000/elysia/tock/reservations",
    {
      data: {
        id: 413,
        business: {
          id: 707,
          name: "Robin's Ravioli",
          domainName: "robins-ravioli",
          locale: "en_US",
          currencyCode: "USD",
          timeZone: "UTC",
        },
        dateTime: "2020-01-01T20:00",
        partySize: 2,
        experience: {
          id: 455,
          name: "Tasting menu",
          amountCents: 1000,
        },
        option: [
          {
            id: 836,
            name: "White wine",
            amountCents: 5000,
          },
          {
            id: 836,
            name: "White wine",
            amountCents: 5000,
          },
        ],
        fee: [],
        customCharge: [],
        keyValue: [],
        subtotalCents: 12000,
        taxRate: 10.5,
        taxCents: 1260,
        serviceChargeRate: 0.0,
        serviceChargeCents: 0,
        selectedGratuityRate: 0.0,
        gratuityCents: 0,
        eventFeeRate: 0.0,
        eventFeeCents: 0,
        totalPriceCents: 12260,
        discount: [
          {
            description: "Discount: Club membership",
            discountType: "SUBTOTAL_COMP",
            amountCents: "1000",
          },
        ],
        netAmountPaidCents: 12260,
        createdTimestamp: 1556639480000,
        lastUpdatedTimestamp: 1556639480000,
        transferredOut: false,
        isCancelled: false,
        ownerPatron: {
          id: 1069,
          email: "loefty@patron.com",
          firstName: "Lœfty",
          lastName: "O'Patron-Reilly",
          phone: "800-588-2300",
          phoneCountryCode: "+1US",
        },
        dinerPatron: {
          id: 1069,
          email: "loefty@patron.com",
          firstName: "Lœfty",
          lastName: "O'Patron-Reilly",
          phone: "800-588-2300",
          phoneCountryCode: "+1 US",
        },
        versionId: 1556639480793,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  expect(response.status()).toBe(200)
})
