export interface BoilItemState {
  data: IBoilItemData;
  loading: boolean;
  error: null | string;
  init: boolean;
}

export interface IBoilItemData {
  header: IBoilItemHeader;
  summaryRows: ISummaryRow[];
  weightingRows: IWeightingRow[];
  loadRows: ILoadRow[];
  technologyRows: ITechnologyRow[];
}

export interface ISummaryRow {
  product_id: string;
  product_name: string;
  state: string;
  plan: string;
  fact: string;
}

export interface IWeightingRow {
  product_id: string;
  product_name: string;
  quantity: string;
  lot_id: string;
  lot: string;
  user: string;
  date: string;
  time: string;
}

export interface ILoadRow {
  product_id: string;
  product_name: string;
  lot: string;
  lot_id: string;
  user: string;
  date: string;
  time: string;
}

export interface ITechnologyRow {
  batch_id:string
  code: string;
  name: string;
  temp:string;
  lot:string;
  user: string;
  date: string;
  time: string;
  op_type:string;
}

export interface IBoilItemHeader {
  boil_name: string;
  date: string;
  plant: string;
  marking: string;
}

export enum BoilItemActionTypes {
  FETCH_BOIL_ITEM = "FETCH_BOIL_ITEM",
  FETCH_BOIL_ITEM_SUCCESS = "FETCH_BOIL_ITEM_SUCCESS",
  FETCH_BOIL_ITEM_ERROR = "FETCH_BOIL_ITEM_ERROR",
}

interface FetchBoilItemAction {
  type: BoilItemActionTypes.FETCH_BOIL_ITEM;
}

interface FetchBoilItemSuccessAction {
  type: BoilItemActionTypes.FETCH_BOIL_ITEM_SUCCESS;
  payload: IBoilItemData;
}

interface FetchBoilItemErrorAction {
  type: BoilItemActionTypes.FETCH_BOIL_ITEM_ERROR;
  payload: string;
}

export type BoilItemAction = FetchBoilItemAction | FetchBoilItemSuccessAction | FetchBoilItemErrorAction;
