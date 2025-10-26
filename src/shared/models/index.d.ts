import { ComponentType, ElementType } from 'react';
import { LucideIcon } from 'lucide-react';

//***************/
// ICONS
//**************/
export type IconType = ElementType | ComponentType<LucideIcon>;
export type IconPositionType = 'left' | 'right';
export type LabelPositionType = 'left' | 'right';

//********************/
// SELECT OPTION
//*******************/
export interface SelectOption {
    id: string | number;
    label: string;
    value: string;
}

//********************/
// KEY-VALUE ITEM
//*******************/
export interface KeyValueType {
    label: string;
    value: string | number;
}

//************************/
// COLLECTION META DATA
//************************/
export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface MetaLink {
    url: string | null;
    label: string;
    active: boolean;
}
export interface Meta {
    currentPage: number;
    from: number;
    lastPage: number;
    links: MetaLink[];
    path: string;
    perPage: number;
    to: number;
    total: number;
}

//*****************/
// FUNCTIONS
//****************/
export type FnWithNoArgAndVoidReturnType = () => void;


declare module "react-date-range" {
  import { ComponentType } from "react";

  export const DateRange: ComponentType<any>;
  export type RangeKeyDict = Record<string, any>;
  export type Range = {
    startDate?: Date;
    endDate?: Date;
    key: string;
  };
}
