import { fetchMenus, getCategories, getFilteredMenus, getGenres } from "./lib";
import { Category, Menu, SaizeriyaMenuParams } from "./types";

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
    this.loadMenus();
  }

  /**
   * メニューを非同期でロードする
   * プライベートメソッド
   */
  private async loadMenus() {
    this.menus = await fetchMenus();
  }

  /**
   * 条件に合う全てのメニューを取得する
   * @param params - フィルタリングの条件
   * @returns フィルタリングされたメニューの配列
   */
  async all(params?: SaizeriyaMenuParams): Promise<Menu[]> {
    // メニューリストが空の場合、メニューをロードする
    if (this.menus.length === 0) {
      await this.loadMenus();
    }

    let menus = this.menus;

    return getFilteredMenus(menus, params);
  }

  /**
   * 全てのカテゴリを取得する
   * @returns カテゴリの配列
   */
  async categories(): Promise<Category[]> {
    // メニューリストが空の場合、メニューをロードする
    if (this.menus.length === 0) {
      await this.loadMenus();
    }

    return getCategories(this.menus);
  }

  /**
   * 全てのジャンルを取得する
   * @returns ジャンルの配列
   */
  async genres(): Promise<string[]> {
    // メニューリストが空の場合、メニューをロードする
    if (this.menus.length === 0) {
      await this.loadMenus();
    }

    return getGenres(this.menus);
  }

  /**
   * 指定したIDに対応するメニューを取得する
   * @param id - メニューのID
   * @returns 指定したIDのメニュー、見つからない場合はundefined
   */
  async getById(id: number): Promise<Menu | undefined> {
    // メニューリストが空の場合、メニューをロードする
    if (this.menus.length === 0) {
      await this.loadMenus();
    }

    return this.menus.find((menu) => menu.id === id);
  }
}
