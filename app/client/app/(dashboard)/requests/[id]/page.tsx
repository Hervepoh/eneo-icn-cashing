"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from '@/components/data-table';
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import { SearchForm } from "@/features/search/components/search-form";
import { SearchCheckIcon, SearchCode, SearchIcon, SearchSlash, SearchX } from "lucide-react";
import { BiSearch } from "react-icons/bi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
import { useGetRequest } from "@/features/requests/api/use-get-request";

interface Invoice {
    id: string;
    number: string;
    contract: string;
    amount: number;
}

type Props = {}
const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)




export default function TransactionsDetails() {
    const params = useParams<{ id: string }>();
    const { isLoading, isError, data, error } = useGetRequest(params.id)


    const [invoiceNumber, setInvoiceNumber] = useState('');

    const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: '1', number: 'INV-001', contract: 'INV-001', amount: 500 },
        { id: '2', number: 'INV-002', contract: 'INV-001', amount: 750 },
        { id: '3', number: 'INV-003', contract: 'INV-001', amount: 300 },
        { id: '4', number: 'INV-004', contract: 'INV-001', amount: 1000 },
    ]);

    const handleSearch = () => {
        // Recherche des factures par numéro de facture
        const filteredInvoices = invoices.filter((invoice) =>
            invoice.number.includes(invoiceNumber)
        );
        setInvoices(filteredInvoices);
    };

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

    const [selectedOption, setSelectedOption] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        if (selectRef.current) {
            selectRef.current.click(); // Ferme le menu déroulant
        }
    };
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
                                && <SearchForm key="regroup" label="Regroup number" placeholder="..." />
                            }
                            {
                                selectedOption === 'codecli'
                                && <SearchForm key="invoice" label="Code client" />
                            }
                            {
                                selectedOption === 'contract'
                                && <SearchForm key="invoice" label="Contract number" />
                            }
                            {
                                selectedOption === 'invoice'
                                && <SearchForm key="invoice" label="Bill number" />
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
                            <CardDescription className=" line-clamp-1">
                                {`Customer : ${data?.name ?? ""} , Amount  :  ${data?.amount ?? ""}
                                , payment_mode  :  ${data?.payment_mode ?? ""}
                                 ${data?.bank ?? ""} ${data?.bank ?? ""}`}
                            </CardDescription>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="rounded-lg border"
                        >
                            <ResizablePanel defaultSize={50}>
                                <ScrollArea className="flex h-[700px] items-center justify-center p-6 rounded-md border">
                                    <div className="p-3">
                                        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                                        <Table>
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
                                        </Table>
                                    </div>
                                </ScrollArea>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={50}>
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

