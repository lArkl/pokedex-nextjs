import { useMemo } from 'react'

interface UsePaginationProps {
  currentPage: number
  totalPages: number
  siblingCount?: number
}
const getIndexRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, idx) => idx + start)

const DOTS = -1000

export const usePagination = ({ currentPage, totalPages, siblingCount = 1 }: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const pageNumbers = 5 + siblingCount

    if (pageNumbers >= totalPages) {
      return getIndexRange(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex + 2 < totalPages

    const firstPageIndex = 1

    if (!showLeftDots && showRightDots) {
      const leftCount = 3 + 2 * siblingCount
      return [...getIndexRange(1, leftCount), DOTS, totalPages]
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = 3 + 2 * siblingCount
      return [firstPageIndex, DOTS, ...getIndexRange(totalPages - rightCount + 1, totalPages)]
    }

    return [firstPageIndex, DOTS, ...getIndexRange(leftSiblingIndex, rightSiblingIndex), DOTS, totalPages]
  }, [siblingCount, totalPages, currentPage])

  return paginationRange
}

export const needsDots = (index: number | string): boolean => index === DOTS
