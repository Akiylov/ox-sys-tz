import api from "@/lib/api";
import { VariationsResponse } from "./types";

export async function getVariations({
  page,
  size,
}: {
  page?: number;
  size?: number;
}): Promise<VariationsResponse> {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (size) params.append("size", size.toString());

  const res = await api.get<VariationsResponse>(
    `/variations?${params.toString()}`
  );
  return res.data;
}

/**
 * Barcha variations'larni olish (pagination bilan)
 * Server har safar maksimal 500 ta qaytaradi
 */
export async function getAllVariations(): Promise<VariationsResponse> {
  const allItems = [];
  const size = 500; // Maksimal size
  let totalCount = 0;

  // Birinchi request
  const firstResponse = await getVariations({ page: 1, size });
  allItems.push(...firstResponse.items);
  totalCount = firstResponse.total_count;

  // Qolgan sahifalarni olish
  const totalPages = Math.ceil(totalCount / size);

  if (totalPages > 1) {
    const requests = [];

    for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
      requests.push(getVariations({ page: currentPage, size }));
    }

    // Parallel ravishda barcha sahifalarni olish
    console.log(`🔄 ${totalPages - 1} ta qo'shimcha sahifa yuklanmoqda...`);
    const responses = await Promise.all(requests);

    responses.forEach((response, index) => {
      allItems.push(...response.items);
      console.log(
        `  ✅ Sahifa ${index + 2}: ${response.items.length} ta mahsulot`
      );
    });
  }

  console.log(`✨ Jami yuklandi: ${allItems.length} ta mahsulot`);

  return {
    page: 1,
    items: allItems,
    total_count: totalCount,
  };
}
