import { Accounts } from "../models/accounts"

const accounts = [
    new Accounts("pablo@gmail.com", "pablo123"),
    new Accounts("juan@gmail.com", "juan123"),
]

export const getAccounts = () => {
    console.log(accounts)

    return accounts
}
export const getAmount = () => accounts.length