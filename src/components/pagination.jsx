import React from "react";
import Button from "@mui/material/Button";

const Pagination = ({ total, current, onClick, onNextPage, onPrevPage }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      <Button onClick={onPrevPage} disabled={current === 1}>
        {`${"<"}`}
      </Button>
    );

    if (total <= 10) {
      // Show all pages if there are 10 or fewer pages
      pageButtons.push(
        ...pages.map((page) => (
          <Button
            key={page}
            onClick={() => onClick(page)}
            disabled={current === page}
          >
            {page}
          </Button>
        ))
      );
    } else {
      // Show first page
      pageButtons.push(
        <Button key={1} onClick={() => onClick(1)} disabled={current === 1}>
          1
        </Button>
      );

      // Show ellipsis after the first page if the current page is not close to the first page
      if (current > 4) {
        pageButtons.push(<span key="ellipsis-start">...</span>);
      }

      // Show middle pages
      const startPage = Math.max(2, current - 2);
      const endPage = Math.min(current + 2, total - 1);
      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <Button key={i} onClick={() => onClick(i)} disabled={current === i}>
            {i}
          </Button>
        );
      }

      // Show ellipsis before the last page if the current page is not close to the last page
      if (current < total - 3) {
        pageButtons.push(<span key="ellipsis-end">...</span>);
      }

      // Show last page
      pageButtons.push(
        <Button
          key={total}
          onClick={() => onClick(total)}
          disabled={current === total}
        >
          {total}
        </Button>
      );
    }
    pageButtons.push(
      <Button onClick={onNextPage} disabled={current === total}>
        {`${">"}`}
      </Button>
    );

    return pageButtons;
  };

  return <div>{renderPageButtons()}</div>;
};

export default Pagination;
