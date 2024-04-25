export namespace User {
    export async function getInfo(){
        return {
            groups: ["Admin"],
            email: "michaelmunson@goose.com"
        }
    }
}