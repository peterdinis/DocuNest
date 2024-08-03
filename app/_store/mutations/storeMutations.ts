import axios from "axios";

export const deleteTrash = async() => {
    return await axios.delete("/api/trash/delete");
}