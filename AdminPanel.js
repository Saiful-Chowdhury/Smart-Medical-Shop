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

    deleteMedicine(name) {
        if (!this.head) {
            // showInventory();
            return;
        }

        if (this.head.medicine.name === name) {
            this.head = this.head.next;
            localStorage.setItem('medicinee', JSON.stringify(this)); // Update the entire linked list
            // showInventory();

            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.medicine.name === name) {
                current.next = current.next.next;
                localStorage.setItem('medicinee', JSON.stringify(this)); // Update the entire linked list
                // showInventory();

                return;
            }
            current = current.next;
        }
        showInventory();

    }

}

const medicinesLinkedList = new LinkedList();

// Function to add medicine
function addMedicine() {
    const name = document.getElementById('medicineName').value;
    const price = parseFloat(document.getElementById('medicinePrice').value);
    const quantity = parseInt(document.getElementById('medicineQuantity').value);

    if (name && !isNaN(price) && !isNaN(quantity)) {
        const medicine = {
            name,
            price,
            quantity
        };
        medicinesLinkedList.append(medicine);
        localStorage.setItem('medicinee', JSON.stringify(medicinesLinkedList));
        alert('Medicine added to inventory.');
        showInventory();
    } else {
        alert('Invalid input. Please check your entries.');
    }
}


// Function to search medicine
function searchMedicine() {
    const searchName = document.getElementById('UsermedicineName').value;
    const medicine = medicinesLinkedList.findMedicine(searchName);

    if (medicine) {
        alert(`Medicine found:\nName: ${medicine.name}\nPrice: $${medicine.price}\nQuantity: ${medicine.quantity}`);
    } else {
        alert('Medicine not found in inventory.');
    }
}

// Function to display the Stocks
function showInventory() {
    const inventoryDiv = document.getElementById('root');
    let current = medicinesLinkedList.head;
    var i = 1;
    while (current) {
        inventoryDiv.innerHTML += `
            <tr><td>${i}</td><td>${current.medicine.name}</td>
            <td>${current.medicine.price}</td>
            <td>${current.medicine.quantity}</td><td><button class="ebtn" onclick="updateMedicine('${current.medicine.name}')">Edit</button>
            <button class="dbtn" onclick={deleteMedicine('${current.medicine.name}')}>Delete</button></td></tr>
            
        `;
        i++;
        current = current.next;
    }
}




// Initialize the inventory from local storage if available
const storedMedicines = JSON.parse(localStorage.getItem('medicinee'));
if (storedMedicines) {
    medicinesLinkedList.head = storedMedicines.head;
}


// Function to sell medicine
function sellMedicine() {
    const customerName = document.getElementById('customerName').value;
    const medicineName = document.getElementById('medicineName').value;
    const quantity = parseInt(document.getElementById('medicineQuantity').value);

    if (customerName && medicineName && !isNaN(quantity)) {
        const medicine = medicinesLinkedList.findMedicine(medicineName);

        if (medicine && medicine.quantity >= quantity) {
            // Deduct sold quantity from the inventory
            medicine.quantity -= quantity;

            // Update local storage
            localStorage.setItem('medicinee', JSON.stringify(medicinesLinkedList));

            // Display the bill for the current transaction

            const totalCost = medicine.price * quantity;

            let billContent = '<h2>Bill</h2><table><tr><th>Medicine</th><th>Price</th><th>Quantity</th><th>Total</th></tr>';

            billContent += `</table><p>Total Cost: ${totalCost.toFixed(2)}/-</p>`;

            // Display the bill in a popup
            const billPopup = window.open('', 'Bill', 'width=600,height=600');
            billPopup.document.write(billContent);

            // Add a button to print the bill
            billPopup.document.write('<button onclick="window.print()">Print</button>');
            // Refresh the inventory display
            showInventory();
        } else {
            alert('Medicine not available in sufficient quantity.');
        }
    } else {
        alert('Invalid input. Please check your entries.');
    }


}


//   For Order


class OrderNode {
    constructor(order) {
        this.order = order;
        this.next = null;
    }
}

class OrderLinkedList {
    constructor() {
        this.head = null;
    }
}

