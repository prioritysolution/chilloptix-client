const createApi = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`;

export const endPoints = {
  test: `${createApi}test`,
  login: `${createApi}Org/ProcessLogin`,
  getSidebar: `${createApi}Org/GetSideBar`,
  getDashboard: `${createApi}Admin/GetDashboard`,
  getFloor: (orgId: number) => `${createApi}Org/Master/GetFloor/${orgId}`,
  addFloor: `${createApi}Org/Master/AddFloor`,
  updateFloor: `${createApi}Org/Master/UpdateFloor`,
  getChamber: (orgId: number) => `${createApi}Org/Master/GetChamber/${orgId}`,
  getChamberUnderFloor: (orgId: number, floorId: string) =>
    `${createApi}Org/Master/GetFloorChamber/${orgId}/${floorId}`,
  addChamber: `${createApi}Org/Master/AddChamber`,
  updateChamber: `${createApi}Org/Master/UpdateChamber`,
  getRack: (orgId: number) => `${createApi}Org/Master/GetRack/${orgId}`,
  getRackUnderChamber: (orgId: number, chamberId: string) =>
    `${createApi}Org/Master/GetChamberRack/${orgId}/${chamberId}`,
  addRack: `${createApi}Org/Master/AddRack`,
  updateRack: `${createApi}Org/Master/UpdateRack`,
  getPocket: (orgId: number) => `${createApi}Org/Master/GetPocket/${orgId}`,
  getPocketUnderRack: (orgId: number, rackId: string) =>
    `${createApi}Org/Master/GetRackPocket/${orgId}/${rackId}`,
  addPocket: `${createApi}Org/Master/AddPocket`,
  updatePocket: `${createApi}Org/Master/UpdatePocket`,
  getAgent: (orgId: number) => `${createApi}Org/Master/GetAgent/${orgId}`,
  addAgent: `${createApi}Org/Master/AddAgent`,
  updateAgent: `${createApi}Org/Master/UpdateAgent`,
  addRent: `${createApi}Org/Master/AddRent`,
  getBankLedger: `${createApi}Org/Master/GetBankLedger`,
  getBankAccount: (orgId: number) =>
    `${createApi}Org/Master/GetBankAccount/${orgId}`,
  addBankAccount: `${createApi}Org/Master/AddBankAccount`,
  addGeneralBooking: `${createApi}Org/Processing/GeneralBooking`,
  getBankCustomer: (orgId: number, keyword: string) =>
    `${createApi}Org/Processing/GetCustomer/${orgId}/${keyword}`,
  getBookingData: (orgId: number, bookId: number) =>
    `${createApi}Org/Processing/GetBookingData/${orgId}/${bookId}`,
  getBookingSearchData: (orgId: number, type: string, keyword: string) =>
    `${createApi}Org/Processing/SearchBooking/${orgId}/${type}/${keyword}`,
  getBookingDataByBookingNo: (orgId: number, bookNo: string) =>
    `${createApi}Org/Processing/GetBookingDetails/${orgId}/${bookNo}`,
  getBondSearchData: (orgId: number, type: string, keyword: string) =>
    `${createApi}Org/Processing/SearchBond/${orgId}/${type}/${keyword}`,
  getBondDataByBondNo: (orgId: number, bondNo: string) =>
    `${createApi}Org/Processing/GetBondDetails/${orgId}/${bondNo}`,
  addBondEntry: `${createApi}Org/Processing/BondEntry`,
  addRackPosting: `${createApi}Org/Processing/RackPosting`,
  getLogout: `${createApi}Admin/ProcessLogOut`,
};
