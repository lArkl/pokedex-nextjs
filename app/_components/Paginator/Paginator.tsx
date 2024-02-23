"use client";

import { FC } from "react";
import styles from "./Paginator.module.scss";
import classNames from "classnames";
import { usePagination, needsDots } from "./usePagination";
import Button from "../Button";
import Typography from "../Typography";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export interface PaginatorProps {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  className?: string;
}

const Paginator: FC<PaginatorProps> = ({
  currentPage,
  pageSize,
  totalCount,
  className,
}: PaginatorProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setCurrentPage = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const indexRange = usePagination({ currentPage, totalPages });
  return (
    <ul className={classNames(styles.container, className)}>
      <li className={styles.item}>
        <Button
          className={styles.arrow}
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          {"<"}
        </Button>
      </li>
      {indexRange.map((pageIndex) => {
        const isDots = needsDots(pageIndex);
        return (
          <li key={`page-${pageIndex}`} className={styles.item}>
            {isDots ? (
              <Typography className={styles.dots}>...</Typography>
            ) : (
              <Button
                className={classNames(styles.page, {
                  [styles.current]: currentPage === pageIndex,
                })}
                onClick={() => setCurrentPage(pageIndex)}
              >
                {pageIndex}
              </Button>
            )}
          </li>
        );
      })}
      <li className={styles.item}>
        <Button
          className={styles.arrow}
          disabled={currentPage >= totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          {">"}
        </Button>
      </li>
    </ul>
  );
};

export default Paginator;
