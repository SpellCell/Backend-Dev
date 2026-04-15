const API = "http://localhost:8080";
const token = localStorage.getItem("token");


// LOAD DASHBOARD DATA
async function loadDashboard(){

    try{

        // PRODUCTS
        const prodRes = await fetch(API + "/product");
        const prodData = await prodRes.json();
        const products = prodData.data || [];

        // SALES
        const saleRes = await fetch(API + "/sales");
        const saleData = await saleRes.json();
        const sales = saleData.data || [];

        // CALCULATIONS
        const totalProducts = products.length;

        const totalSales = sales.length;

        const lowStock = products.filter(p => p.quantity < 10).length;

        let revenue = 0;
        sales.forEach(s => {
            revenue += Number(s.price) * Number(s.quantity);
        });

        // UPDATE UI
        document.getElementById("totalProducts").innerText = totalProducts;
        document.getElementById("totalSales").innerText = totalSales;
        document.getElementById("lowStock").innerText = lowStock;
        document.getElementById("revenue").innerText = "₹" + revenue;

    }catch(err){
        console.log("Dashboard error:", err);
    }
}
const links = document.querySelectorAll(".sidebar a");

links.forEach(link => {
    if(link.href === window.location.href){
        link.parentElement.classList.add("active");
    }
});

function logout(){
    localStorage.clear();
    window.location.href = "login.html";
}
window.logout = logout;

// INIT
loadDashboard();