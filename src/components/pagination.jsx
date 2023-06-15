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
      pageButtons.push(
        <Button key={1} onClick={() => onClick(1)} disabled={current === 1}>
          1
        </Button>
      );

      if (current > 4) {
        pageButtons.push(<span key="ellipsis-start">...</span>);
      }

      const startPage = Math.max(2, current - 2);
      const endPage = Math.min(current + 2, total - 1);
      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <Button key={i} onClick={() => onClick(i)} disabled={current === i}>
            {i}
          </Button>
        );
      }

      if (current < total - 3) {
        pageButtons.push(<span key="ellipsis-end">...</span>);
      }

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
