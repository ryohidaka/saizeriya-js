import { Saizeriya } from "@/Saizeriya.ts";
import { SaizeriyaMenuParams } from "..";

type MenuTableProps = {
  params?: SaizeriyaMenuParams;
};

export async function MenuTable({ params }: MenuTableProps) {
  const saizeriya = new Saizeriya();
  const menus = await saizeriya.all(params);
  const randomMenus = await saizeriya.random();
  console.log(randomMenus);

  return `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">メニューID</th>
          <th scope="col">メニュー名</th>
          <th scope="col">税抜価格</th>
          <th scope="col">税込価格</th>
          <th scope="col">カロリー</th>
          <th scope="col">塩分</th>
          <th scope="col">カテゴリ名</th>
          <th scope="col">ジャンル名</th>
          <th scope="col">アルコールフラグ</th>
        </tr>
      </thead>
      <tbody id="menu-table">
        ${menus
          .map(
            (menu) => `
          <tr id="${menu.id}">
            <th scope="row">${menu.id}</th>
            <td>${menu.name}</td>
            <td>${menu.price}</td>
            <td>${menu.priceWithTax}</td>
            <td>${menu.calorie}</td>
            <td>${menu.salt}</td>
            <td>${menu.category}</td>
            <td>${menu.genre}</td>
            <td>${menu.isAlcohol}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}
