export interface PersonalDetailsFormData {
    name?: string;
    age?: number;
    sex?: 'Male' | 'Female';
    mobile?: string;
    govIdType?: 'Aadhar' | 'PAN';
    govId?: string;
  }
  
  export interface AddressDetailsFormData {
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: number;
  }
  