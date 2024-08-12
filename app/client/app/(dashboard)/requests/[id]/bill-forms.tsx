import React from 'react'
import { useMemo } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import Items from './_components/items';
type Props = {}

function BillForms({ }: Props) {
  return (
    <div className={`xl:w-[55%]`}>
      <Card>
        <CardHeader>
          <div className="flex gap-3">
            <CardTitle className="flex items-center gap-3">
              <span className="uppercase">
                {`_t("form.title")`}
              </span>
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              <p style={{ fontSize: "14px" }}>
                {`invoiceNumberLabel`}
              </p>
            </Badge>
          </div>
          <CardDescription>{`_t("form.description")`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* <Items /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );

}

export default BillForms