import React, { Fragment, useEffect, useState } from "react";
import { client } from "../API/todoApi";
////

export default function SearchForm({
  getTodoList,
  onGetTodoSearch,
  onGetNewTodo,
}) {
  const [searchText, setSearchText] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (searchText !== "") {
      let timeout = null;
      clearTimeout(timeout);

      timeout = setTimeout(async () => {
        const { response, data } = await client.get(`/todos?q=${searchText}`);
        console.log(data.data.listTodo);
        setTodoList(data.data.listTodo);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      getTodoList();
    }
  }, [searchText]);

  useEffect(() => {
    if (todoList.length > 0) {
      console.log(todoList);
      onGetTodoSearch(todoList);
    }
  }, [todoList]);

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onGetNewTodo(searchText);
  };
  return (
    <Fragment>
      <form action="">
        <input
          type="text"
          placeholder="Nhập công tên công việc cần tìm kiếm"
        
          onChange={handleChange}
        />
        <div className="atc">
          {" "}
          <button className="add" onClick={handleSubmit}>
            Thêm mới
          </button>
          <button className="search">Tìm kiếm</button>
        </div>
      </form>
    </Fragment>
  );
}

