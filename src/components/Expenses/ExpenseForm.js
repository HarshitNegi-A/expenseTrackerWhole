import React, { useEffect, useState } from 'react'
import classes from "./ExpenseForm.module.css"
import ExpenseItem from './ExpenseItem'
import Header from '../Header'



const ExpenseForm = () => {

    const [amount,setAmount]=useState(0)
    const [desc,setDesc]=useState("")
    const [type,setType]=useState("")
    const [items,setItems]=useState([])
    const [updating,setUpdating]=useState(false)
    const [newId,setNewId]=useState(null)

    useEffect(()=>{
      fetch('https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses.json')
      .then(res=>{
          return res.json();
      }).then(data=>{
        console.log(data)
          if(data){
            const arr=[];
            for(let i in data){
              console.log(data[i])
              arr.push({ id: i, ...data[i] })
            }
            setItems(arr);
            console.log(arr)
          }
       
      }).catch(err=>{
        console.log(err)
      })
    },[])

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const obj={
            amount:amount,
            desc:desc ,
            type:type,
        }
        if(updating){
          fetch(`https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses/${newId}.json`,{
            method:'PUT',
            body:JSON.stringify(obj),
            headers:{
              'Content-Type' : 'application/json'
          }
          }).then(res=>{
            return res.json();
          }).then(data=>{
            console.log(data)
            setItems(prevItems => 
              prevItems.map(item => item.id === newId ? { ...item, ...obj } : item)
          );
            
          }).catch(err=>{
            console.log(err)
          })
          setUpdating(false)
          setAmount(0);
          setDesc("");
          setType("");
        }
        else{
          fetch('https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses.json',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
              'Content-Type' : 'application/json'
          }
          }).then(res=>{
            return res.json();
          }).then(data=>{
            const newItem = { id: data.name, ...obj }; 
          setItems((prevItems) => [...prevItems, newItem]); 
          setAmount(0);
          setDesc("");
          setType("");
            
          }).catch(err=>{
            console.log(err)
          })
        }
        
        
    }

    console.log(items)


  const deleteItem = (id) => {
    console.log(id)
    fetch(`https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: 'DELETE'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      setItems(items.filter(item => item.id !== id));
      console.log("Item deleted successfully");
  })
  .catch(error => {
      console.error("Error deleting item:", error);
  });
  } 
  const editItem = (id) => {
    setNewId(id)
    setUpdating(true);
    const itemToEdit = items.find(item => item.id === id);
    setAmount(itemToEdit.amount);
    setDesc(itemToEdit.desc);
    setType(itemToEdit.type);
    // deleteItem(id);  
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
        <button type='submit'>{updating?'Update expenses':'Add Expenses'}</button>
    </form>
    <ExpenseItem lists={items} onDelete={deleteItem} onEdit={editItem}/>
    </div>
  )
}

export default ExpenseForm