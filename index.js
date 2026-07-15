const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Task {
    constructor(id, title, isDone){
        this.id = id;
        this.title = title;
        this.isDone = isDone;
    }
}

const tasks = [];
tasks.push(new Task(1, "Prueba", false));

app.get('/', (req, res) =>{
    res.json({
        "name": "TaskAPI",
        "version": "1.0",
        "endpoints": "[/tasks]"
    });
});

app.get('/health', (req, res) => {
    res.json({status : 'ok'});
});

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    
    if(!task){
        return res.status(404).json({
            "error": `Task ${id} not found`
        });
    }
    return res.json(task);
});

app.post('/tasks', (req, res) => {
    const {title, isDone} = req.body;
    if (!title || title.trim() === "") {
        return res.status(400).json({
            "error": "No valid title found"
        });
    }

    if (typeof(isDone) !== "boolean" ) {
        return res.status(400).json({
            "error": "No valid task status found"
        });
    }

    let id = 1;
    if(tasks.length > 0){
        id = tasks[tasks.length - 1].id + 1;
    }

    tasks.push(new Task(id, title, isDone));
    return res.status(201).json({
        "message": "Task created"
    });
});

app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const {title, isDone} = req.body;
    if (!title || title.trim() === "") {
        return res.status(400).json({
            "error": "No valid title found"
        });
    }

    if (typeof(isDone) !== "boolean" ) {
        return res.status(400).json({
            "error": "No valid task status found"
        });
    }

    const task = tasks.find(task => task.id === id);
    if(!task){
        return res.status(404).json({
            "error": `Task ${id} not found`
        });
    }

    task.title = title;
    task.isDone = isDone;

    return res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.findIndex(task => task.id === id);

    if(task === -1){
        return res.status(404).json({
            "error": `Task ${id} not found`
        });
    }

    tasks.splice(task, 1);
    return res.status(204);
});

app.listen(port, () => console.log(`Running http://localhost:${port}`))