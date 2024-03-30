export class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoText: "",
    };
  }
  async componentDidMount() {
    const response = await client.get(`/api-key?email=phivanduc325@gmail.com`);

    const { apiKey } = response.data.data;
    console.log(response);
    console.log(apiKey);
    localStorage.setItem("apiKey", apiKey);

    client.setApiKey(localStorage.getItem("apiKey"));
    this.handleGetTodo();
  }
  handleGetTodo = async () => {
    const { response, data: _data } = await client.get("/todos");
    console.log(response, _data);
    const todos = _data.data.listTodo;
    console.log(todos);
    this.setState({ todos });
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ newTodoText: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.todos);
    console.log(this.state.newTodoText);
    try {
      // Thêm một todo mới
      const { newTodoText } = this.state;
      console.log(newTodoText);
      const response = await client.post("/todos", { todo: newTodoText });
      console.log(response);
      const newTodo = response.data.data;
      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodo],
        newTodoText: "", // Xóa giá trị todo mới sau khi thêm vào state
      }));
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };

  render() {
    const { todos, newTodoText } = this.state;
    return (
      <div className="container">
        <h1>Chào mừng đến với ứng dụng Todo</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Thêm một công việc mới"
            value={newTodoText}
            onChange={this.handleChange}
          />
          <button type="submit">Thêm mới</button>
        </form>
        <ul className="todos">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DefaultPage;