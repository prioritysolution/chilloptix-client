interface dataType {
  message: string;
  details: any;
  token?: any;
  org_id?: any;
  org_Name?: any;
  org_Add?: any;
  org_mob?: any;
  org_reg?: any;
  org_reg_date?: any;
  fin_start?: any;
  fin_end?: any;
  fin_id?: any;
}

// Define the return type based on the expected response structure
export interface ApiResponse {
  status: number;
  data: dataType;
}
