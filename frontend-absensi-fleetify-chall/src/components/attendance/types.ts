// types.ts

export interface Departement {
    id: number;
    departement_name: string;
    max_clock_in_time: string;
    max_clock_out_time: string;
}

export interface Employee {
    id: number;
    employee_id: string;
    departement_id: number;
    name: string;
    address?: string | null;
}

export interface LogRow {
    employee: string;
    departement: string;
    clock_in: string | null;
    clock_out: string | null;
    status_masuk: string;
    status_keluar: string;
}
