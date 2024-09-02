import { Genre, Menu } from "@/types";

/**
 * メニューからジャンルの一覧を取得する関数
 *
 * @param menus - メニューの配列
 * @returns メニューに含まれるジャンルの配列
 */
export function getGenres(menus: Menu[]): Genre[] {
  // ジャンルを一意に取得し、Setを利用して重複を排除
  const genres: string[] = Array.from(new Set(menus.map((menu) => menu.genre)));

  return genres as Genre[];
}

/**
 * メニューから旧ジャンルの一覧を取得する関数
 *
 * @param menus - メニューの配列
 * @returns メニューに含まれるジャンルの配列
 */
export function getPreGenres(menus: Menu[]): Genre[] {
  // メニューからpreIdが存在するものの先頭2文字を取得し、Setで重複を排除
  const uniqueGenres = new Set(
    menus.filter((menu) => menu.preId).map((menu) => menu.preId!.slice(0, 2)),
  );

  return Array.from(uniqueGenres) as Genre[];
}
