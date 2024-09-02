/**
 * メニュー
 *
 * @see https://github.com/ryohidaka/saizeriya-menus/blob/main/docs/database.md#%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0
 */
export type Menu = {
  // メニュー ID
  id: number;
  // メニュー名
  name: string;
  // メニュー名(英語)
  nameEn?: string;
  // メニュー名(中国語)
  nameZh?: string;
  // 税抜価格
  price: number;
  // 税込価格
  priceWithTax: number;
  // エネルギー(カロリー) (kcal)
  calorie?: number;
  // 食塩相当量 (g)
  salt?: number;
  // ジャンル名
  genre: Genre;
  // アルコールフラグ
  isAlcohol: boolean;
  // アイコン
  icon: string;
  // 旧ID
  preId?: string;
} & Category;

/**
 * カテゴリ
 */
export type Category = {
  // カテゴリ名
  category: string;
  // カテゴリ名(英語)
  categoryEn: string;
  // カテゴリ名(中国語)
  categoryZh: string;
};

/**
 * ジャンル
 */
export type Genre = string;

/**
 * メニューの絞り込み条件のパラメータ
 */
export type SaizeriyaMenuParams = {
  // 税抜価格 (最小)
  priceMin?: number;
  // 税抜価格 (最大)
  priceMax?: number;
  // 税込価格 (最小)
  priceWithTaxMin?: number;
  // 税込価格 (最大)
  priceWithTaxMax?: number;
  // カテゴリ名
  categories?: string[];
  // メニュー名
  name?: string;
  // エネルギー (最小)
  calorieMin?: number;
  // エネルギー (最大)
  calorieMax?: number;
  // 食塩相当量 (最小)
  saltMin?: number;
  // 食塩相当量 (最大)
  saltMax?: number;
  // ジャンル名
  genres?: string[];
  // 除外するメニューIDリスト
  excludedMenuIds?: number[];
  // アルコール類を除外するフラグ
  excludeAlcohol?: boolean;
};

/**
 * ランダムなメニューの組み合わせ
 */
export type RandomMenus = {
  // 組み合わせ内のメニュー一覧
  menus: Menu[];
  // 食塩相当量の総額
  totalSalt: number;
  // エネルギーの総額
  totalCalorie: number;
  // 税込価格の総額
  totalPriceWithTax: number;
};
