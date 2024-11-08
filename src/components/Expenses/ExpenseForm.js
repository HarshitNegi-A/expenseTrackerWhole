import React, { useEffect, useState } from 'react'
import classes from "./ExpenseForm.module.css"
import ExpenseItem from './ExpenseItem'
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions, themeActions } from '../../store/redux-store'



const ExpenseForm = () => {

    const [amount,setAmount]=useState(0)
    const [desc,setDesc]=useState("") 
    const [type,setType]=useState("")
    const [updating,setUpdating]=useState(false)
    const [newId,setNewId]=useState(null)

    const expenses=useSelector(state=>state.expenses.expenses)
    const userId=useSelector(state=>state.auth.userId)
    const safeEmail = userId.replace('@', '_at_').replace('.', '_dot_');
    const isDarkTheme=useSelector(state=>state.theme.isDarkTheme);

     const dispatch=useDispatch();

     const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    useEffect(()=>{     
      fetch(`https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses/${safeEmail}.json`)
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
            dispatch(expenseActions.replace(arr));
            // setItems(arr);
            console.log(arr)
          }
       
      }).catch(err=>{
        console.log(err)
      })
    },[])

    const handleToggleTheme=()=>{
      dispatch(themeActions.toggleTheme())
    }

    const handleActivatePremium=()=>{
      dispatch(themeActions.activateDarkTheme())
    }

    const handleDownloadFile=()=>{
      const csvData = expenses.map(expense => ({
        Amount: expense.amount,
        Description: expense.desc,
        Category: expense.type
      }));
      const csvContent = "data:text/csv;charset=utf-8,"
        + ["Amount,Description,Category", ...csvData.map(e => `${e.Amount},${e.Description},${e.Category}`)].join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "expenses.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const obj={
            amount:amount,
            desc:desc ,
            type:type,
        }
        if(updating){
          fetch(`https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses/${safeEmail}/${newId}.json`,{
            method:'PUT',
            body:JSON.stringify(obj),
            headers:{
              'Content-Type' : 'application/json'
          }
          }).then(res=>{
            return res.json();
          }).then(data=>{
            console.log(data)
          //   setItems(prevItems => 
          //     prevItems.map(item => item.id === newId ? { ...item, ...obj } : item)
          // );
          dispatch(expenseActions.edit({id:newId, obj:obj}))
            
          }).catch(err=>{
            console.log(err)
          })
          setUpdating(false)
          setAmount(0);
          setDesc("");
          setType("");    
        }
        else{
          console.log(userId)
          fetch(`https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses/${safeEmail}.json`,{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
              'Content-Type' : 'application/json'
          }
          }).then(res=>{
            return res.json();
          }).then(data=>{
            const newItem = { id: data.name, ...obj }; 
          // setItems((prevItems) => [...prevItems, newItem]); 
          dispatch(expenseActions.add(newItem))
          setAmount(0);
          setDesc("");
          setType("");
            
          }).catch(err=>{
            console.log(err)
          })
        }
        
        
    }



  const deleteItem = (id) => {
    console.log(id)
    fetch(`https://expense-tracker-baf8e-default-rtdb.firebaseio.com/expenses/${safeEmail}/${id}.json`, {
      method: 'DELETE'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      // setItems(items.filter(item => item.id !== id));
      dispatch(expenseActions.delete(id))
      console.log("Item deleted successfully");
  })
  .catch(error => {
      console.error("Error deleting item:", error);
  });
  } 
  const editItem = (id) => {
    const itemToEdit = expenses.find(item => item.id === id);
    console.log(itemToEdit)
    setAmount(itemToEdit.amount);
    setDesc(itemToEdit.desc);
    setType(itemToEdit.type);
    setUpdating(true);
    setNewId(id)
    // deleteItem(id);  
  };

  return ( <div className={isDarkTheme ? classes.darkTheme : classes.lightTheme}>
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
    <ExpenseItem onDelete={deleteItem} onEdit={editItem}/>
    {totalExpenses > 10000 && (
        <button className={classes.premiumBtn} onClick={handleActivatePremium}>Activate Premium</button>
      )}
       <button onClick={handleToggleTheme} className={classes.toggleThemeBtn}>
        Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>
      <button onClick={handleDownloadFile} className={classes.downloadBtn}>
        Download Expenses
      </button>
    </div>
  )
}

export default ExpenseForm