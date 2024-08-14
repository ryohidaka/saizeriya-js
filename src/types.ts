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
