## Elysia Server For Tock Webhook Integration

## Webhook POST Routes

                    DEV | PROD |

- [reservations] [] []
- [guests] [] []

## Testing CURL Command For Routes

<!-- Guests -->

curl -X POST http://localhost:3000/elysia/tock/guests \
-H "Content-Type: application/json" \
-d '{
"phone": ["123-456-7890"],
"day": [{"type": "birthday", "day": 1, "month": 1, "year": 1990}],
"tag": ["VIP"],
"link": [{"type": "social", "link": "http://example.com"}],
"businessGuestProfile": [{"tag": ["VIP"], "business": {"id": 1, "businessGroupId": 1, "name": "Tock"}}],
"attribute": [{"businessId": 1, "patronId": 1, "type": "preference", "attribute": "food", "stringValue": "vegan"}],
"id": 1,
"patron": {"id": 1, "email": "example@example.com", "firstName": "John", "lastName": "Doe", "phone": "123-456-7890", "zipCode": "12345", "status": "active", "isoCountryCode": "US", "phoneCountryCode": "1"},
"company": "Tock",
"address": {"address_1": "123 Tock St", "address_2": "", "city": "Tocktown", "state": "TK", "country": "Tockland", "zipCode": "12345"},
"businessGroupId": 1,
"importedProfile": {"link": [], "id": 1, "firstName": "John", "lastName": "Doe", "company": "Tock", "jobTitle": "CEO", "address": {"city": "Tocktown", "state": "TK", "country": "Tockland"}},
"canEdit": true,
"updatedBy": {"id": 1, "email": "updater@example.com", "firstName": "Jane", "lastName": "Doe", "phone": "123-456-7890", "zipCode": "12345", "status": "active", "isoCountryCode": "US", "phoneCountryCode": "1"},
"isArchived": false,
"optInSource": "website",
"versionId": 1
}'

<!-- Reservations -->
<!-- Using EOF to scape error for json structure because of special charactes like "Robin's" apos -->

curl -X POST http://localhost:3000/elysia/tock/reservations \
-H "Content-Type: application/json" \
-d @- <<'EOF'
{
"id": 413,
"business": {
"id": 707,
"name": "Robin's Ravioli",
"domainName": "robins-ravioli",
"locale": "en_US",
"currencyCode": "USD",
"timeZone": "UTC"
},
"dateTime": "2020-01-01T20:00",
"partySize": 2,
"experience": {
"id": 455,
"name": "Tasting menu",
"amountCents": 1000
},
"option": [
{
"id": 836,
"name": "White wine",
"amountCents": 5000
},
{
"id": 836,
"name": "White wine",
"amountCents": 5000
}
],
"fee": [],
"customCharge": [],
"keyValue": [],
"subtotalCents": 12000,
"taxRate": 10.5,
"taxCents": 1260,
"serviceChargeRate": 0.0,
"serviceChargeCents": 0,
"selectedGratuityRate": 0.0,
"gratuityCents": 0,
"eventFeeRate": 0.0,
"eventFeeCents": 0,
"totalPriceCents": 12260,
"discount": [
{
"description": "Discount: Club membership",
"discountType": "SUBTOTAL_COMP",
"amountCents": "1000"
}
],
"netAmountPaidCents": 12260,
"createdTimestamp": 1556639480000,
"lastUpdatedTimestamp": 1556639480000,
"transferredOut": false,
"isCancelled": false,
"ownerPatron": {
"id": 1069,
"email": "loefty@patron.com",
"firstName": "Lœfty",
"lastName": "O'Patron-Reilly",
"phone": "800-588-2300",
"phoneCountryCode": "+1US"
},
"dinerPatron": {
"id": 1069,
"email": "loefty@patron.com",
"firstName": "Lœfty",
"lastName": "O'Patron-Reilly",
"phone": "800-588-2300",
"phoneCountryCode": "+1 US"
},
"versionId": 1556639480793
}
EOF