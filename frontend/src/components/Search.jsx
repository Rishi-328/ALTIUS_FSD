import React, { useState, useMemo } from 'react';

const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 30),
}));

const PAGE_SIZE = 10;

function DataTable() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = mockData.filter(
      row =>
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase())
    );
    data = data.sort((a, b) => {
      if (a[sortCol] < b[sortCol]) return sortDir === 'asc' ? -1 : 1;
      if (a[sortCol] > b[sortCol]) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [search, sortCol, sortDir]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = col => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 16 }}>
      <h2>Data Table</h2>
      <input
        aria-label="Search"
        placeholder="Search by name or email"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: 12, width: '100%', padding: 8 }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => handleSort('id')}
                  aria-label="Sort by ID"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ID {sortCol === 'id' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('name')}
                  aria-label="Sort by Name"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Name {sortCol === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('email')}
                  aria-label="Sort by Email"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Email {sortCol === 'email' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('age')}
                  aria-label="Sort by Age"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Age {sortCol === 'age' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  No data found.
                </td>
              </tr>
            ) : (
              paginated.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.age}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
        
        <button onClick={() => setPage(page - 1)} disabled={page === 1} aria-label="Previous page">
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} aria-label="Next page">
          Next
        </button>
        
      </div>
    </div>
  );
}

export default DataTable;