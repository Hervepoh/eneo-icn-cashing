export const status = [
    'deleted', 
    "draft",
    "initiated",
    "validated",
    "rejected" , 
    "pending_commercial_input",
    "pending_finance_validation",
    "processing",
    "treated"  
]

export const statusStyles: { [key: string]: "default" | "success" | "destructive" | "outline" | "secondary" | "primary" | "warning" | null | undefined } = {
    "draft": "destructive",
    "initiated": "primary",
    "validated": "success",
    "rejected": "destructive",
    "pending_commercial_input": "warning",
    "pending_finance_validation": "warning",
    "processing": "default",
    "treated": "success",
  };
  