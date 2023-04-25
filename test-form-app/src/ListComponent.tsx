import { useEffect, useState } from "react";

function ListComponent() {
  const [list, setList] = useState({ parse: { text: { "*": "" } } });
  useEffect(() => {
    const fetchList = async () => {
      const url = 'https://en.wikipedia.org/w/api.php?format=json&origin=*&action=parse&prop=text&page=List_of_books_banned_by_governments&section=59';
      const res = await fetch(url);
      const list = await res.json();
      console.log(list)
      setList(list);
    }
    fetchList().catch(console.error);
  }, []);
  const parser = new DOMParser();
  const external = parser.parseFromString(list.parse.text["*"], "text/html");
  const table = external.querySelector("table");
  if (!table) {
    return <div>placeholder</div>
  }
  const tableNode = document.adoptNode(table);
  // display the table of books banned by governments from the wikipedia page: https://en.wikipedia.org/wiki/List_of_books_banned_by_governments
  return (
    <div>
      <h2>Books Banned in the US</h2>
      <table style={{
        display: 'block',
        position: 'relative', 
        maxWidth: 'none',
        maxHeight: '600px',
        overflowY: 'auto',
      }}>
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Date published</th>
            <th>Genre</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(tableNode.querySelectorAll("tr:not(:first-child)")).map((book, i) => (
            <tr key={i}>
              <td>{book?.querySelector("td:nth-child(1)")?.textContent?.trim()}</td>
              <td>{book?.querySelector("td:nth-child(2)")?.textContent?.trim()}</td>
              <td>{book?.querySelector("td:nth-child(3)")?.textContent?.trim()}</td>
              <td>{book?.querySelector("td:nth-child(4)")?.textContent?.trim()}</td>
              <td>{book?.querySelector("td:nth-child(5)")?.textContent?.trim()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="https://en.wikipedia.org/wiki/List_of_books_banned_by_governments">Source: Wikipedia</a>
    </div>
  );

  // return (
  //   <div>
  //     {/* render the list of books banned by governments from the wikipedia page: https://en.wikipedia.org/wiki/List_of_books_banned_by_governments */}
  //     <h1>Books Banned by Governments</h1>
  //     <h2>Books</h2>
  //     <ul>
  //       {list.map((book: { name: string, author: string, id: string }) => (
  //         <li key={book.id}>
  //           <span style={{ fontWeight: 'bold' }}>{book.name}</span> - {book.author}
  //         </li>
  //       ))}
  //     </ul>
  //     <h2>Authors</h2>
  //     <ul>
  //       {list.map((book: { name: string, author: string, id: string }) => (
  //         <li key={book.id}>
  //           <span style={{ fontWeight: 'bold' }}>{book.author}</span> - {book.name}
  //         </li>
  //       ))}
  //     </ul>
  //     <h2>Books and Authors</h2>
  //     <ul>
  //       {list.map((book: { name: string, author: string, id: string }) => (
  //         <li key={book.id}>
  //           <span style={{ fontWeight: 'bold' }}>{book.name}</span> - {book.author}
  //         </li>
  //       ))}
  //     </ul>
  //     <h2>Authors and Books</h2>
  //     <ul>
  //       {list.map((book: { name: string, author: string, id: string }) => (
  //         <li key={book.id}>
  //           <span style={{ fontWeight: 'bold' }}>{book.author}</span> - {book.name}
  //         </li>
  //       ))}
  //     </ul>
  //     {/* the list should be rendered in four different ways: */}
  //     {/* 1. as an unordered list of books */}
  //     {/* 2. as an unordered list of authors */}
  //     {/* 3. as an ordered list of books */}
  //     {/* 4. as an ordered list of authors */}
  //   </div>
  // );
}

export default ListComponent;