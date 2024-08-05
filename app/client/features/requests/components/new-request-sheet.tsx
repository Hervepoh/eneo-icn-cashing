import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useNewRequest } from "@/features/requests/hooks/use-new-request";
// import { useNewTransaction } from "@/features/transactions/hooks/use-new-request";
// import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { RequestForm } from "@/features/requests/components/request-form";

// import { useCreateAccount } from "@/features/accounts/api/use-create-account";
// import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

// import { useCreateCategory } from "@/features/categories/api/use-create-category";
// import { useGetCategories } from "@/features/categories/api/use-get-categories";

// import { insertTransactionsSchema } from "@/db/schema";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";




/* Form validation */
// const formSchema = insertTransactionsSchema.omit({
//     id: true,
//     createdBy: true,
//     createdAt: true,
//     updatedAt: true
// });
const formSchema :any = {}
type FormValues = z.input<typeof formSchema>;
/* Form validation */


export function NewRequestSheet() {
    const { isOpen, onClose } = useNewRequest();

    // const mutation = useCreateTransaction();

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
    //     mutation.isPending ||
    //     categoryMutation.isPending ||
    //     accountMutation.isPending

    // const isLoading =
    //     accountQuery.isLoading ||
    //     categoryQuery.isLoading

    // const onSubmit = (values: FormValues) => {
    //     mutation.mutate(values, {
    //         onSuccess: () => {
    //             onClose();
    //         },
    //     });
    // }
    const onSubmit = () => "" ;
    const onCreateCategory = () => "" ;
    const onCreateAccount = () => "" ;
    const accountOptions: { label: string; value: string; }[] = [];
    const categoryOptions: { label: string; value: string; }[] = [];
    const isLoading = false;
    const isPending = false;
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4" side="right_special">
                <SheetHeader>
                    <SheetTitle>New ACI application</SheetTitle>
                    <SheetDescription>
                        Add a new request.
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading
                        ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin" />
                            </div>
                        )
                        : ( 
                            <RequestForm
                                onSubmit={onSubmit}
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
    )
}
