import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RequestForm } from "@/features/requests/components/request-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

type Props = {
    title: string;
    message: string;
};

export const useValidate = ({
    title,
    message,
}: Props): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const defaultValues = {
        name: "",
        amount: "",
        bank: "",
        payment_date: new Date(),
        payment_mode: "",
        // accountId: "",
        // categoryId: "",
        // notes:""
    };

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
                <div className="flex items-center justify-center mt-5 space-x-10 gap-5">
                    {false
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <RequestForm
                                id={"66b795b55acfae366492f880"}
                                defaultValues={defaultValues}
                                onSubmit={() => ""}
                                onDelete={() => ""}
                                disabled={true}
                                bankOptions={[{ label: "", value: "" }]}
                                onCreateBank={() => ""}
                                payModeOptions={[{ label: "", value: "" }]}
                                onCreatePayMode={() => ""}
                                editable={false}

                            />
                        )
                    }
                    <div className="">
                        <Textarea className="text-right">
                            Username

                        </Textarea>
                    </div>

                </div>

                <Button
                    onClick={handleCancel}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="outline"
                >
                    Confirm
                </Button>

            </SheetContent>
        </Sheet>

    )

    return [ConfirmationDialog, confirm];
};
