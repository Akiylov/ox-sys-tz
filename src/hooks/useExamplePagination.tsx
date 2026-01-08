/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useExamplePagination({ defaultPageSize = 10 } = {}) {
  const [pagination, setPagination] = useState({
    page: 0,
    size: defaultPageSize,
  });

  const antPagination = {
    current: pagination.page + 1,
    pageSize: pagination.size,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50],

    onChange: (page: number, pageSize?: number) => {
      setPagination({
        page: page - 1,
        size: pageSize || defaultPageSize,
      });
    },

    onShowSizeChange: (_: any, newSize: number) => {
      setPagination({
        page: 0,
        size: newSize,
      });
    },
  };

  return { pagination, setPagination, antPagination };
}
