export const Role = {
    Super: "Super",
    Admin: "Admin",
    CustomerService: "Customer Service",
    Driver: "Driver",
    Guest: "Guest"
}

export const PaymentStatus = {
    NEW: 'N',
    PAID: 'P'
}

export const SYSTEM_ID = process.env.SYSTEM_ID;

export const TransactionType = {
    ClientPay: "Client Pay",
    ClientPlaceOrder: "Client Place Order",
    Payout: "Payout"
}