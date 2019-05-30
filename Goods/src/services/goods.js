import { stringify } from "qs";
import request from "@/utils/request";
export async function queryGoods() {
    return request("/api/goods");
}
