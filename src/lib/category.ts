import { Category, Menu } from "@/types";

/**
 * メニューからカテゴリの一覧を取得する関数
 *
 * @param menus - メニューの配列
 * @returns メニューに含まれるカテゴリの配列
 */
export function getCategories(menus: Menu[]): Category[] {
  const categories: Category[] = Array.from(
    new Map(
      menus.map((menu) => [
        // キーとしてカテゴリ名を使用
        menu.category,
        {
          category: menu.category,
          categoryEn: menu.categoryEn,
          categoryZh: menu.categoryZh,
        },
      ]),
    ).values(),
  );

  return categories;
}
