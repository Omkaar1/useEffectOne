import axios from "axios";
import React, { useEffect, useState } from "react";

export const Todo = () => {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    axios
      .get(`http://localhost:3001/todolist?_limit=3&_page=${page}`)
      .then((res) => {
        setTodo(res.data);
      });
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <button
        onClick={() => {
          fetch("http://localhost:3001/todolist", {
            method: "POST",
            body: JSON.stringify({ title: text, purchsed: false }),
            headers: { "Content-Type": "application/json" },
          }).then(() => {
            getData();
          });
        }}
      >
        Add Todo List
      </button>
      {todo.map((g) => (
        <div key={g.id}>
          {g.id} {g.title}
        </div>
      ))}
      <button
        onClick={() => {
          setPage(page - 1);
        }}
      >
        prev
      </button>

      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
      </button>
    </div>
  );
};
