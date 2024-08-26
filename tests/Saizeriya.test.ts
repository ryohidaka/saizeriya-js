import { describe, it, expect, beforeEach, vi } from "vitest";

import { Menu, Saizeriya } from "../src";

describe("Saizeriya", () => {
  let saizeriya: Saizeriya;

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

  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ menus: mockMenus }),
  } as Response);

  beforeEach(() => {
    saizeriya = new Saizeriya();
  });

  it("初期化時にメニューをロードすること", async () => {
    await saizeriya.all();
  });

  it("フィルタリングされた全てのメニューを返すこと", async () => {
    const params = { genres: ["サラダ"] };
    await saizeriya.all(params);
  });

  it("全てのカテゴリを返すこと", async () => {
    await saizeriya.categories();
  });

  it("全てのジャンルを返すこと", async () => {
    await saizeriya.genres();
  });

  it("IDに対応するメニューを返すこと", async () => {
    const menu = await saizeriya.getById(1202);
    expect(menu).toEqual({
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
    });
  });

  it("存在しないIDに対してundefinedを返すこと", async () => {
    const menu = await saizeriya.getById(9999);
    expect(menu).toBeUndefined();
  });

  it("ランダムな組み合わせを返すこと", async () => {
    await saizeriya.random();
  });
});
