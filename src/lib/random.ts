import { Menu, RandomMenus } from "@/types";
import { getRandomCombination } from "items-picker";

/**
 * メニューからランダムな組み合わせを取得する関数
 *
 * @param menus - メニューの配列
 * @param maxSum - 総額の上限
 * @param allowDuplicates - 重複許容フラグ
 * @returns ランダムな組み合わせのオブジェクト
 */
export function getRandomMenus(
  menus: Menu[],
  maxSum: number,
  allowDuplicates: boolean,
): RandomMenus {
  // ランダムなメニューの組み合わせを取得する
  const randomMenus = getRandomCombination<Menu>(
    menus,
    "priceWithTax",
    maxSum,
    allowDuplicates,
  );

  // 食塩相当量の総額を取得する
  const totalSalt = parseFloat(
    randomMenus.reduce((sum, menu) => sum + (menu.salt ?? 0), 0).toFixed(2),
  );

  // エネルギーの総額を取得する
  const totalCalorie = randomMenus.reduce(
    (sum, menu) => sum + (menu.calorie ?? 0),
    0,
  );

  // 税込価格の総額を取得する
  const totalPriceWithTax = randomMenus.reduce(
    (sum, menu) => sum + menu.priceWithTax,
    0,
  );

  return {
    menus: randomMenus.sort((a, b) => a.id - b.id),
    totalSalt,
    totalCalorie,
    totalPriceWithTax,
  };
}
