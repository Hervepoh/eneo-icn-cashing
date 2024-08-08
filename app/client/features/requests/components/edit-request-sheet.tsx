import { z } from "zod";

import { useOpenRequest } from "@/features/requests/hooks/use-open-request";
import { useGetRequest } from "@/features/requests/api/use-get-request";
import { RequestForm } from "@/features/requests/components/request-form";
// import { useOpenRequest } from "@/features/requests/hooks/use-open-request";
// import { RequestForm } from "@/features/requests/components/request-form";
// import { useGetRequest } from "@/features/requests/api/use-get-request";
// import { useEditRequest } from "@/features/requests/api/use-edit-request";
// import { useDeleteRequest } from "@/features/requests/api/use-delete-request";

// import { useCreateAccount } from "@/features/accounts/api/use-create-account";
// import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { useConfirm } from "@/hooks/use-confirm";

import { Loader2 } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";



/* Form validation */

const formSchema = z.object({
    name: z.string(),
    payment_date: z.coerce.date(),
    payment_mode: z.string(),
    bank: z.string(),
    amount: z.string(),
    description: z.string().nullable().optional(),
    //evidence : z.instanceof(FileList).optional(),
});
type FormValues = z.input<typeof formSchema>;
/* Form validation */


export function EditRequestSheet() {
    const { isOpen, onClose, onOpen, id } = useOpenRequest();
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: "You are about to delete this request.",
    });

    const transactionQuery = useGetRequest(id);
    // const editMutation = useEditRequest(id);
    // const deleteMutation = useDeleteRequest(id);


    // const categoryQuery = useGetCategories();
    // const categoryMutation = useCreateCategory();
    // const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
    // const categoryOptions = (categoryQuery.data ?? []).map(
    //     (category) => ({
    //         label: category.name,
    //         value: category.id
    //     })
    // );

    // const accountQuery = useGetAccounts();
    // const accountMutation = useCreateAccount();
    // const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    // const accountOptions = (accountQuery.data ?? []).map(
    //     (account) => ({
    //         label: account.name,
    //         value: account.id
    //     })
    // );



    // const isPending =
    //     editMutation.isPending ||
    //     deleteMutation.isPending ||
    //     categoryMutation.isPending ||
    //     accountMutation.isPending 

    // const isLoading =
    //     transactionQuery.isLoading ||
    //     accountQuery.isLoading ||
    //     categoryQuery.isLoading;

    const defaultValues = transactionQuery.data
        ? {
            date: transactionQuery.data.date
                ? new Date(transactionQuery.data.date)
                : new Date(),
            amount: transactionQuery.data.amount.toString(),
            bank: transactionQuery.data.bank,
            // accountId: transactionQuery.data.accountId,
            // categoryId: transactionQuery.data.categoryId,
            // payee: transactionQuery.data.payee,
            // notes: transactionQuery.data.notes,
        }
        : {
            date: new Date(),
            amount:"",
            // accountId: "",
            // categoryId: "",
            // payee:"",
            // notes:""
        };

    const onSubmit = (values: FormValues) => {
        // editMutation.mutate(values, {
        //     onSuccess: () => {
        //         onClose();
        //     },
        // });
    }
    const onDelete = async () => {
        const ok = await confirm();
        // deleteMutation.mutate(undefined, {
        //     onSuccess: () => {
        //         onClose();
        //     },
        // });
    }

    const isLoading = false; 
    const isPending = false;
    const categoryOptions: never[] = [];
    const onCreateCategory = () => {}
    const accountOptions: never[] = [];
    const onCreateAccount = () => {}
    return (
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4" side="right_special">
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>
                            Edit an existing transaction
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading
                        ? (<div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>)
                        : (
                            <RequestForm
                                id={id}
                                defaultValues={defaultValues}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isPending}
                                categoryOptions={categoryOptions}
                                onCreateCategory={onCreateCategory}
                                accountOptions={accountOptions}
                                onCreateAccount={onCreateAccount}

                            />
                        )
                    }

                </SheetContent>
            </Sheet>
        </>
    )
}
