"use client"
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, SearchCheckIcon, SearchCode, SearchIcon, SearchSlash, SearchX } from "lucide-react";
import { BiSearch } from "react-icons/bi";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"
import { DataTable } from './_components/data-table';

import { cn } from "@/lib/utils";

import { useGetRequest } from "@/features/requests/api/use-get-request";
import { SearchByInvoiceForm } from "@/features/search/components/search-by-invoice-form";
import { SearchByContractForm } from "@/features/search/components/search-by-contract-form";
import { SearchByRegroupForm } from "@/features/search/components/search-by-regroup-form";
import { SearchByCodeCliForm } from "@/features/search/components/search-by-codecli-from";
import { columns } from "./_components/columns";

interface Invoice {
    id: string;
    number: string;
    contract: string;
    amount: number;
}

export default function TransactionsDetails() {
    const params = useParams<{ id: string }>();
    const { isLoading, isError, data, error } = useGetRequest(params.id)
    const [searchError, setSearchError] = useState("")
    const [isFirstView, setIsFirstView] = useState(true);

    const [searchIsLoading, setSearchIsLoading] = useState(false)

    const [invoiceNumber, setInvoiceNumber] = useState('');

    const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
    //const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [invoices, setInvoices] = useState([]);

    const handleSelect = (invoice: Invoice) => {
        if (selectedInvoices.some((i) => i.id === invoice.id)) {
            setSelectedInvoices(selectedInvoices.filter((i) => i.id !== invoice.id));
        } else {
            setSelectedInvoices([...selectedInvoices, invoice]);
        }
    };

    const totalAmount = selectedInvoices.reduce(
        (total, invoice) => total + invoice.amount,
        0
    );

    // Search criteria action
    const [selectedOption, setSelectedOption] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        if (selectRef.current) {
            selectRef.current.click(); // Ferme le menu déroulant
        }
    };
    console.log("invoices",invoices)

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:gap-8 pb-2 mb-8">
                <Card className='border-none drop-shadow-sm '>
                    <CardHeader className='gap-y-2 flex-row lg:items-center justify-between'>
                        <div>
                            <CardTitle className='text-2xl line-clamp-1'>Search ...</CardTitle>
                            <CardDescription>Unpaid bill</CardDescription>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center gap-x-2 gap-y-2'>
                            <BiSearch size={48} className="sm:w-15" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div ref={selectRef} className={cn("space-y-2", "mb-5")}>
                                <Label>Criteria</Label>
                                <Select value={selectedOption} onValueChange={handleOptionChange}>
                                    <SelectTrigger className="" >
                                        <SelectValue placeholder="Select a criteria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="regroup">Regroupment code</SelectItem>
                                        <SelectItem value="codecli">Client code</SelectItem>
                                        <SelectItem value="contract">Contract number</SelectItem>
                                        <SelectItem value="invoice">Bill number</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {
                                selectedOption === 'regroup'
                                &&
                                <SearchByRegroupForm
                                    key="regroup"
                                    label="Regroup number"
                                    placeholder="value"
                                    setInvoices={setInvoices}
                                    setIsFirstView={setIsFirstView}
                                    setError={setSearchError}
                                    setIsPending={setSearchIsLoading}
                                />
                            }
                            {
                                selectedOption === 'codecli'
                                &&
                                <SearchByCodeCliForm
                                    key="codecli"
                                    label="client number"
                                    placeholder="value"
                                    setInvoices={setInvoices}
                                    setIsFirstView={setIsFirstView}
                                    setError={setSearchError}
                                    setIsPending={setSearchIsLoading}
                                />
                            }
                            {
                                selectedOption === 'contract'
                                &&
                                <SearchByContractForm
                                    key="contract"
                                    label="Contract number"
                                    placeholder="value"
                                    setInvoices={setInvoices}
                                    setIsFirstView={setIsFirstView}
                                    setError={setSearchError}
                                    setIsPending={setSearchIsLoading}
                                />
                            }
                            {
                                selectedOption === 'invoice'
                                &&
                                <SearchByInvoiceForm
                                    key="invoice"
                                    label="Bill number"
                                    placeholder="value"
                                    setInvoices={setInvoices}
                                    setIsFirstView={setIsFirstView}
                                    setError={setSearchError}
                                    setIsPending={setSearchIsLoading}
                                />
                            }

                        </div>

                    </CardContent>
                </Card>
                <Card className='border-none drop-shadow-sm col-span-3'>
                    <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
                        <div className='space-y-2'>
                            <CardTitle className="text-2xl line-clamp-1">
                                {`Reference ACI : ${data?.reference ?? ""}`}
                            </CardTitle>
                            {
                                isLoading ?
                                    (<Skeleton className="w-[500px] h-[20px] rounded-full" />) :
                                    (<CardDescription className="line-clamp-1 flex gap-3">
                                        <div>Customer : <span className="font-bold text-md">{data?.name ?? ""}</span></div>
                                        <div>Amount  :  xfa  <span className="font-bold text-md">{data?.amount}</span></div>
                                        <div>Date  :   <span className="font-bold text-md">{data?.amount}</span></div>
                                        <div>Bank :  <span className="font-bold">{data?.bank.name}</span></div>
                                    </CardDescription>)
                            }

                        </div>

                    </CardHeader>
                    <CardContent>
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="rounded-lg border"
                        >
                            <ResizablePanel defaultSize={100}>
                                <ScrollArea className="flex h-[700px] items-center justify-center p-6 rounded-md">
                                    {
                                        searchIsLoading ? <LoadingCard /> :
                                            isFirstView ? <DefaultCard /> :
                                                <DataTable
                                                    columns={columns}
                                                    data={invoices}
                                                    filterKey={"3"}
                                                    onSubmit={(row: any[]) => {
                                                        const ids = row.map((r: any) => r.original.invoice);
                                                        // deleteTransactionsQuery.mutate({ ids });
                                                    }}
                                                    disabled={false}
                                                />
                                    }
                                    {


                                        //     !!invoices.length && (
                                        // <div className="p-3">
                                        //     <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                                        //     <Table>
                                        //         <TableHeader>
                                        //             <TableRow>
                                        //                 <TableHead className=""></TableHead>
                                        //                 <TableHead>regroup</TableHead>
                                        //                 <TableHead>contract</TableHead>
                                        //                 <TableHead className="">invoice</TableHead>
                                        //                 <TableHead className="">Name</TableHead>
                                        //                 <TableHead className="">Date</TableHead>
                                        //                 <TableHead className="">Amount</TableHead>
                                        //             </TableRow>
                                        //         </TableHeader>
                                        //         <TableBody>
                                        //             {invoices.map((invoice, i) => (
                                        //                 <TableRow key={i++}>
                                        //                     <TableCell className="font-medium">
                                        //                         <Checkbox key={i} value={i} />
                                        //                     </TableCell>
                                        //                     <TableCell className="font-medium">{invoice[0]}</TableCell>
                                        //                     <TableCell className="font-medium">{invoice[1]}</TableCell>
                                        //                     <TableCell className="font-medium">{invoice[2]}</TableCell>
                                        //                     <TableCell className="font-medium">{invoice[3]}</TableCell>
                                        //                     <TableCell className="font-medium">{invoice[4]}</TableCell>
                                        //                     <TableCell className="font-medium">{invoice[5]}</TableCell>
                                        //                 </TableRow>
                                        //             ))}
                                        //         </TableBody>
                                        //     </Table>
                                        // </div>
                                        // )
                                    }
                                </ScrollArea>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={0}>
                                <ResizablePanelGroup direction="vertical">
                                    <ResizablePanel defaultSize={25}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Two</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle />
                                    <ResizablePanel defaultSize={75}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <Table>
                                                <TableCaption>A list of your recent invoices.</TableCaption>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className=""></TableHead>
                                                        <TableHead>regroup</TableHead>
                                                        <TableHead>contract</TableHead>
                                                        <TableHead className="">invoice</TableHead>
                                                        <TableHead className="">Name</TableHead>
                                                        <TableHead className="">Date</TableHead>
                                                        <TableHead className="">Amount</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[1, 2, 3, 5, 6, 9, 10, 11].map((invoice, i) => (
                                                        <TableRow key={i++}>
                                                            <TableCell className="font-medium">
                                                                <Checkbox key={i} value={i} />
                                                            </TableCell>
                                                            <TableCell className="font-medium"></TableCell>
                                                            <TableCell className="font-medium">200050122</TableCell>
                                                            <TableCell className="font-medium">200072655</TableCell>
                                                            <TableCell>DONGMO SABINE</TableCell>
                                                            <TableCell>25/06/2010</TableCell>
                                                            <TableCell>797</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                                <TableFooter>
                                                    <TableRow>
                                                        <TableCell colSpan={4}>Total</TableCell>
                                                        <TableCell className="text-right">$2,500.00</TableCell>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export const LoadingCard = () => {
    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader>
                <Skeleton className="w-48 h-8" />
            </CardHeader>
            <CardContent className='h-[500px] w-full flex items-center justify-center'>
                <Loader2 className='size-6 text-slate-300 animate-spin' /> Searching...
            </CardContent>
        </Card>
    )
}

export const DefaultCard = () => {
    return (
        <Card className='border-none drop-shadow-sm'>
            <CardContent className='h-[500px] w-full flex flex-col items-center text-xl text-bold justify-center'>
                <div className="text-2xl"><BiSearch size={52} className="sm:w-15" /></div>
                <div>Just Search what you want</div>
            </CardContent>
        </Card>
    )
}