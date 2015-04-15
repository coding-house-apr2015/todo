/* global Firebase:true */

'use strict';

$(document).ready(init);

var root, user, tasks;

function init(){
  $('#set-name').click(setName);
  root = new Firebase('https://todo-chyld.firebaseio.com/');
  user = root.child('user');
  tasks = root.child('tasks');
  user.on('value', userChanged);
  tasks.on('child_added', taskAdded);
  $('#create-task').click(createTask);
  $('#todos').on('click', '.delete', deleteTask);
}

function deleteTask(){
}

function taskAdded(snapshot){
  var task = snapshot.val();
  var key = snapshot.key();

  var checked = task.isComplete ? 'checked' : '';
  var tr = '<tr data-key="'+key+'"><td><button class="delete">&times;</button></td><td><input type="checkbox" ' + checked + '></td><td>' + task.title + '</td><td>' + moment(task.dueDate).format('YYYY-MM-DD') + '</td><td>' + task.priority + '</td><td>' + moment(task.createdAt).format('YYYY-MM-DD') + '</td></tr>';
  $('#todos > tbody').append(tr);
}

function createTask(){
  var title = $('#title').val();
  var dueDate = $('#due-date').val();
  dueDate = new Date(dueDate);
  dueDate = dueDate.getTime();
  var priority = $('#priority').val();
  var isComplete = false;
  var createdAt = Firebase.ServerValue.TIMESTAMP;

  var task = {
    title: title,
    dueDate: dueDate,
    priority: priority,
    isComplete: isComplete,
    createdAt: createdAt
  };

  tasks.push(task);
}

function userChanged(snapshot){
  var name = snapshot.val();
  $('#header').text('Todo : ' + name);
}

function setName(){
  var name = $('#name').val();
  $('#name').val('');
  user.set(name);
}
