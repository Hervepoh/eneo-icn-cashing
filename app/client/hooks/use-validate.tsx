import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetRequest } from "@/features/requests/api/use-get-request";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    id: string;
    title: string;
    message: string;
};

export const useValidate = ({
    id,
    title,
    message
}: Props): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
        reject: (reason?: any) => void;
    } | null>(null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve, reject });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        console.log("good you confirm");
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const handleReject = () => {
        promise?.reject("bad you reject");
        handleClose();
    };

    const transactionQuery = useGetRequest(id);
    const isLoading = transactionQuery.isLoading;

    const ConfirmationDialog = () => (
        <Sheet open={promise !== null} >
            <SheetTrigger asChild>Open</SheetTrigger >
            <SheetContent className="space-y-4" side={"bottom"}>
                <SheetHeader>
                    <SheetTitle className="text-center">{title}</SheetTitle>
                    <SheetDescription className="text-center">
                        {message}
                    </SheetDescription>
                </SheetHeader>
                {isLoading ?
                    (<Loading />)
                    : (
                        <>
                            <div className="border-b lg:flex gap-5 m-5 items-center justify-center pb-4 mb-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-gray-500 font-medium">Noms & Prénoms du client</p>
                                        <p className="font-medium">{transactionQuery.data.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Montant</p>
                                        <p className="font-medium">{transactionQuery.data.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Date de paiement</p>
                                        <p className="font-medium">{transactionQuery.data.payment_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Mode de paiement</p>
                                        <p className="font-medium">{transactionQuery.data.payment_mode}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Banque</p>
                                        <p className="font-medium">{transactionQuery.data.bank}</p>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-gray-500 font-medium">Proof of payment</p>
                                        <p className="font-medium">Marketing</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-gray-500 font-medium">Nom</p>
                                        <p className="font-medium">John Doe</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Email</p>
                                        <p className="font-medium">john.doe@example.com</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Téléphone</p>
                                        <p className="font-medium">+1 (555) 555-5555</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">Département</p>
                                        <p className="font-medium">Marketing</p>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col-reverse items-center mt-5 p-6 pt-0 justify-between gap-5">
                                <Button
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <div className="flex gap-5">
                                    <Button
                                        onClick={handleReject}
                                        variant="destructive"
                                        className="mr-4"
                                    >
                                        <ThumbsDown className="mr-2 h-4 w-4" /> Rejet ICN
                                    </Button>
                                    <Button
                                        onClick={handleConfirm}
                                        variant="success"
                                    >
                                        Approve ICN <ThumbsUp className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )

                }
            </SheetContent>
        </Sheet>

    )

    return [ConfirmationDialog, confirm];
};


export const Loading = () => {

    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-8 lg:w-[120px] w-full' />
            </CardHeader>
            <CardContent>
                <div className='h-[350px] w-full flex items-center justify-center'>
                    <Loader2 className='size-6 text-slate-300 animate-spin' />
                </div>
            </CardContent>
        </Card>
    )
}
