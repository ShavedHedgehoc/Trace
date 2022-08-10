import { AxiosResponse } from "axios";
import { $api } from "../";

import { ApiRoutes } from '../apiRoutes';


export default class DocumentService {
    static async doc_count(): Promise<AxiosResponse<number>> {
        // return $old_api.get<number>(ApiRoutes.DOC_COUNTER)
        return $api.get<number>(ApiRoutes.DOC_COUNTER)
    }
}