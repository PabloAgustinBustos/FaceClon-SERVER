export class Accounts {
    private id: number = 0
    private email: string
    private password: string

    private static amount: number = 1

    constructor(email: string, password: string) {
        this.id = Accounts.amount
        this.email = email
        this.password = password

        Accounts.amount++
    }

    public getId(): number {
        return this.id
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }
}