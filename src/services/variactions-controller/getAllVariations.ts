import { getVariations } from "./index";
import { VariationsResponse, ProductItem } from "./types";

/**
 * Barcha variations'larni olish (pagination bilan)
 * Server har safar 500 ta qaytaradi, shuning uchun bir nechta request yuboramiz
 */
export async function getAllVariations(): Promise<VariationsResponse> {
  const allItems: ProductItem[] = [];
  const page = 1;
  const size = 500; // Maksimal size
  let totalCount = 0;

  try {
    // Birinchi request
    const firstResponse = await getVariations({ page, size });
    allItems.push(...firstResponse.items);
    totalCount = firstResponse.total_count;

    console.log(`Birinchi sahifa: ${firstResponse.items.length} ta mahsulot`);
    console.log(`Jami: ${totalCount} ta mahsulot`);

    // Qolgan sahifalarni olish
    const totalPages = Math.ceil(totalCount / size);

    if (totalPages > 1) {
      const requests = [];

      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        requests.push(getVariations({ page: currentPage, size }));
      }

      // Parallel ravishda barcha sahifalarni olish
      const responses = await Promise.all(requests);

      responses.forEach((response, index) => {
        allItems.push(...response.items);
        console.log(
          `Sahifa ${index + 2}: ${response.items.length} ta mahsulot`
        );
      });
    }

    console.log(`Jami yuklandi: ${allItems.length} ta mahsulot`);

    return {
      page: 1,
      items: allItems,
      total_count: totalCount,
    };
  } catch (error) {
    console.error("Barcha variations olishda xatolik:", error);
    throw error;
  }
}
