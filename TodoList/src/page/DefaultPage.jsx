import { client } from "../API/todoApi";
import "../assets/style.scss";
import EditTodoForm from "../Components/EditTodoForm";
import Email from "../Components/Email";

import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "../Components/SearchForm";

export default class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoList: [],
      newTodoText: "",
      showEmailForm: true,
      editingTodoId: null,
      newNameTodoEdit: "",
      formSearch: false,
      textSearch: "",
    };
  }
  async componentDidMount() {
    this.handleTodoList();
  }
  handleSearch = (e) => {
    e.preventDefault();
    toast.info("Bạn đang chuyển sang chế độ tìm kiếm ", { autoClose: 600 });
    let { formSearch } = this.state;
    if (!formSearch) {
      this.setState({
        formSearch: true,
      });
      

    }
  };
  handleEmailSubmit = async (emailUser) => {
    try {
      const { response, data } = await client.get(
        `/api-key?email=${emailUser}`
      );

      if (response.ok) {
        toast.info("Chào mừng bạn đã quay trở lại ",{ autoClose: 600 });

        const apiKey = data.data.apiKey;
        localStorage.setItem("apiKey", apiKey);
        client.setApiKey(apiKey);
        this.setState({
          showEmailForm: false,
        });
        this.handleTodoList();
      }
    } catch {
      console.error("Error fetching apiKey:", error);
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const { formSearch } = this.state;

    if (!formSearch) {
      this.setState({
        newTodoText: e.target.value,
      });
    }
   
  };
  handleSubmitTodo = async (e) => {
    const { newTodoText } = this.state;
   
    e.preventDefault();
    if (newTodoText !== "") {
      const { response, data } = await client.post(`/todos`, {
        todo: newTodoText,
      });
   
   
      if (response.ok) {
        toast.info("Thêm công việc thành công ", { autoClose: 600 });
        this.handleTodoList();
        this.setState({
          newTodoText: "",
        });
      }
    }
  };

  handleTodoList = async () => {
    try {
      const apiKey = localStorage.getItem("apiKey");
      const { response, data: _data } = await client.get("/todos", {
        header: { "X-API-Key": apiKey },
      });
      if (response.ok) {
      

        this.setState({
          TodoList: _data.data.listTodo,
        });
      }
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };
  handleDelete = async (e, idTodo) => {
    e.preventDefault();
   

    const { response, data } = await client.delete(`/todos/${idTodo}`);
   
    if (response.ok) {
      toast.info("Xóa công việc thành công ",{ autoClose: 600 });
      this.handleTodoList();
    } else {
      toast.info(" đã xảy ra lỗi vui lòng đăng nhập lại ", { autoClose: 600 });
    }
  };

  handleUpdateTodo = async (idTodo) => {
    const { newNameTodoEdit } = this.state;
   
    const { response } = await client.patch(`/todos/${idTodo}`, {
      todo: newNameTodoEdit,
    });
    if (response.ok) {
      toast.info("Sửa Công việc thành công :))");
      this.handleTodoList();

      this.setState({
        newNameTodoEdit: " ",
        editingTodoId: null,
      });
    }
  };
  handleEdit = (idTodo) => {
    this.setState({
      editingTodoId: idTodo,
    });
  };
  handleChangeEdit = (e) => {
    e.preventDefault();
    this.setState({
      newNameTodoEdit: e.target.value,
    });
  };

  handleGetTodoSearch = (TodoListSearch) => {
    this.setState({
      TodoList: TodoListSearch,
    });
   
  };

  handleAddTodo = (newTodo) => {
    if (newTodo !== "") {
      this.setState(
        {
          newTodoText: newTodo,
          formSearch: false,
        },
        (e) => {
          this.handleSubmitTodo();
        }
      );
    }
   
  };
  handleComplete = async (idTodo) => {
    try {
      const { response } = await client.patch(`/todos/${idTodo}`, {
        isCompleted: true,
      });
      if (response.ok) {
        toast.info("Đánh dấu công việc đã hoàn thành" ,{ autoClose: 600 });
        this.handleTodoList();
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  render() {
    const { showEmailForm, newTodoText, TodoList, editingTodoId, formSearch } =
      this.state;
   

 
    return (
      <Fragment>
        {showEmailForm && <Email onEmailSubmit={this.handleEmailSubmit} />}

        {!showEmailForm && (
          <div className="container">
            <h1>Chào mừng đến với ứng dụng Todo</h1>

            {formSearch ? (
              <SearchForm
                getTodoList={this.handleTodoList}
                onGetTodoSearch={this.handleGetTodoSearch}
                onGetNewTodo={this.handleAddTodo}
              />
            ) : (
              <form action="" onSubmit={this.handleSubmitTodo}>
                <input
                  type="text"
                  placeholder="Thêm một công việc mới"
                  value={newTodoText}
                  onChange={this.handleChange}
                />
                <div className="atc">
                  {" "}
                  <button className="add" type="submit">
                    Thêm mới
                  </button>
                  <button
                    className="search"
                    onClick={(e) => {
                      this.handleSearch(e);
                    }}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            )}

            <ul className="todos">
              {TodoList.map((todo) => (
                <li key={todo._id}>
                  {this.state.editingTodoId === todo._id ? (
                    <form
                      action=""
                      className="todo-form-edit"
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.handleUpdateTodo(todo._id);
                      }}
                    >
                      <input
                        type="text"
                        className="input-edit"
                        placeholder="Edit name Todo"
                        defaultValue={todo.todo}
                        onChange={(e) => {
                          this.handleChangeEdit(e);
                        }}
                      />
                      <div className="control">
                        <div className="is-complete">
                          <label>Not Completed</label>
                          <input
                            type="checkbox"
                            className="checkbox-complete"
                          />
                        </div>
                        <div className="button-group">
                          <button
                            type="button"
                            className="button-escape"
                            onClick={(e) => {
                              e.preventDefault();

                              this.setState({
                                editingTodoId: null,
                              });
                            }}
                          >
                            Thoát
                          </button>

                          <button
                            className="button-update"
                            onClick={() => {
                              
                              this.handleEdit(todo._id);
                            }}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="button-delete"
                            onClick={(e) => {
                              this.handleDelete(e, todo._id);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div>
                      {" "}
                      <p
                        className={
                          todo.isCompleted ? "completed todoName" : "todoName"
                        }
                      >
                        {" "}
                        Tên công việc :<b>{todo.todo}</b>
                      </p>
                      <div className="cfa">
                        {todo.isCompleted ? (
                          <span>Đã hoàn thành</span>
                        ) : (
                          <button
                            className="complete"
                            onClick={() => this.handleComplete(todo._id)}
                          >
                            Hoàn Thành
                          </button>
                        )}
                        <button
                          className="edit"
                          key={todo._id}
                          onClick={() => this.handleEdit(todo._id)}
                        >
                          Sửa
                        </button>
                        <button
                          className="delete"
                          onClick={(e) => this.handleDelete(e, todo._id)}
                        >
                          Xóa
                        </button>
                      </div>{" "}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Fragment>
    );
  }
}
//     phivanduc325@gmail.com
