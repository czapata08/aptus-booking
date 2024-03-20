import { Elysia, t } from "elysia"

const Phone = t.Array(t.String())
const Day = t.Array(
  t.Object({
    type: t.String(),
    day: t.Number(),
    month: t.Number(),
    year: t.Number(),
  })
)
const Tag = t.Array(t.String())
const Link = t.Array(
  t.Object({
    type: t.String(),
    link: t.String(),
  })
)
const BusinessGuestProfile = t.Array(
  t.Object({
    tag: Tag,
    business: t.Object({
      id: t.Number(),
      businessGroupId: t.Number(),
      name: t.String(),
    }),
  })
)

const Attribute = t.Array(
  t.Object({
    businessId: t.Number(),
    patronId: t.Number(),
    type: t.String(),
    attribute: t.String(),
    stringValue: t.String(),
  })
)
const Id = t.Number()

const Patron = t.Object({
  id: t.Number(),
  email: t.String(),
  firstName: t.String(),
  lastName: t.String(),
  phone: t.String(),
  zipCode: t.String(),
  status: t.String(),
  isoCountryCode: t.String(),
  phoneCountryCode: t.String(),
})
const Company = t.String()

const Address = t.Object({
  address_1: t.String(),
  address_2: t.String(),
  city: t.String(),
  state: t.String(),
  country: t.String(),
  zipCode: t.String(),
})

const BusinessGroupId = t.Number()

const ImportedProfile = t.Object({
  link: t.Array(t.Unknown()), // Placeholder, adjust according to actual link object structure
  id: t.Number(),
  firstName: t.String(),
  lastName: t.String(),
  company: t.String(),
  jobTitle: t.String(),
  address: t.Object({
    city: t.String(),
    state: t.String(),
    country: t.String(),
  })
})

const CanEdit = t.Boolean()

const UpdatedBy = t.Object({
  id: t.Number(),
  email: t.String(),
  firstName: t.String(),
  lastName: t.String(),
  phone: t.String(),
  zipCode: t.String(),
  status: t.String(),
  isoCountryCode: t.String(),
  phoneCountryCode: t.String(),
})
const IsArchived = t.Boolean()
const OptInSource = t.String()
const VersionId = t.Number()

export const GuestProfileType = t.Object({
  phone: Phone, // Assuming array of strings for phone numbers
  day: Day,
  tag: Tag, // Assuming array of strings for tags
  link: Link,
  businessGuestProfile: BusinessGuestProfile,
  attribute: Attribute,
  id: Id,
  patron: Patron,
  company: Company,
  address: Address,
  businessGroupId: BusinessGroupId,
  importedProfile: ImportedProfile,
  canEdit: CanEdit,
  updatedBy: UpdatedBy,
  isArchived: IsArchived,
  optInSource: OptInSource,
  versionId: VersionId,
})

export const GuestModel = new Elysia().model({
  guest: GuestProfileType,
})
