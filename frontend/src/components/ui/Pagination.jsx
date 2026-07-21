import { useState } from 'react';
import Icon from '../Icon';
import './ui.css';

export default function Pagination({ pages = 3, initial = 1 }) {
  const [page, setPage] = useState(initial);

  return (
    <div className="pagination">
      <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
        <Icon name="chevronLeft" size={16} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={n === page ? 'active' : ''}
          onClick={() => setPage(n)}
        >
          {n}
        </button>
      ))}
      <button type="button" disabled={page === pages} onClick={() => setPage((p) => Math.min(pages, p + 1))}>
        <Icon name="chevronRight" size={16} />
      </button>
    </div>
  );
}
