"use client"
import React, { useEffect, useState } from 'react'

// import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
// import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction';

import { Edit, MoreHorizontal, Send, Trash, Trash2, User } from 'lucide-react';
import { useConfirm } from '@/hooks/use-confirm';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { useOpenRequest } from '@/features/requests/hooks/use-open-request';
import { PiMarkerCircleLight, PiSquareHalfBottomThin } from 'react-icons/pi';
import { useDeleteRequest } from '@/features/requests/api/use-delete-request';
import { useRouter } from 'next/navigation';
import { useEditRequest } from '@/features/requests/api/use-edit-request';
import { status } from '@/config/status.config';
import { useValidate } from '@/hooks/use-validate';


type Props = {
    id: string;
}

export const ActionsValidations = ({ id }: Props) => {
    const [ConfirmationDialog, confirm] = useValidate({
        title: "Are you sure?",
        message: "You are about to validate this transaction",
    });

    const editMutation = useEditRequest(id);
    const isPending = editMutation.isPending

    const handleValidation = async () => {
        const ok = await confirm();
        if (ok) {
        //     // editMutation.mutate(undefined, {
        //     //     onSuccess: () => {
        //     //         onClose();
        //     //     },
        //     // });
        }
    }


    return (
        <>
            <ConfirmationDialog />
            <Button
                variant={"success"}
                onClick={handleValidation}
                disabled={isPending}
            >
                 <PiMarkerCircleLight className="mr-2 size-4" /> Validatation
            </Button>
        </>
    )
}
