const e = require("express");

const Todo = reuire('../model/todo');

exports.index = (req, res) => {
    Todo.getAll((err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || "Failed to get all todos",
            })
        }else{
            res.status(200).send({
                message: "Sucessfully get all todos",
                data:data
            })
        }
    })
}

exports.store = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content can not be empty!",
        })
    }

    const todo = new Todo({
        task:req.body.task,
        is_done:false,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    Todo.create(todo, (err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message|| "Failed to create todo",
            })
        }else{
            res.status(200).send({
                message: "Todo Created Successfully",
                data: data
            })
        }
    })
}

exports.show = (req,res)=>{
    Todo.getById(req.params.id, (err,data)=>{
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found Todo with id ${req.params.id}.`
                })
            }else{
                res.status(500).send({
                    message: "Failed get Todo with id " + req.params.id
                })
            }
        }else{
            res.status(200).send({
                message: "Successfully get Todo with id " + req.params.id,
                data: data
            })
        }
    })
}

exports.update = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        })
    }

    Todo.update(
        req.params.id,
        new Todo(req.body),
        (err,data)=>{
            if (err) {
                if (err.kind === "not found") {
                    res.status(404).send({
                        message: `Not found Todo with id ${req.params.id}.`
                    })
                }else{
                    res.status(500).send({
                        message: "Failed get Todo with id " + req.params.id
                    })
                }
            }else{
                res.status(200).send({
                    message: "Successfully get Todo with id " + req.params.id,
                    data:data
                })
            }
        }
    )
}

exports.destroy = (req,res)=>{
    Todo.delete(req.params.id, (err,data)=>{
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Not found Todo with id ${req.params.id}.`
                })
            }else{
                res.status(500).send({
                    message: "Failed to delete Todo with id " + req.params.id
                })
            }
        }else{
            res.status(200).send({
                message: "Successfully to delete Todo ",
            })
        }
    })
}