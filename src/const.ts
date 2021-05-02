export const Role = {
    Super: "Super",
    Admin: "Admin",
    CustomerService: "Customer Service",
    Driver: "Driver",
    Guest: "Guest"
}

export const Status = {
    New: 'N',
    Cancelled: 'C',
}

export const PaymentStatus = {
    New: 'N',
    Paid: 'P',
    Cancelled: 'C'
}

export const OrderStatus = {
    New: 'N',
    Paid: 'P',
    Cancelled: 'C'
}

export const SYSTEM_ID = process.env.SYSTEM_ID;

export const TransactionType = {
    ClientPay: "Client Pay",
    ClientPlaceOrder: "Client Place Order",
    Payout: "Payout"
}