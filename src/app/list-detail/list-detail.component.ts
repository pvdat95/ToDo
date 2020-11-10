import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ITask } from "../modals/list";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TodoListService } from "../services/todo-list.service";
import { TaskService } from '../services/task.service';

@Component({
  selector: "app-todo-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})
export class ListDetailComponent implements OnInit {
  listName = "";
  periousListName = "";
  newTask = "";
  tasks: ITask[] = [];
  listId: number;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private todoListService: TodoListService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = +params.get("id");
      this.getTodoDetail();
      this.getTasks();
    });
  }

  getTodoDetail() {
    this.taskService.getListDetail(this.listId).subscribe(
      res => {
        this.listName = res.name;
        this.periousListName = this.listName;
      },
      () => {}
    );
  }

  getTasks() {
    this.taskService.getTasks(this.listId).subscribe(
      res => {
        this.tasks = res;
      },
      error => {
        console.log("getTasks Error", error);
      }
    );
  }

  editListName() {
    this.todoListService.updateList(this.listId, this.listName).subscribe(
      res => {
        this.periousListName = this.listName;
      },
      error => {
        console.log("getTasks Error", error);
      }
    );
  }

  addNewTask() {
    this.taskService.createTask(this.listId, this.newTask).subscribe(
      res => {
        this.tasks.unshift(res);
        this.newTask = "";
      },
      error => {
        console.log("createTask Error", error);
      }
    );
  }

  onCheckbox(taskId: number) {
    this.tasks.forEach(item => {
      if (item.id === taskId) {
        item.completed = !item.completed;
        this.taskService.updateTask(this.listId, taskId, item).subscribe(
          res => {},
          error => {
            console.log("deleteList Error", error);
          }
        );
      }
    });
  }

  deleteTask(id: number, index: number) {
    this.taskService.deleteTask(this.listId, id).subscribe(
      res => {
        this.tasks.splice(index, 1);
      },
      error => {
        console.log("deleteList Error", error);
      }
    );
  }

  editTask(task: ITask) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      task
    };
    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.taskService.updateTask(data.list_id, data.id, data).subscribe(
        res => {},
        error => {
          console.log("deleteList Error", error);
        }
      );
    });
  }
}
