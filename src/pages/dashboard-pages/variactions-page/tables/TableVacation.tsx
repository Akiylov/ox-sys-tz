import { useState } from "react";
import { Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { VariationsResponse } from "@/services/variactions-controller/types";
import dayjs from "dayjs";
import { truncateText } from "@/utils/truncateText";
import Search from "antd/es/input/Search";

const TableVacation = ({
  resAllVariations,
}: {
  resAllVariations: ReturnType<typeof useQuery<VariationsResponse, unknown>>;
}) => {
  // ====================================================== HOOKS
  // ====================================================== STATES
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // ====================================================== QUERYS
  // Barcha ma'lumotlarni yuklash (bir nechta pagination request bilan)

  console.log("resAllVariations:", resAllVariations?.data);

  // ====================================================== FUNCTIONS
  // Highlight function - qidirilgan so'zni sariq background bilan ajratish
  const highlightText = (text: string | undefined, query: string) => {
    if (!text || !query.trim()) return text || "";

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return (
      <>
        {before}
        <mark
          style={{
            backgroundColor: "#ffeb3b8f",
            padding: "2px 0",
          }}
        >
          {match}
        </mark>
        {after}
      </>
    );
  };

  // Client-side filtering and sorting based on search query
  const filteredData = (() => {
    if (!resAllVariations?.data?.items) return [];

    const query = searchQuery.toLowerCase().trim();

    // Agar qidiruv bo'sh bo'lsa, barcha ma'lumotlarni qaytarish
    if (!query) return resAllVariations.data.items;

    // Filterlash va har bir elementga prioritet berish
    const filtered = resAllVariations.data.items
      .map((item) => {
        let priority = Infinity; // Default priority (mos kelmasa)
        let matchedField = "";

        // Name tekshirish
        const nameLower = item.name?.toLowerCase() || "";
        if (nameLower.includes(query)) {
          const index = nameLower.indexOf(query);
          priority = Math.min(priority, index);
          matchedField = "name";
        }

        // SKU tekshirish
        const skuLower = item.sku?.toLowerCase() || "";
        if (skuLower.includes(query)) {
          const index = skuLower.indexOf(query);
          if (index < priority) {
            priority = index;
            matchedField = "sku";
          }
        }

        // Barcode tekshirish
        const barcodeLower = item.barcode?.toLowerCase() || "";
        if (barcodeLower.includes(query)) {
          const index = barcodeLower.indexOf(query);
          if (index < priority) {
            priority = index;
            matchedField = "barcode";
          }
        }

        return {
          item,
          priority,
          matchedField,
        };
      })
      .filter((result) => result.priority !== Infinity) // Faqat mos kelganlarni qoldirish
      .sort((a, b) => {
        // Avval priority bo'yicha (qidiruv so'zi qayerda boshlangan)
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }

        // Agar priority bir xil bo'lsa, maydon bo'yicha (name > sku > barcode)
        const fieldOrder = { name: 0, sku: 1, barcode: 2 };
        const aOrder =
          fieldOrder[a.matchedField as keyof typeof fieldOrder] ?? 3;
        const bOrder =
          fieldOrder[b.matchedField as keyof typeof fieldOrder] ?? 3;

        return aOrder - bOrder;
      })
      .map((result) => result.item); // Faqat item'ni qaytarish

    return filtered;
  })();

  // ====================================================== DIZAYN+STYLES

  const columns: ColumnsType<VariationsResponse["items"][number]> = [
    {
      title: "Import Date",
      key: "importDate",
      render: (_, record) => {
        const firstStock = record.stocks?.[0];
        if (!firstStock?.imported) return "N/A";
        return dayjs(firstStock.imported).format("DD.MM.YYYY HH:mm");
      },
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (text: string) => highlightText(text, searchQuery),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render: (text: string) => highlightText(text, searchQuery),
    },
    {
      title: "Suplier",
      key: "suplier",
      width: 150,
      children: [
        {
          title: "ID",
          dataIndex: "supplierId",
          key: "supplierId",
          align: "center",
        },
        {
          title: "Name",
          dataIndex: "supplier",
          key: "supplierName",
          align: "center",
        },
      ],
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category || "N/A",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => highlightText(text, searchQuery),
    },
    {
      title: " Description",
      dataIndex: "description",
      key: "longDescription",
      render: (text) => truncateText(text, 20),
      width: 150,
    },
    {
      title: "Price",
      key: "price",
      width: 200,
      children: [
        {
          title: "kelish",
          key: "sellPrice",
          align: "center",
          render: (_, record) => (
            <div>{record?.stocks?.[0]?.supplyPrice.USD}</div>
          ),
        },
        {
          title: "sotish",
          key: "sellPrice",
          align: "center",
          render: (_, record) => (
            <div>{record?.stocks?.[0]?.sellPrice.USD}</div>
          ),
        },
      ],
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdateTime",
      key: "lastUpdateTime",
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Show Market",
      dataIndex: "showMarket",
      key: "showMarket",
      render: (showMarket: boolean) => (showMarket ? "Yes" : "No"),
    },
  ];

  return (
    <div>
      <h3
        style={{
          marginBottom: 10,
          borderLeft: "5px solid #000fff",
          paddingLeft: 10,
        }}
      >
        Mahsulotlar jadvali
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {/* left side */}
        <div>
          <Search
            placeholder="Search by Name, SKU, Barcode"
            style={{ width: 300 }}
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={(value) => setSearchQuery(value)}
          />
        </div>
        {/* filter side */}
        <div>
          <Select
            options={[
              { value: "all", label: "All" },
              { value: "inStock", label: "In Stock" },
              { value: "outOfStock", label: "Out of Stock" },
            ]}
            placeholder="Filter by Stock Status"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <Table<VariationsResponse["items"][number]>
        size="small"
        bordered
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={resAllVariations.isLoading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          onChange: (page, size) => {
            setPagination({ page, size });
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / ${total} ${
              searchQuery ? `(Jami: ${resAllVariations.data?.total_count})` : ""
            }`,
        }}
      />
    </div>
  );
};

export default TableVacation;
