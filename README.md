# saizeriya

[![npm version](https://badge.fury.io/js/saizeriya.svg)](https://badge.fury.io/js/saizeriya)
![build](https://github.com/ryohidaka/saizeriya/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/saizeriya/graph/badge.svg?token=RHP9TB2F51)](https://codecov.io/gh/ryohidaka/saizeriya)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

サイゼリヤのメニューを取得する Node.js ライブラリ

## Notes

## インストール

```shell
npm install saizeriya
```

## 使用方法

```ts
import { Saizeriya } from "saizeriya";

const saizeriya = new Saizeriya();

// 全てのメニューを取得
const menus = await saizeriya.all();

// 条件を指定してメニューを取得
const filteredMenus = await saizeriya.all({
  priceMin: 500,
  genres: ["パスタ"],
});

// カテゴリを取得
const categories = await saizeriya.categories();

// ジャンルを取得
const genres = await saizeriya.genres();

// 特定のIDに対応するメニューを取得
const menu = await saizeriya.getById(1);
```

## メソッド

### `all(params?: SaizeriyaMenuParams): Promise<Menu[]>`

条件に合う全てのメニューの一覧を取得します。

#### 引数

- `params`（オプション）: フィルタリング条件

| パラメータ        | 型       | 説明              |
| ----------------- | -------- | ----------------- |
| `priceMin`        | number   | 税抜価格 (最小)   |
| `priceMax`        | number   | 税抜価格 (最大)   |
| `priceWithTaxMin` | number   | 税込価格 (最小)   |
| `priceWithTaxMax` | number   | 税込価格 (最大)   |
| `categories`      | string[] | カテゴリ名        |
| `name`            | string   | メニュー名        |
| `calorieMin`      | number   | エネルギー (最小) |
| `calorieMax`      | number   | エネルギー (最大) |
| `saltMin`         | number   | 食塩相当量 (最小) |
| `saltMax`         | number   | 食塩相当量 (最大) |
| `genres`          | string[] | ジャンル名        |

#### レスポンス

- `Menu[]`: メニューの配列

### `categories(): Promise<Category[]>`

全てのカテゴリを取得します。

#### レスポンス

- `Category[]`: カテゴリの配列

### `genres(): Promise<Genre[]>`

全てのジャンルを取得します。

#### レスポンス

- `Genre[]`: ジャンルの配列

### `getById(id: number): Promise<Menu | undefined>`

指定した ID に対応するメニューを取得します。

#### 引数

- `id`: メニューの ID

#### レスポンス

- `Menu`: メニューオブジェクト。見つからない場合は`undefined`。

## 型定義

### `Menu`

| フィールド     | 型     | 説明                         | サンプル         |
| -------------- | ------ | ---------------------------- | ---------------- |
| `id`           | number | メニュー ID                  | `1202`           |
| `name`         | string | メニュー名                   | `小エビのサラダ` |
| `nameEn`       | string | メニュー名（英語）           | `Shrimp Salad`   |
| `nameZh`       | string | メニュー名（中国語）         | `小甜虾沙拉`     |
| `price`        | number | 税抜価格                     | `319`            |
| `priceWithTax` | number | 税込価格                     | `350`            |
| `calorie`      | number | エネルギー (カロリー) (kcal) | `192`            |
| `salt`         | number | 食塩相当量 (g)               | `1.5`            |
| `genre`        | Genre  | ジャンル名                   | `サラダ`         |
| `category`     | string | カテゴリ名                   | `グランド`       |
| `categoryEn`   | string | カテゴリ名（英語）           | `Grand Menu`     |
| `categoryZh`   | string | カテゴリ名（中国語）         | `主`             |

### `Category`

| フィールド   | 型     | 説明                 | サンプル     |
| ------------ | ------ | -------------------- | ------------ |
| `category`   | string | カテゴリ名           | `グランド`   |
| `categoryEn` | string | カテゴリ名（英語）   | `Grand Menu` |
| `categoryZh` | string | カテゴリ名（中国語） | `主`         |

### `Genre`

`string`: ジャンル名

## Link

- https://github.com/ryohidaka/saizeriya-menus

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
