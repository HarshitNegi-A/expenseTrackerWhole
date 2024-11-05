import React, { useEffect, useState } from 'react'
import classes from "./ExpenseForm.module.css"
import ExpenseItem from './ExpenseItem'
import Header from '../Header'



const ExpenseForm = () => {

    const [amount,setAmount]=useState(0)
    const [desc,setDesc]=useState("")
    const [type,setType]=useState("")
    const [items,setItems]=useState([])

    useEffect(()=>{
      fetch('https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses.json')
      .then(res=>{
          return res.json();
      }).then(data=>{
        const arr=[];
        for(let i in data){
          arr.push(data[i].item)
        }
        setItems(arr);
      }).catch(err=>{
        console.log(err)
      })
    },[])

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const obj={
            id:Date.now(),
            amount:amount,
            desc:desc,
            type:type,
        }
        fetch('https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses.json',{
          method:'POST',
          body:JSON.stringify({
            item:obj
          }),
          headers:{
            'Content-Type' : 'application/json'
        }
        }).then(res=>{
          return res.json();
        }).then(data=>{
          console.log(data.name)
        }).catch(err=>{
          console.log(err)
        })
        setItems([...items,obj])
        setAmount(0)
        setDesc("")
        setType("")
    }


  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setAmount(itemToEdit.amount);
    setDesc(itemToEdit.desc);
    setType(itemToEdit.type);
    deleteItem(id);  
  };

  return ( <div>
    <Header/>
    <h1 className={classes.heading}>EXPENSE TRACKER</h1>
    <form onSubmit={handleFormSubmit} className={classes.form}>
        <label htmlFor='amount'>Amount:</label>
        <input value={amount} type='number' id='amount' onChange={(e)=>{setAmount(e.target.value)}}/>
        <label htmlFor='desc'>Description:</label>
        <input value={desc} type='text' id='desc' onChange={(e)=>{setDesc(e.target.value)}}/>
        <label htmlFor='type'>Category</label>
        <select value={type} id='type' onChange={(e)=>{setType(e.target.value)}}>
            <option>Food</option>
            <option>Petrol</option> 
            <option>Shopping</option> 
            <option>Travel</option>
            <option>Other</option>
        </select>
        <button type='submit'>Add Expenses</button>
    </form>
    <ExpenseItem lists={items} onDelete={deleteItem} onEdit={editItem}/>
    </div>
  )
}

export default ExpenseForm