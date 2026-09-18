import {
    useParams
} from "react-router-dom";

import CardBuilder
    from "../../components/card-builder/CardBuilder";

import "./CreateCard.css";


const EditCard = () => {

    const {
        id
    } = useParams();


    return (
        <CardBuilder
            mode="edit"
            cardId={id}
        />
    );

};


export default EditCard;