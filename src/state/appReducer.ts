import { AppData, Customer, Settings } from '../types';
import { nowISODateTime, todayISO } from '../utils/date';

export type AppAction =
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: Customer }
  | { type: 'DELETE_CUSTOMER'; payload: { id: string } }
  | { type: 'COMPLETE_ACTION'; payload: { id: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Settings }
  | { type: 'IMPORT_DATA'; payload: AppData }
  | { type: 'RESET_DATA'; payload: AppData };

export function appReducer(state: AppData, action: AppAction): AppData {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };

    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map((c) =>
          c.id === action.payload.id ? { ...action.payload, updatedAt: nowISODateTime() } : c
        ),
      };

    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter((c) => c.id !== action.payload.id),
      };

    case 'COMPLETE_ACTION':
      // Revision 06: cập nhật Last Contact = hôm nay, xóa Next Action + Next Follow Up.
      return {
        ...state,
        customers: state.customers.map((c) =>
          c.id === action.payload.id
            ? {
                ...c,
                lastContact: todayISO(),
                nextActionType: null,
                nextFollowUpDate: null,
                updatedAt: nowISODateTime(),
              }
            : c
        ),
      };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.payload };

    case 'IMPORT_DATA':
      return action.payload;

    case 'RESET_DATA':
      return action.payload;

    default:
      return state;
  }
}
