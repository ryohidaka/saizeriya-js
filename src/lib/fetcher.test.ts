import { MENU_JSON_URL } from "@/constants";

import { Menu } from "@/types";
import { Mock } from "vitest";
import { fetchMenus } from "./fetcher";

const mockMenus: Menu[] = [
  {
    calorie: 192,
    category: "グランド",
    categoryEn: "Grand Menu",
    categoryZh: "主",
    genre: "サラダ",
    id: 1202,
    isAlcohol: false,
    name: "小エビのサラダ",
    nameEn: "Shrimp Salad",
    nameZh: "小甜虾沙拉",
    price: 319,
    priceWithTax: 350,
    salt: 1.5,
  },
  {
    calorie: 154,
    category: "グランド",
    categoryEn: "Grand Menu",
    categoryZh: "主",
    genre: "スープ",
    id: 1301,
    isAlcohol: false,
    name: "コーンクリームスープ",
    nameEn: "Creamy Corn Soup",
    nameZh: "奶油玉米浓汤",
    price: 137,
    priceWithTax: 150,
    salt: 1,
  },
  {
    calorie: 295,
    category: "グランド",
    categoryEn: "Grand Menu",
    categoryZh: "主",
    genre: "前菜・おつまみ",
    id: 1401,
    isAlcohol: false,
    name: "辛味チキン",
    nameEn: "Spicy Grilled Chicken",
    nameZh: "香辣鸡翅",
    price: 273,
    priceWithTax: 300,
    salt: 1.8,
  },
];

describe("fetchMenus", () => {
  beforeEach(() => {
    // fetch関数をモック化
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ menus: mockMenus }),
      }),
    ) as Mock;

    // console.errorをスパイ化してモックにする
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("キャッシュを使用してメニューを正常に取得できる", async () => {
    const result = await fetchMenus();
    expect(result).toEqual(mockMenus);
    expect(fetch).toHaveBeenCalledWith(MENU_JSON_URL, { cache: "force-cache" });
  });

  it("キャッシュを無効にしてメニューを正常に取得できる", async () => {
    const result = await fetchMenus(false);
    expect(result).toEqual(mockMenus);
    expect(fetch).toHaveBeenCalledWith(MENU_JSON_URL, { cache: "no-cache" });
  });

  it("フェッチに失敗した場合、空の配列を返す", async () => {
    (fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, statusText: "Not Found" }),
    );

    const result = await fetchMenus();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "メニューの読み込み中にエラーが発生しました:",
      new Error("データの取得に失敗しました: Not Found"),
    );
  });

  it("フェッチ時に例外が発生した場合、空の配列を返す", async () => {
    (fetch as Mock).mockImplementationOnce(() => Promise.reject("Fetch error"));

    const result = await fetchMenus();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "メニューの読み込み中にエラーが発生しました:",
      "Fetch error",
    );
  });
});
