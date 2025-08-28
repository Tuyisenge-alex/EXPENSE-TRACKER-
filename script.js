// Initialize expenses array from localStorage or empty array if none exists
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to add a new expense
function addExpense() {
    // Get input values
    const expenseName = document.getElementById('expense-name').value.trim();
    const expenseAmount = document.getElementById('expense-amount').value.trim();
    
    // Validate inputs
    if (expenseName === '' || expenseAmount === '' || isNaN(expenseAmount) || Number(expenseAmount) <= 0) {
        alert('Please enter a valid expense name and amount');
        return;
    }
    
    // Create expense object
    const expense = {
        name: expenseName,
        amount: parseFloat(expenseAmount)
    };
    
    // Add to expenses array
    expenses.push(expense);
    
    // Save to localStorage
    saveExpenses();
    
    // Clear input fields
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    
    // Refresh the display
    renderExpenses();
}

// Function to save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses to the DOM
function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    const totalElement = document.getElementById('total');
    
    // Clear current list
    expenseList.innerHTML = '';
    
    // Check if there are no expenses
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="no-expenses">No expenses added yet.</p>';
        totalElement.textContent = '$0.00';
        return;
    }
    
    // Calculate total
    let total = 0;
    
    // Loop through expenses and create list items
    expenses.forEach((expense, index) => {
        total += expense.amount;
        
        // Create expense item element
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        
        // Create expense details
        expenseItem.innerHTML = `
            <span class="expense-name">${expense.name}</span>
            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteExpense(${index})">❌</button>
        `;
        
        // Add to expense list
        expenseList.appendChild(expenseItem);
    });
    
    // Update total display
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to delete an expense
function deleteExpense(index) {
    // Remove expense from array
    expenses.splice(index, 1);
    
    // Save updated expenses to localStorage
    saveExpenses();
    
    // Refresh the display
    renderExpenses();
}

// Initial render when page loads
document.addEventListener('DOMContentLoaded', renderExpenses);