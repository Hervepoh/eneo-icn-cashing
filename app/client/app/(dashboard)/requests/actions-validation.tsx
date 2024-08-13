"use client"

import React from 'react'
import { Loader2 } from 'lucide-react';
import { PiMarkerCircleLight } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { useValidate } from '@/hooks/use-validate';
import { useEditRequest } from '@/features/requests/api/use-edit-request';
import { toast } from 'sonner';
import { status } from '@/config/status.config';


type Props = {
    id: string;
}

export const ActionsValidations = ({ id }: Props) => {

    const [ConfirmationDialog, confirm] = useValidate({
        id,
        title: "Are you sure ?",
        message: "You are about to validate this transaction , Are you sure you want to perform this action?",
    });

    const editMutation = useEditRequest(id);
    const isPending = editMutation.isPending

    const handleValidation = async () => {
        try {
            const confirmed = await confirm();
            if (confirmed) {
                console.log('good you confirm');
                editMutation.mutate({ status: status[3] }, {
                    onSuccess: () => {
                        toast.success("Ok, transaction going to next step")
                    },
                });

            } else {
                console.log('you canceled');
                // Cancel the action
            }
        } catch (error) {
            console.log(error); // "bad you reject"
            // Handle the rejection
        }
    }


    return (
        <>
            <ConfirmationDialog />
            <Button
                variant={"blue"}
                onClick={handleValidation}
                disabled={isPending}
            >
                {isPending ? <Loader2 /> : <PiMarkerCircleLight className="mr-2 size-4" />}  Validatation
            </Button>
        </>
    )
}
