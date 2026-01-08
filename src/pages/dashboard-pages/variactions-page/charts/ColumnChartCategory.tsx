import { VariationsResponse } from "@/services/variactions-controller/types";
import { createChartConfig } from "@/utils/createConfigChart";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const ColumnChartCategory = ({
  resAllVariations,
}: {
  resAllVariations: ReturnType<typeof useQuery<VariationsResponse, unknown>>;
}) => {
  // ====================================================== HOOKS

  // ====================================================== STATES
  // ====================================================== QUERYS
  // ====================================================== FUNCTIONS
  console.log("resAllVariations in chart:", resAllVariations?.data);

  // O(n) tezlikda category bo'yicha ma'lumotlarni hisoblash
  const categoryData = React.useMemo(() => {
    if (!resAllVariations?.data?.items) return [];

    const categoryMap = new Map<number, { name: string; totalCount: number }>();

    // Bitta loop bilan barcha ma'lumotlarni yig'ish - O(n)
    resAllVariations.data.items.forEach((item) => {
      const categoryId = item.category;
      if (categoryId === null) return;

      const stockCount = item.stocks?.[0]?.count || 0;

      if (categoryMap.has(categoryId)) {
        const existing = categoryMap.get(categoryId)!;
        existing.totalCount += stockCount;
      } else {
        categoryMap.set(categoryId, {
          name: `${item.name || "Category"}-${categoryId}`,
          totalCount: stockCount,
        });
      }
    });

    // Map'dan array'ga o'tkazish
    return Array.from(categoryMap.values());
  }, [resAllVariations?.data]);

  // Chart uchun kategoriyalar va ma'lumotlarni tayyorlash
  const chartCategories = categoryData.map((item) => item.name);
  const chartData = categoryData.map((item) => item.totalCount);
  console.log("Category Data for Chart:", categoryData);

  // ====================================================== DIZAYN+STYLES

  const options = createChartConfig(
    {
      chart: { type: "column", height: 250 },
      xAxis: {
        categories: chartCategories.length > 0 ? chartCategories : ["No Data"],
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `<div>${this.value} <br/> dona</div>`;
          },
        },
      },
      legend: { enabled: false },
      tooltip: { valueSuffix: ` dona` },
      plotOptions: {
        column: {},
      },
      series: [
        {
          name: "Products",
          type: "column",
          color: "#7AD1E4",
          borderWidth: 0,
          borderRadius: 0,
          data: chartData.length > 0 ? chartData : [0],
        },
      ],
    },
    false
  );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #e8e8e8",
        padding: 12,
        marginBottom: 20,
        borderRadius: 5,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <h3>Category soni </h3>
      </div>
      {resAllVariations.isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 250,
          }}
        >
          <div>
            <Spin size="small" />
          </div>
        </div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default ColumnChartCategory;
