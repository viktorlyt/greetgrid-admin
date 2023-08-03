import { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
    title: string;
    labelName: string;
}

export interface FormValues {
    title: string;
    description: string;
    propertyType: string;
    location: string;
    price: number | undefined;
}

export interface AdminCardProps {
    id?: BaseKey | undefined;
    name: string;
    email: string;
    password?: string;
    role: string;
}