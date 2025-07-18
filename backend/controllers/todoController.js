import todoModel from "../models/todoModel.js";

export async function createTodo(req, res) {
  try {
    const user = req.user._id;

    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTodo = await todoModel.create({
      title,
      description,
      status,
      user,
    });

    return res
      .status(201)
      .json({ message: "todo created successfully", todo: newTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function editTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const editedTodo = await todoModel.findByIdAndUpdate(id, {
      title,
      description,
      status,
    });
    if (!editedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res
      .status(201)
      .json({ message: "todo edited successfully", todo: editedTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
  console.log(id);
  
    const deletedTodo = await todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Delete todo error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}
export async function readTodo(req, res) {
  try {
    const userId = req.user._id;
    const todos = await todoModel.find({ user: userId });
    return res.status(200).json({ todos });
  } catch (error) {
    console.error("Read todos error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function completeTodo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    
    const todo = await todoModel.findOne({ _id: id, user: userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Toggle the status
    const newStatus = todo.status === "completed" ? "pending" : "completed";

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: `Todo marked as ${newStatus}`,
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Complete todo error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}
