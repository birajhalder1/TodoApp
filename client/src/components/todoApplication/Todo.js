import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      taskName: "",
      searchTask: "",
      tasks: {},
      allTasks: []
    };
  }

  // Clear the input field
  handleClear = () => {
    this.setState({
      id: "",
      name: "",
      taskName: ""
    });
  };

  isAllRight = () => {
    // Check all field are empty or not
    if (
      this.state.name === "" ||
      this.state.taskName === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // Register todo
  todoRegister = () => {
    if (this.isAllRight()) {
      // Make the data object
      let data = {
        name: this.state.name,
        taskName: this.state.taskName

      };

      // Call the backend route using axios
      axios.post("api/todo/todoInfo", data).then(response => {
        alert("Successfully register");
      });
      this.handleClear();
    } else {
      alert("Please all field insert data");
    }
    this.getAllTodo();
  };

  // Search name
  onSearchName = taskName => {
    // Call the backend server route via axios
    axios.get(`api/todo/getSingle/${taskName}`).then(response => {
      this.setState({ tasks: response.data });
    });
    this.handleClear();
  };

  // GET all student
  componentDidMount = () => {
    this.getAllTodo();
  };
  getAllTodo = () => {
    axios.get("api/todo/getAll").then(response => {
      this.setState({ allTasks: response.data });
      //console.log(response.data);
    });
  };

  // Click edit button and show student info
  onEditTodoList = id => {
    // Call the backend route via axios
    axios.get(`api/todo/get/${id}`).then(response => {
      this.setState({
        id: response.data._id,
        name: response.data.name,
        taskName: response.data.taskName
      });
    });

  };

  // Update student
  onUpdateStudent = () => {
    // Make a object
    let data = {
      name: this.state.name,
      taskName: this.state.taskName
    };

    axios.post(`api/todo/update/${this.state.id}`, data).then(response => {
      alert("Update successfully");
      this.getAllTodo();
    });
    this.handleClear();
  };

  // Click delete button and delete student records
  onDeleteStudent = id => {
    // Call backend route via axios
    axios.delete(`api/todo/delete/${id}`).then(response => {
      alert("Deleted successfully !");
    });
    this.getAllTodo();
  };
  render() {
    return (
      <div className="container">
        <div className="card reg">
          <div className="card-body">
            <center>
              <h4>Todo Application</h4>
              <hr />
            </center>

            <form className="container table_sty1 ">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Enter todo name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="taskName"
                  value={this.state.taskName}
                  onChange={e => this.setState({ taskName: e.target.value })}
                  className="form-control"
                  id="exampleInputroll"
                  aria-describedby="rollHelp"
                  placeholder="Enter task name"
                />
              </div>
            </form>
            <center>
              {this.state.id === "" ? (
                <button
                  onClick={this.todoRegister}
                  className="btn btn-outline-success"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={this.onUpdateStudent}
                  className="btn btn-outline-info"
                >
                  Update
                </button>
              )}
            </center>
          </div>
        </div>

        <div className="container">
          <div className="card reg">
            <div className="card-body">
              <center>
                <h2>Show details</h2>
                <hr />
                <div className=" container input-group mb-3">
                  <input
                    type="text"
                    className="form-control btn_style"
                    name="searchTask"
                    value={this.state.searchTask}
                    onChange={e =>
                      this.setState({ searchTask: e.target.value })
                    }
                    placeholder="Search task name"
                    aria-label="Search task name"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => this.onSearchName(this.state.searchTask)}
                      className="btn btn-outline-info "
                    >
                      Search
                    </button>
                  </div>
                </div>
              </center>
              {this.state.tasks !== null ? (
                <table className=" container table-bordered table_sty1 col-md-6 m-auto">
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Task Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        {this.state.tasks.name}
                      </td>
                      <td className="text-center">
                        {this.state.tasks.taskName}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <h2>No Data available</h2>
              )}
            </div>
          </div>
        </div>

        {/* Show all student */}
        <div className="container auto">
          <center>
            <h1>Show Task List</h1>
            <hr />
          </center>

          {this.state.allTasks.length > 0 ? (
            // If student array is not empty

            // <div className="card reg">
            //   <div className="card-body">
            <table className=" table-bordered table_sty1  m-auto">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Task Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {this.state.allTasks.map(taskData => (
                <tbody key={taskData._id}>
                  <tr>
                    <td className="text-center">{taskData.name}</td>
                    <td className="text-center">{taskData.taskName}</td>

                    <td>
                      <center>
                        <button
                          onClick={() => this.onEditTodoList(taskData._id)}
                          className="btn btn-outline-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.onDeleteStudent(taskData._id)}
                          className="btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </center>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            //   </div>
            // </div>
            <h3>No data found</h3>
          )}
        </div>
        <hr />
      </div>
    );
  }
}
export default Todo;
