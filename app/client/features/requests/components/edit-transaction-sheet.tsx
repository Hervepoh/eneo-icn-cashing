import { z } from "zod";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-request";
import { TransactionForm } from "@/features/transactions/components/request-form";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { useConfirm } from "@/hooks/use-confirm";

import { Loader2 } from "lucide-react";
import { insertTransactionsSchema } from "@/db/schema";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";


/* Form validation */
const formSchema = insertTransactionsSchema.omit({
    id: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true
});
type FormValues = z.input<typeof formSchema>;
/* Form validation */


export function EditTransactionSheet() {
    const { isOpen, onClose, onOpen, id } = useOpenTransaction();
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: "You are about to delete this transaction.",
    });

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);


    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
    const categoryOptions = (categoryQuery.data ?? []).map(
        (category) => ({
            label: category.name,
            value: category.id
        })
    );

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    const accountOptions = (accountQuery.data ?? []).map(
        (account) => ({
            label: account.name,
            value: account.id
        })
    );



    const isPending =
        editMutation.isPending ||
        deleteMutation.isPending ||
        categoryMutation.isPending ||
        accountMutation.isPending 

    const isLoading =
        transactionQuery.isLoading ||
        accountQuery.isLoading ||
        categoryQuery.isLoading;

    const defaultValues = transactionQuery.data
        ? {
            date: transactionQuery.data.date
                ? new Date(transactionQuery.data.date)
                : new Date(),
            amount: transactionQuery.data.amount.toString(),
            accountId: transactionQuery.data.accountId,
            categoryId: transactionQuery.data.categoryId,
            payee: transactionQuery.data.payee,
            notes: transactionQuery.data.notes,
        }
        : {
            date: new Date(),
            amount:"",
            accountId: "",
            categoryId: "",
            payee:"",
            notes:""
        };

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    }
    const onDelete = async () => {
        const ok = await confirm();
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                onClose();
            },
        });
    }
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
                            <TransactionForm
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
