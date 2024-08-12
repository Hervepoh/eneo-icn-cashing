"use client";

// ShadCn
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LivePreview from "./_components/LivePreview";


type Props = {}

const BillActions = (props: Props) => {
  return (
    <div className={`xl:w-[45%]`}>
        <Card className="h-auto sticky top-0 px-2">
            <CardHeader>
                <CardTitle>ACTIONS</CardTitle>
                <CardDescription>Operations and preview</CardDescription>
            </CardHeader>

            <div className="flex flex-col flex-wrap items-center gap-2">
              
                <div className="flex flex-wrap gap-3">
                    {/* Load modal button */}
                    {/* <InvoiceLoaderModal>
                        <BaseButton
                            variant="outline"
                            tooltipLabel="Open load invoice menu"
                            disabled={invoicePdfLoading}
                        >
                            <FolderUp /> */}
                            Load Invoice
                        {/* </BaseButton>
                    </InvoiceLoaderModal> */}

                    {/* Export modal button */}
                    {/* <InvoiceExportModal>
                        <BaseButton
                            variant="outline"
                            tooltipLabel="Open load invoice menu"
                            disabled={invoicePdfLoading}
                        >
                            <Import />
                            Export Invoice
                        </BaseButton>
                    </InvoiceExportModal> */}
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* New invoice button */}
                    {/* <NewInvoiceAlert>
                        <BaseButton
                            variant="outline"
                            tooltipLabel="Get a new invoice form"
                            disabled={invoicePdfLoading}
                        >
                            <Plus />
                            New Invoice
                        </BaseButton>
                    </NewInvoiceAlert> */}

                    {/* Generate pdf button */}
                    {/* <BaseButton
                        type="submit"
                        tooltipLabel="Generate your invoice"
                        loading={invoicePdfLoading}
                        loadingText="Generating your invoice"
                    >
                        <FileInput />
                        Generate PDF
                    </BaseButton> */}
                </div>

                <div className="w-full">
                    {/* Live preview and Final pdf */}
                    <LivePreview  data={[]}/>
                </div>
            </div>
        </Card>
    </div>
);

}

export default BillActions