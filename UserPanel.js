class Node {
    constructor(medicine) {
        this.medicine = medicine;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(medicine) {
        const newNode = new Node(medicine);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    findMedicine(name) {
        let current = this.head;
        while (current) {
            if (current.medicine.name === name) {
                return current.medicine;
            }
            current = current.next;
        }
        return null;
    }

}
const medicinesForUserLinkedList = new LinkedList();
// Function to search medicine
function searchMedicine() {
    const searchName = document.getElementById('UsermedicineName').value;
    const medicine = medicinesForUserLinkedList.findMedicine(searchName);

    if (medicine) {
        alert(`Medicine found:\nName: ${medicine.name}\nPrice: $${medicine.price}\nQuantity: ${medicine.quantity}`);
    } else {
        alert('Medicine not found in inventory.');
    }
}

// Function to display the inventory
// Assuming you have a linked list for medicinesForUserLinkedList

// const maxSize = 1000; // Adjust the size according to your requirements
// const orderQueue = new Array(maxSize).fill(null);

// function enqueue(order) {
//     if ((rear + 1) % maxSize === front) {
//         // Queue is full
//         console.error('Queue is full. Cannot enqueue.');
//         return;
//     }

//     if (front === -1) {
//         front = 0;
//     }

//     rear = (rear + 1) % maxSize;
//     orderQueue[rear] = order;
// }

// function dequeue() {
//     if (front === -1) {
//         // Queue is empty
//         console.error('Queue is empty. Cannot dequeue.');
//         return;
//     }

//     const order = orderQueue[front];

//     if (front === rear) {
//         // Last element in the queue
//         front = rear = -1;
//     } else {
//         front = (front + 1) % maxSize;
//     }

//     return order;
// }
// const cart = [];

function showInventoryForUser() {
    const inventoryDiv = document.getElementById('root');
    let current = medicinesForUserLinkedList.head;
    var i = 1;
    while (current) {
        inventoryDiv.innerHTML += `
          <tr>
            <td>${i}</td>
            <td>${current.medicine.name}</td>
            <td>${current.medicine.price}</td>
            <td>${current.medicine.quantity}</td>
            <td><button class="addtocardbtn" onclick="openPopup('${current.medicine.name}','${current.medicine.price}','${current.medicine.quantity}')">Add</button></td>
          </tr>
        `;
        i++;
        current = current.next;
    }
    const userName = document.getElementById('Name');
}

// Initialize the inventory from local storage if available
const storedMedicines = JSON.parse(localStorage.getItem('medicinee'));
if (storedMedicines) {
    medicinesForUserLinkedList.head = storedMedicines.head;
}

let popup = document.getElementById("Popup");
let selectedMedicineName;
let selectedMedicinePrice;
let selectedMedicineQuantity;

function openPopup(name, price, quantity) {
    let productName = document.getElementById("productNamee");
    productName.innerHTML = name;
    popup.classList.add("open-popup");
    selectedMedicineName = name;
    selectedMedicinePrice = price;
    selectedMedicineQuantity = quantity;
}

const cart = JSON.parse(localStorage.getItem('cart')) || [];







// Order LinkList
class node {
    constructor(order) {
        this.order = order;
        this.next = null;
    }
}

class LinkedListt {
    constructor() {
        this.head = null;
    }

    add(order) {
        const newnode = new node(order);

        if (!this.head) {
            this.head = newnode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newnode;
        }
    }

    findMedicine(name) {
        let current = this.head;
        while (current) {
            if (current.order.name === name) {
                return current.order;
            }
            current = current.next;
        }
        return null;
    }


}




const orderLinkedList = new LinkedListt();

function addOrder() {
    popup.classList.remove("open-popup");

    let username = document.getElementById("customerName").value;
    let quantity = document.getElementById("medicineUserQuantity").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let price = selectedMedicinePrice * quantity;
    const medicine = medicinesForUserLinkedList.findMedicine(selectedMedicineName);
    if (medicine && medicine.quantity >= quantity) {
        // Deduct sold quantity from the inventory
        medicine.quantity -= quantity;

        // Update local storage
        localStorage.setItem('medicinee', JSON.stringify(medicinesForUserLinkedList));

        // Display the bill for the current transaction

        const totalCost = medicine.price * quantity;

        let billContent = '<h2>Bill</h2><table><tr><th>Medicine</th><th>Price</th><th>Quantity</th><th>Total</th></tr>';

        billContent += `</table><p>Total Cost: ${totalCost.toFixed(2)} /-</p>`;

        // Display the bill in a popup
        const billPopup = window.open('', 'Bill', 'width=600,height=600');
        billPopup.document.write(billContent);

        //  button to print the bill
        billPopup.document.write('<button onclick="window.print()">Print</button>');
        const order = {
            username,
            productName: selectedMedicineName,
            quantity,
            phone,
            price,
            address
        };

        orderLinkedList.add(order);
        cart.push(order);

        // Save orders to local storage (or send to server, depending on your requirements)
        localStorage.setItem('orders', JSON.stringify(orderLinkedList));
        localStorage.setItem('cart', JSON.stringify(cart));

        // alert("Order is added to the queue");

        closePopup();

    } else {
        alert('Medicine not available in sufficient quantity.');
    }


}


function closePopup() {
    let popup = document.getElementById("Popup");
    popup.classList.remove("open-popup");
}


// function closePopup() {
//     popup.classList.remove("open-popup");
// }
// const orderLinkedList = new LinkedListt();

// Initialize the orderLinkedList from local storage if available
const storedOrders = JSON.parse(localStorage.getItem('orders'));
if (storedOrders) {
    orderLinkedList.head = storedOrders.head;
}

showInventoryForUser()