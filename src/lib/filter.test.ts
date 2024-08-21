import { Menu, SaizeriyaMenuParams } from "@/types";
import { getFilteredMenus } from "./filter";

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
    icon: "🍤",
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
    icon: "🥣",
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
    icon: "🥤",
  },
];

describe("getFilteredMenus", () => {
  // 除外メニューのフィルタリング
  it("税抜価格フィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { excludedMenuIds: [1202] };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[1], mockMenus[2]]);
  });

  // 税抜価格フィルタリング
  it("税抜価格フィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { priceMin: 100, priceMax: 300 };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[1], mockMenus[2]]);
  });

  // 税込価格フィルタリング
  it("税込価格フィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = {
      priceWithTaxMin: 100,
      priceWithTaxMax: 300,
    };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[1], mockMenus[2]]);
  });

  // カテゴリーフィルタリング
  it("カテゴリーフィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { categories: ["グランド"] };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0], mockMenus[1], mockMenus[2]]);
  });

  // カテゴリーフィルタリング - 空のカテゴリーリスト
  it("カテゴリーフィルタリングのテスト - 空のカテゴリーリスト", () => {
    const params: SaizeriyaMenuParams = { categories: [] };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual(mockMenus);
  });

  // 日本語名でのフィルタリング
  it("日本語名でのフィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { name: "小エビのサラダ" };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0]]);
  });

  // カロリーフィルタリング
  it("カロリーフィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { calorieMin: 200 };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[2]]);
  });

  // カロリーフィルタリング - メニューにカロリーがない場合
  it("カロリーフィルタリングのテスト - メニューにカロリーがない場合", () => {
    const mockMenusNoCalorie: Menu[] = [
      ...mockMenus,
      { ...mockMenus[0], calorie: undefined },
    ];
    const params: SaizeriyaMenuParams = { calorieMin: 200 };
    const result = getFilteredMenus(mockMenusNoCalorie, params);
    expect(result).toEqual([mockMenus[2]]);
  });

  // 塩分フィルタリング
  it("塩分フィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { saltMax: 1.5 };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0], mockMenus[1]]);
  });

  // 塩分フィルタリング - メニューに塩分がない場合
  it("塩分フィルタリングのテスト - メニューに塩分がない場合", () => {
    const mockMenusNoSalt: Menu[] = [
      ...mockMenus,
      { ...mockMenus[0], salt: undefined },
    ];
    const params: SaizeriyaMenuParams = { saltMax: 1.5 };
    const result = getFilteredMenus(mockMenusNoSalt, params);
    expect(result).toEqual([mockMenus[0], mockMenus[1]]);
  });

  // ジャンルフィルタリング
  it("ジャンルフィルタリングのテスト", () => {
    const params: SaizeriyaMenuParams = { genres: ["スープ"] };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[1]]);
  });

  // paramsが未定義の場合のテスト
  it("paramsが未定義の場合のテスト", () => {
    const result = getFilteredMenus(mockMenus);
    expect(result).toEqual(mockMenus);
  });

  // 全フィルタが適用されない場合のテスト
  it("全フィルタが適用されない場合のテスト", () => {
    const params: SaizeriyaMenuParams = {
      priceMin: 1000,
      calorieMax: 50,
      saltMin: 5,
    };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([]);
  });

  // 複数フィルタの組み合わせテスト
  it("複数フィルタの組み合わせテスト", () => {
    const params: SaizeriyaMenuParams = {
      priceMin: 150,
      priceMax: 300,
      calorieMin: 150,
      calorieMax: 300,
      saltMin: 1.0,
      saltMax: 1.8,
    };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[2]]);
  });

  // カテゴリとジャンルのフィルタリングテスト
  it("カテゴリとジャンルのフィルタリングテスト", () => {
    const params: SaizeriyaMenuParams = {
      categories: ["グランド"],
      genres: ["前菜・おつまみ"],
    };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[2]]);
  });
});
