"use client";

import { Dock, Loader2, } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import { useGetRequests } from '@/features/requests/api/use-get-requests';
import { useRef } from 'react';


type Props = {}

export default function TransactionsPage(props: Props) {

    const getTransactionsQuery = useGetRequests();
    const transactions = getTransactionsQuery.data || [];

    const isDisabled = getTransactionsQuery.isLoading

    
    const cols = [
        { field: 'id', header: 'id' },
        { field: 'dossard', header: 'Dossard' },
        { field: 'firstname', header: 'Prenom(s)' },
        { field: 'lastname', header: 'Nom(s)' },
        { field: 'birthday', header: 'Date_de_naissance' },
        { field: 'age', header: 'Age' },
        { field: 'sexe', header: 'sexe' },
        { field: 'unit', header: 'Unite_d_appartenance' },
        { field: 'grade', header: 'Grade' },
        { field: 'createdAt', header: 'Date_de_creation' },
        { field: 'updatedAt', header: 'Date_de_modification' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const dt = useRef(null);
    const exportCSV = (selectionOnly: any) => {
        const data = [...transactions];
          // Convert data to CSV format
          const csvData = selectionOnly ? data.filter(item => item.selected) : data;
          const csvRows = [
              ['ID', 'Name', 'Email'], // Header row
              ...csvData.map(item => [item.id, item.name, item.email]) // Data rows
          ];
  
          // Create a CSV string
          const csvString = csvRows.map(row => row.join(',')).join('\n');
          const blob = new Blob([csvString], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
  
          // Create a link element to trigger download
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('download', 'export.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Clean up
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                // const doc = new jsPDF.default(0, 0);
                const doc = new jsPDF.default("p", "mm");

               // doc.autoTable(exportColumns, dataList);
                doc.save(`${module}.pdf`);
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(transactions);
            const workbook = { Sheets: { dataList: worksheet }, SheetNames: ['dataList'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, `${module}`);
        });
    };

    const saveAsExcelFile = (buffer: BlobPart, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const dataList = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(dataList, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };



    if (getTransactionsQuery.isLoading) {
        return (
            <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
                <Card className='border-none drop-shadow-sm'>
                    <CardHeader>
                        <Skeleton className="w-48 h-8" />
                    </CardHeader>
                    <CardContent className='h-[500px] w-full flex items-center justify-center'>
                        <Loader2 className='size-6 text-slate-300 animate-spin' />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Transactions Unpaids Or Not completed </CardTitle>
                    <div className='flex flex-col lg:flex-row items-center gap-x-2 gap-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-extaBold text-xl'>Export</span>
                            <div className="flex align-items-center justify-content-end gap-2">
                                <Button className="bg-green-600" size="icon" onClick={() => exportCSV(false)}>.csv</Button> 
                                <Button className="bg-green-700" size="icon" onClick={exportExcel}>.xls</Button>
                                <Button className="bg-orange-700" size="icon" onClick={exportPdf}>.pdf</Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey='reference'
                        onDelete={(row) => {
                            ""
                            // const ids = row.map((r) => r.original.id);
                            // deleteTransactionsQuery.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

