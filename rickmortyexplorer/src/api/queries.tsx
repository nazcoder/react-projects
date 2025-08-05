const BASE_URL = 'https://rickandmortyapi.com/api/character';
export const getCharacterList = async (pageNo: number) => {
    try {
        const response = await fetch(`${BASE_URL}?page=${pageNo}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();

    } catch (error) {
        console.error('Error:', error);
        throw error

    }

}

export const getCharacterDetails = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();

    } catch (error) {
        console.error('Error:', error);
        throw error;

    }

}