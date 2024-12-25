import { UseFormReturn, SubmitHandler } from "react-hook-form";

export interface AgentFormData {
  agentName: string;
  gurdianName: string;
  address: string;
  mobile: string;
  email: string;
  amount: string;
  commissionType: string;
  commissionRate: string;
}

interface AgentBody {
  org_id: number | null;
  agent_id?: number;
  agent_name: string;
  agent_rel: string;
  agent_add: string;
  agent_mob: string;
  percent: string;
  comm_rate: string;
  agent_mail: string;
  dep_amt: string;
}

export interface AgentProps {
  addAgentLoading: boolean;
  updateAgentLoading: boolean;
  loading: boolean;
  form: UseFormReturn<AgentFormData, any, undefined>;
  handleSubmit: SubmitHandler<AgentFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: AgentTableData | null;
  handleEditData: (data: AgentTableData) => void;
}

export interface AgentFormProps {
  addAgentLoading: boolean;
  updateAgentLoading: boolean;
  form: UseFormReturn<AgentFormData, any, undefined>;
  handleSubmit: SubmitHandler<AgentFormData>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editData: AgentTableData | null;
}

export interface AgentTableProps {
  handleEditData: (data: AgentTableData) => void;
}

export interface AgentTableData {
  Id: number;
  Agent_Name: string;
  Relation_Name: string;
  Address: string;
  Mobile: string;
  Mail: string;
  Deposit_Amt: string;
  Is_Percent: number;
  Comm_Rate: string;
}
