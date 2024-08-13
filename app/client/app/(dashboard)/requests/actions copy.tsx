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


type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {
    const { onOpen, onClose } = useOpenRequest();
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message: "You are about to delete this transaction",
    });    

    const editMutation = useEditRequest(id);
    const deleteMutation = useDeleteRequest(id);
    const isPending = deleteMutation.isPending

    const router = useRouter();
    const handleSellTask = async () => {
        router.push(`/requests/${id}`)
    }

    const handleValidation = async () => {
        // const ok = await confirm();
        // if (ok) {
        //     // deleteMutation.mutate(undefined, {
        //     //     onSuccess: () => {
        //     //         onClose();
        //     //     },
        //     // });
        // }

    }

    const handleSubmit = async () => {
        editMutation.mutate({ status: status[1] }, {
            onSuccess: () => {
                onClose();
                window.location.reload();
            },
        });

    }

    const handleDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }

    }

    return (
        <>
            <ConfirmationDialog />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className='size-8 p-0'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={handleSellTask}
                    >
                        <PiMarkerCircleLight className="mr-2 size-4" />
                        <span>Completed Commercial Task</span>
                    </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={isPending}
                            onClick={handleValidation}
                        >
                            <PiMarkerCircleLight className="mr-2 size-4" />
                            <span>Validation</span>
                        </DropdownMenuItem>
                 
                        <DropdownMenuItem
                            disabled={isPending}
                            onClick={handleSubmit}
                        >
                            <Send className="mr-2 size-4" />
                            <span>Submit</span>
                        </DropdownMenuItem>
               
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="mr-2 size-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="mr-2 size-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
