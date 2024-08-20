import { Menu, SaizeriyaMenuParams } from "@/types";

/**
 * メニューリストをフィルタリングする関数
 *
 * @param menus - フィルタリング対象のメニューリスト
 * @param params - フィルタリング条件
 * @returns フィルタリングされたメニューリスト
 */
export function getFilteredMenus(
  menus: Menu[],
  params?: SaizeriyaMenuParams,
): Menu[] {
  if (!params) return menus;

  const {
    priceMin,
    priceMax,
    priceWithTaxMin,
    priceWithTaxMax,
    categories,
    name,
    calorieMin,
    calorieMax,
    saltMin,
    saltMax,
    genres,
    excludedMenuIds,
    excludeAlcohol,
  } = params;

  return menus
    .filter((menu) => !excludedMenuIds?.includes(menu.id))
    .filter((menu) => filterByPrice(menu, priceMin, priceMax))
    .filter((menu) =>
      filterByPriceWithTax(menu, priceWithTaxMin, priceWithTaxMax),
    )
    .filter((menu) => filterByCategories(menu, categories))
    .filter((menu) => filterByName(menu, name))
    .filter((menu) => filterByCalorie(menu, calorieMin, calorieMax))
    .filter((menu) => filterBySalt(menu, saltMin, saltMax))
    .filter((menu) => filterByGenre(menu, genres))
    .filter((menu) => !excludeAlcohol || !menu.isAlcohol);
}

/**
 * メニューリストを税抜価格でフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param priceMin - 最低価格 (この値以上のメニューを含める)
 * @param priceMax - 最高価格 (この値以下のメニューを含める)
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByPrice(
  menu: Menu,
  priceMin?: number,
  priceMax?: number,
): boolean {
  if (priceMin !== undefined && menu.price < priceMin) return false;
  if (priceMax !== undefined && menu.price > priceMax) return false;
  return true;
}

/**
 * メニューリストを税込価格でフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param priceMin - 最低価格 (この値以上のメニューを含める)
 * @param priceMax - 最高価格 (この値以下のメニューを含める)
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByPriceWithTax(
  menu: Menu,
  priceWithTaxMin?: number,
  priceWithTaxMax?: number,
): boolean {
  if (priceWithTaxMin !== undefined && menu.priceWithTax < priceWithTaxMin)
    return false;
  if (priceWithTaxMax !== undefined && menu.priceWithTax > priceWithTaxMax)
    return false;
  return true;
}

/**
 * メニューリストをカテゴリーでフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param categories - 含めたいカテゴリーのリスト
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByCategories(menu: Menu, categories?: string[]): boolean {
  if (categories && categories.length > 0) {
    return categories.includes(menu.category);
  }
  return true;
}

/**
 * メニューリストを日本語名でフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param name - フィルタリングに使用する日本語のメニュー名
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByName(menu: Menu, name?: string): boolean {
  if (name) {
    return menu.name.includes(name);
  }
  return true;
}

/**
 * メニューリストをカロリーでフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param calorieMin - 最低カロリー (この値以上のメニューを含める)
 * @param calorieMax - 最高カロリー (この値以下のメニューを含める)
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByCalorie(
  menu: Menu,
  calorieMin?: number,
  calorieMax?: number,
): boolean {
  if (
    calorieMin !== undefined &&
    menu.calorie !== undefined &&
    menu.calorie < calorieMin
  )
    return false;
  if (
    calorieMax !== undefined &&
    menu.calorie !== undefined &&
    menu.calorie > calorieMax
  )
    return false;

  if ((calorieMin !== undefined || calorieMax !== undefined) && !menu.calorie)
    return false;
  return true;
}

/**
 * メニューリストを塩分でフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param saltMin - 最低塩分 (この値以上のメニューを含める)
 * @param saltMax - 最高塩分 (この値以下のメニューを含める)
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterBySalt(menu: Menu, saltMin?: number, saltMax?: number): boolean {
  if (saltMin !== undefined && menu.salt !== undefined && menu.salt < saltMin)
    return false;
  if (saltMax !== undefined && menu.salt !== undefined && menu.salt > saltMax)
    return false;
  if ((saltMin !== undefined || saltMax !== undefined) && !menu.salt)
    return false;
  return true;
}

/**
 * メニューリストをジャンルでフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param genres - 含めたいジャンルのリスト
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByGenre(menu: Menu, genres?: string[]): boolean {
  if (genres && genres.length > 0) {
    return genres.includes(menu.genre);
  }
  return true;
}
