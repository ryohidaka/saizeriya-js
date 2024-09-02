import {
  getCategories,
  getFilteredMenus,
  getGenres,
  getRandomMenus,
} from "./lib";
import { MENUS } from "./menus";
import { Category, Menu, RandomMenus, SaizeriyaMenuParams } from "./types";

/**
 * サイゼリヤのメニューを管理するクラス
 */
export class Saizeriya {
  // メニューリストを格納するための配列
  private menus: Menu[] = [];

  /**
   * コンストラクタ
   * インスタンス生成時にメニューをロードする
   */
  constructor() {
    this.menus = MENUS;
  }

  /**
   * 条件に合う全てのメニューを取得する
   * @param params - フィルタリングの条件
   * @returns フィルタリングされたメニューの配列
   */
  all(params?: SaizeriyaMenuParams): Menu[] {
    return getFilteredMenus(this.menus, params);
  }

  /**
   * 全てのカテゴリを取得する
   * @returns カテゴリの配列
   */
  categories(): Category[] {
    return getCategories(this.menus);
  }

  /**
   * 全てのジャンルを取得する
   * @returns ジャンルの配列
   */
  genres(): string[] {
    return getGenres(this.menus);
  }

  /**
   * 指定したIDに対応するメニューを取得する
   * @param id - メニューのID
   * @returns 指定したIDのメニュー、見つからない場合はundefined
   */
  getById(id: number): Menu | undefined {
    return this.menus.find((menu) => menu.id === id);
  }

  /**
   * 指定した旧IDに対応するメニューを取得する
   * @param preId - メニューの旧ID
   * @returns 指定した旧IDのメニュー、見つからない場合はundefined
   */
  getByPreId(preId: string): Menu | undefined {
    return this.menus.find((menu) => menu.preId === preId);
  }

  /**
   * 指定した総額に対応するランダムなメニューの組み合わせを取得する
   * @param params - フィルタリングの条件
   * @param maxSum - 総額の上限 (デフォルト: `1000`)
   * @param allowDuplicates - 重複許容フラグ (デフォルト: `true`)
   * @returns ランダムな組み合わせ
   */
  random(
    params?: SaizeriyaMenuParams,
    maxSum: number = 1000,
    allowDuplicates: boolean = true,
  ): RandomMenus {
    const menus = this.all(params);

    return getRandomMenus(menus, maxSum, allowDuplicates);
  }
}
