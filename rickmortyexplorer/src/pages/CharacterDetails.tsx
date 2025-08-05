import { useQuery } from '@tanstack/react-query';
import { getCharacterDetails } from '../api/queries';
import { useParams } from "@tanstack/react-router";
import { pageRoutes } from '../routes';

function CharacterDetails() {
    const params = useParams({ from: pageRoutes.characterDetails });
    const characterId = parseInt(params.id) || 1;

    const { data, isLoading, error } = useQuery({
        queryKey: ["characters", characterId],
        queryFn: () => getCharacterDetails(characterId),
        retryDelay: 1000,
        retry: 2
    })

    const { name, image, gender, status, location } = data || {}

    const customClassname = gender === "Female" ? "female-character" : "male-character";

    const renderCharacterDetails = () => {
        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message} {data?.error}</p>;
        if (!data) return <p>No character details found.</p>;
        return (
            <div className='character-card-container'>

                <img src={image} alt={data?.name} style={{ width: "200px", height: "200px" }} className={customClassname} />
                <div style={{ marginLeft: "20px" }}>
                    <h2>I am {name}</h2>
                    <p>Status : {status}</p>
                    <p>Address : {location?.name}</p>
                </div>

            </div>

        )
    }
    return (
        <>
            <h1> Character Details</h1>
            {renderCharacterDetails()}

        </>
    )
}

export default CharacterDetails