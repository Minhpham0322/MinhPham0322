import React, { Component } from "react";

class EditTodoForm extends Component {
  render() {
    const { todo, handleDelete } = this.props;
    console.log(todo);
    return (
      <form action="" className="todo-form-edit">
        <input
          type="text"
          className="input-edit"
          placeholder="Edit..."
          value={todo.todo}
        />
        <div className="control">
         
          <div className="button-group">
            <button type="button" className="button-escape">
              Thoát
            </button>
            <button className="button-update">Update</button>
            <button
              onClick={handleDelete}
              type="button"
              className="button-delete"
            >
              Xóa
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditTodoForm;
