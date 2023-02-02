const sql = require('./db');

const Todo = (todo) => {
    this.task = todo.task;
    this.is_done = todo.is_done;
    this.created_at = todo.created_at;
    this.updated_at = todo.updated_at;
}

Todo.create = (newTodo, result) => {
    sql.query("INSERT INTO todo SET ?", newTodo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created toso: ", { id: res.insertId, ...newTodo });
        result(null, { id: res.insertId, ...newTodo })
    })
}

Todo.getById() = (id, result) => {
    sql.query(`SELECT * FROM todo WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found todo:", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null)
    })
}

Todo.update = (id, todo, result) => {
    sql.query(
        "UPDATE todo SET task = ?, is_done = ?, updated_at = ? WHERE id = ?",
        [todo.task, todo.is_done, todo.updated_at, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not found" }, null);
                return;
            }

            console.log("updated todo: ", { id, id, ...todo });
            result(null, { id, id, ...todo })
        }
    )
}

Todo.delete = (id, result) => {
    sql.query("DELETE FROM todo WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err)
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not found" }, null);
            return;
        }

        console.log("deleted todo with id: ", id);
        result(null, res);
    })
}