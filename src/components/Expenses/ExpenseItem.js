import React from 'react';
import classes from './ExpenseItem.module.css';
import { useSelector } from 'react-redux';

const ExpenseItem = (props) => {
  const expense=useSelector(state=>state.expenses.expenses)
  console.log(expense)
  return (
    <ul className={classes.expenseList}>
      {expense.map((item) => (
        <li key={item.id} className={classes.expenseItem}>
          <div className={classes.expenseDetails}>
            <span className={classes.description}>{item.desc}</span>
            <span className={classes.category}>{item.type}</span>
          </div>
          <div className={classes.amount}>${item.amount}</div>
          <button onClick={()=>{props.onEdit(item.id)}} className={classes.editButton}>Edit</button>
          <button onClick={()=>{props.onDelete(item.id)}} className={classes.deleteButton}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseItem; 