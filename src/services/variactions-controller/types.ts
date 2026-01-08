/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Stock {
  id: string;
  tracking: boolean;
  countable: boolean;
  composite: boolean;
  properties: any[];
  sellPrice: {
    UZS: number;
    USD: number;
    ratio: Record<string, number>;
    first: string;
  };
  supplyPrice: {
    UZS: number;
    USD: number;
    ratio: Record<string, number>;
    first: string;
  };
  imported: string;
  impport: number;
  originalImport: number;
  transfer: string | null;
  importCount: string;
  transferCount: string;
  originalImportCount: string;
  supplier: number;
  count: number;
  location: number;
  expirationDate: string | null;
}

export interface Property {
  name: string;
  value: string;
}

export interface ProductProperty {
  name: string;
  value: string;
}

export interface ProductItem {
  id: number;
  taxable: boolean;
  shippable: boolean;
  countable: boolean;
  cookable: boolean;
  composite: boolean;
  scalable: boolean;
  tracking: boolean;
  sellable: boolean;
  vatPercent: number | null;
  name: string;
  technicalCardId: number | null;
  writeOffMethod: number;
  countInBox: number | null;
  zone: number;
  unit: string;
  properties: Property[];
  videos: any[];
  productProperties: ProductProperty[];
  barcode: string;
  showMarket: boolean;
  lastUpdateTime: string;
  technicalCard: boolean;
  baseUnitRatio: any[];
  extraData: any[];
  product: number;
  sku: string;
  crossSellTags: any | null;
  category: number | null;
  supplier: string;
  supplierId: number;
  productName: string;
  brand: number;
  description: string;
  importProperties: any[];
  recSellPrice: number | null;
  recSupplierPrice: number | null;
  correctionType: number;
  shortDescription: string;
  stocks: Stock[];
  images: any[];
  analogs: any[];
  modifiers: any[];
  tags: any[];
}

export interface VariationsResponse {
  page: number;
  items: ProductItem[];
  total_count: number;
}
