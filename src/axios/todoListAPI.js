import axiosClient from "./axiosClient";

const todoListAPI = {
    async getAll(){
        const url = '/todoList';
        return axiosClient.get(url)
    },
    async postTodo(data){
        if(data !== undefined){
            const url = '/todoList';
            return axiosClient.post(url, data)
        }

    },
    async deleteTodo(id){
        const url = `/todoList/${id}`;
        return axiosClient.delete(url)
    },
    async updateTodo(id, data){
        const url = `/todoList/${id}`;
        return axiosClient.put(url, data)
    }
}
export default todoListAPI