// const orderLinkList = new OrderLinkedList();


function showOrder() {
    const orderDiv = document.getElementById('orderBody');
    const totalorder = document.getElementById('totalOrder');
    const totalSale = document.getElementById('totalSale');
    const userName = document.getElementById('Name');

    let current = orderLinkList.head;
    var i = 1;
    while (current) {
        console.log('Current Order Node:', current);
        orderDiv.innerHTML += `
          <tr>
            <td>${i}.</td>
            <td>${current.order.username}</td>
            <td>${current.order.productName}</td>
            <td>${current.order.quantity}</td>
            <td>${current.order.phone}</td>
            <td>${current.order.address}</td>
            <td><button class="ebtn" onclick={completeDelivary('${current.order.username}')}>Deliver</button></td>
          </tr>
        `;
        i++;
        current = current.next;
    }
    totalorder.innerHTML += `<h1>${i - 1}</h1>`;
    userName.innerHTML += `<h3>Saiful</h3>`;

}

const orderLinkList = new OrderLinkedList();

const orderLinkListt = JSON.parse(localStorage.getItem('orders'));
if (orderLinkListt) {
    orderLinkList.head = orderLinkListt.head;
}
showOrder();

// Completed Delivary
function completeDelivary(name) {
    let current = orderLinkList.head;
    let prev = null;

    while (current) {
        if (current.order.username === name) {
            if (prev) {
                prev.next = current.next;
            } else {
                orderLinkList.head = current.next;
            }

            localStorage.setItem("orders", JSON.stringify(orderLinkList));
            location.reload();
            showOrder();
            return;
        }
        prev = current;
        current = current.next;
    }
    location.reload();
    showOrder();
}



// Update & Delete Medicine
function updateMedicine(name) {
    let current = medicinesLinkedList.head;

    // Find the medicine with the given name
    while (current) {
        if (current.medicine.name === name) {
            // Display a prompt or form for the user to input updated details
            const updatedName = prompt('Enter updated name:', current.medicine.name);
            const updatedPrice = parseFloat(prompt('Enter updated price:', current.medicine.price));
            const updatedQuantity = parseInt(prompt('Enter updated quantity:', current.medicine.quantity));

            // Check if the user provided valid inputs
            if (updatedName && !isNaN(updatedPrice) && !isNaN(updatedQuantity)) {
                // Update the medicine details
                current.medicine.name = updatedName;
                current.medicine.price = updatedPrice;
                current.medicine.quantity = updatedQuantity;

                // Update local storage with the modified linked list
                localStorage.setItem('medicinee', JSON.stringify(medicinesLinkedList));

                // Refresh the inventory display

                showInventory();
                location.reload();
                return;
            } else {
                alert('Invalid input. Please check your entries.');
                return;
            }
        }
        current = current.next;
    }

    // If the medicine with the given name is not found
    alert(`Medicine with name '${name}' not found.`);
}

function deleteMedicine(name) {
    medicinesLinkedList.deleteMedicine(name);
    // localStorage.setItem('medicinee', JSON.stringify(medicinesLinkedList));
    alert('Medicine deleted from Stock.');
    location.reload(); // Reload the page after deleting the medicine
    showInventory();
}


var a;

function completeDelivery(name) {
    let current = orderLinkedList.head;
    let prev = null;

    while (current) {
        if (current.order.username === name) {
            if (prev) {
                prev.next = current.next;
            } else {
                orderLinkedList.head = current.next;
            }

            localStorage.setItem("orders", JSON.stringify(orderLinkedList));

            // Move the order to the delivered list
            deliveredLinkedList.add(current.order);
            localStorage.setItem("delivered", JSON.stringify(deliveredLinkedList));
            a *= current.order.price;
            location.reload();
            showOrder();
            return;
        }
        prev = current;
        current = current.next;
    }
    location.reload();
    showOrder();
}

// Delivered LinkedList
class DeliveredNode {
    constructor(order) {
        this.order = order;
        this.next = null;
    }
}

class DeliveredLinkedList {
    constructor() {
        this.head = null;
    }

    add(order) {
        const newNode = new DeliveredNode(order);

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
}

const deliveredLinkedList = new DeliveredLinkedList();