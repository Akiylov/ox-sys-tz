import TableVacation from "./tables/TableVacation";
import ColumnChartCategory from "./charts/ColumnChartCategory";
import { useQuery } from "@tanstack/react-query";
import { getAllVariations } from "@/services/variactions-controller";

const VariactionsPage = () => {
  // ====================================================== QUERYS
  const resAllVariations = useQuery({
    queryKey: ["all-variations"],
    queryFn: getAllVariations, // Barcha sahifalarni avtomatik yuklab oladi
    staleTime: 5 * 60 * 1000, // 5 daqiqa kesh
    gcTime: 10 * 60 * 1000, // 10 daqiqa garbage collection
  });

  // SABAB 2 componentga bitta query natijasini uzatish, ortiqcha request yuborilmasligi uchun
  return (
    <div>
      <div>
        <ColumnChartCategory resAllVariations={resAllVariations} />
      </div>
      <div>
        <TableVacation resAllVariations={resAllVariations} />
      </div>
    </div>
  );
};

export default VariactionsPage;
