const express = require('express');
const app = express();
const Task = require('../../database/models').task;

app.set('views', __dirname);
app.set('view engine', 'ejs');

const restrict = require('../../middleware/restrict');

/* GET /todos route */
app.get('/', restrict, (req, res) => {
    console.log('SESSION:', req.session)
    const userId = req.session.user.id;
    Task.findAll({
        where: {
            user_id: userId
        }
    })
        .then(tasks => {
            res.render('index', { title: 'Tasks', todos: tasks });
        })
        .catch(error => {
            console.log('Task search error:', error);
            res.render('index', { title: 'Tasks', todos: [] });
        });
});

/* POST /todos route */
app.post('/', restrict, (req, res) => {
    const userId = req.session.user.id;
    const data = {
        user_id: userId,
        body: req.body.task,
        completed: false
    }
    Task.create(data)
        .then(newTask => {
            console.log('New task:', newTask);
            res.redirect('/todos');
        })
        .catch(error => {
            console.error('Task model error:', error);
            res.redirect('/todos');
        });
});

/* GET todo update page */
app.get('/:id/update', restrict, (req, res) => {
    Task.findOne({
        where: {
            user_id: req.session.user.id,
            id: req.params.id
        }
    }).then(task => {
        console.log('Task to update:', task.dataValues);
        // Page data.
        const data = {
            title: 'Update Task',
            flash: {
                message: null
            },
            task: {
                id: task.id,
                name: task.body,
                complete: task.complete
            }
        };
        res.render('form', data);
    })
});

/* UPDATE task with POST */
app.post('/:id/update', restrict, (req, res) => {
    const body = req.body.task;
    const complete = req.body.complete;
    const taskId = req.params.id;
    Task.update({ body, complete }, {
        where: {
            user_id: req.session.user.id,
            id: req.params.id
        }
    }).then(response => {
        console.log(response[0] === 1 ? `Task ${taskId} has been successfully updated.` : `Failed to update task ${taskId}.`);
        res.redirect('/todos');
    });
});

/* DELETE task with GET */
app.get('/:id/delete', restrict, (req, res) => {
    const taskId = req.params.id;
    Task.destroy({
        where: {
            user_id: req.session.user.id,
            id: taskId
        }
    }).then(response => {
        console.log(response === 1 ? `Task ${taskId} has been successfully deleted.` : `Failed to delete task ${taskId}.`);
        res.redirect('/todos');
    });
});
module.exports = app;