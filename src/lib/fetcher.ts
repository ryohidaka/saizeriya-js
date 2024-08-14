import { MENU_JSON_URL } from "@/constants";
import { Menu } from "@/types";
import { objectToCamel } from "ts-case-convert";

/**
 * メニュー一覧を取得する非同期関数
 * @param {boolean} cache - キャッシュを使用するかどうか（デフォルト: true）
 * @returns {Promise<Menu[]>} - メニューの配列を返すPromise
 */
export async function fetchMenus(cache: boolean = true): Promise<Menu[]> {
  try {
    // データをフェッチする
    const response = await fetch(MENU_JSON_URL, {
      cache: cache ? "force-cache" : "no-cache",
    });

    // フェッチに失敗した場合、エラーメッセージを投げる
    if (!response.ok) {
      throw new Error(`データの取得に失敗しました: ${response.statusText}`);
    }

    // フェッチしたデータをJSON形式で返す
    const data = await response.json();
    return objectToCamel<Menu[]>(data.menus);
  } catch (error) {
    // エラーが発生した場合、エラーメッセージを出力し、空の配列を返す
    console.error("メニューの読み込み中にエラーが発生しました:", error);
    return [];
  }
}
