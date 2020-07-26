import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoService } from '../../services/todo.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = {
    pendings:[],
    inProgress:[],
    done:[],
   };
  
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateTodo();
  }

  addTodo(todo){
    const obj = {todo: todo.value};
    this.todoService.addTodo(obj)
    .subscribe((res:any)=>{
      this.openSnackBar(res.message);
      this.getAllTodos();
      todo.value="";
    }, (err)=>{
      console.log(err);
    });
  }

  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe((res:any)=>{
      this.openSnackBar(res.message);
      Object.keys(res).forEach(key=>{
        this.data[key]=res[key];
      })
    }, (err)=>{
      console.log(err);
    });
  }

  updateTodo(){
    this.todoService.updateTodo(this.data)
    .subscribe((res:any)=>{
      this.openSnackBar(res.message);
    }, (err)=>{
      console.log(err);
    });
  }

  removeTodo(id){
    if(confirm("BU maddeyi silmek istediğinizden emin misiniz?")){
      this.todoService.removeTodo(id)
      .subscribe(res=>{
        console.log(res);
        this.getAllTodos();
      }, (err)=>{
        console.log(err);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Tamam",{
      duration: 2000,
    });
  }
}
