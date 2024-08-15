import { FilterForm } from "./filter-form.ts";
import { MenuTable } from "./menu-table.ts";
import { SaizeriyaMenuParams } from "../index.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container text-start">
    <div id="filter-form"></div>
    <div id="menu-table"></div>
  </div>
`;

const renderTable = async (params?: SaizeriyaMenuParams) => {
  document.querySelector<HTMLDivElement>("#menu-table")!.innerHTML =
    await MenuTable({ params });
};

(async () => {
  const filterFormHtml = await FilterForm({
    onFilter: renderTable,
  });
  document.querySelector<HTMLDivElement>("#filter-form")!.innerHTML =
    filterFormHtml;
})();

// 初期テーブルの表示
renderTable();
