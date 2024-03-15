type Phone = string;

interface Day {
  type: string;
  day: number;
  month: number;
  year: number;
}

type Tag = string;

interface Link {
  type: string;
  link: string;
}

interface Business {
  id: number;
  businessGroupId: number;
  name: string;
}

interface BusinessGuestProfile {
  tag: Tag[];
  business: Business;
}

interface Attribute {
  businessId: number;
  patronId: number;
  type: string;
  attribute: string;
  stringValue: string;
}

interface Patron {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  zipCode: string;
  status: string;
  isoCountryCode: string;
  phoneCountryCode: string;
}

interface Address {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface ImportedProfile {
  // Assuming unknown structure for link array
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  address: {
    city: string;
    state: string;
    country: string;
  }
}

export interface GuestProfile {
  phone: Phone[];
  day: Day[];
  tag: Tag[];
  link: Link[];
  businessGuestProfile: BusinessGuestProfile[];
  attribute: Attribute[];
  id: number;
  patron: Patron;
  company: string;
  address: Address;
  businessGroupId: number;
  importedProfile: ImportedProfile;
  canEdit: boolean;
  updatedBy: Patron; // Assuming same structure as Patron
  isArchived: boolean;
  optInSource: string;
  versionId: number;
}
