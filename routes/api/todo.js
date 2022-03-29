const express = require("express");
const router = express.Router();

// these are the controllers
// we will create all of them in the future
const {
  createTodo,
  getTodoById,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../../middleware/todo");

//paramsit will fetch the value from the url
router.param("todoId", getTodoById);

// to get all the todos

/** 
 @api {get} /api/v1/todos get the all todos
 * @apiName getalltodos
 * @apiGroup todos
 *
 * @apiSuccess {String} get the all the todos
 *  @apiSuccess {String} completionDateTime whatever we given for completionDate
 *  @apiSuccess {Boolean} iscompleted true or false
 * @apiSuccess {String} status pending
 * @apiSuccess {Number} id  taskid
 * 
 * @apiError {String} Something went wrong in finding all todos
; */
router.get("/todos/", getAllTodos);

// to get a single todo
/** 
 @api {get} /api/v1/todo/:todoId get the single todo
 * @apiName GetTodoDetails
 * @apiGroup todo
 *
 * @apiSuccess {String} task get the single todo by id
 * @apiSuccess {String} completionDateTime whatever we given for completionDate
 *  @apiSuccess {Boolean} iscomplete true or false
 * @apiSuccess {String} status pending
 * @apiSuccess {Number} id  taskid
 * 
 * @apiError {String} 404 todo not found
; */
router.get("/todo/:todoId/", getTodo);

// to create a todo

/** 
 @api {post} /api/v1/todo/create  get the single todo
 * @apiName posttodo
 * @apiGroup post todotask
 *
 * @apiSuccess {String} get the todo
 * @apiSuccess {String} completionDateTime whatever we given for completionDate
 *  @apiSuccess {Boolean} iscompleted true or false
 * @apiSuccess {String} status pending
 * @apiSuccess {Number} id  taskid
 * 
 * @apiError {String} 400 something went wrong
; */
router.post("/todo/create/", createTodo);

// to update the todo
/** 
 @api {put} /api/v1/todo/:todoId/update  update the existing todo by id
 * @apiName puttodo
 * @apiGroup put todotaskbyid
 *
 * @apiSuccess {String} updated todo
 * @apiSuccess {String} completionDateTime whatever we given for completionDate
 *  @apiSuccess {Boolean} iscompleted true or false
 * @apiSuccess {String} status pending
 * @apiSuccess {Number} id  taskid
 * 
 * @apiError {String} 400 something went wrong while upadting
; */
router.put("/todo/:todoId/update", updateTodo);

// to delete the todo
/** 
 @api {put} /api/v1/todo/:todoId/delete  delete the existing todo by id
 * @apiName deletetodo
 * @apiGroup delete todotaskbyid
 *
 * @apiSuccess {String} deleted todo
 * @apiSuccess {String} completionDateTime whatever we given for completionDate
 *  @apiSuccess {Boolean} iscompleted true or false
 * @apiSuccess {String} status pending
 * @apiSuccess {Number} id  taskid
 * 
 * @apisuccess message todo deleted successfully
 * 
 * @apiError String 404 todo not found
; */
router.delete("/todo/:todoId/delete", deleteTodo);

// we will export the router to import it in the index.js
module.exports = router;
