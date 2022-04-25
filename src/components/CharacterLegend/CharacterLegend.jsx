import { useState, useEffect } from 'react';
import { Container, ListGroup, Card, Badge } from 'react-bootstrap';
import { getImageURL } from '../../helpers/storHelpers';
import {
    query,
    collection,
    getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import './CharacterLegend.scss';

class Character {
    constructor(id, name, difficulty, imgURL) {
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.imgURL = imgURL;
    }
}

export default function CharacterLegend(props) {

    const { mapId } = props;
    const [loaded, setLoaded] = useState(false);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        getCharacters();
        // FUNCTION DEFINITIONS
        /**
         * Creates Character objects that will hold a reference to all data needed to present characters
         * in the character legend component
         * TODO: Refactor this code not to rely on the order between the storage items in 'Characters' folder and and 
         * the firestore db 'characters' collection being the same.
         */
        async function getCharacters() {
            const characterImagesArr = await getCharacterImages();
            const characterDataArr = await getCharacterData();
            const charactersArr = [];
            for (let i=0; i < characterDataArr.length; i++) {
                const characterData = characterDataArr[i];
                const character = new Character(characterData['id'], characterData['name'], characterData['difficulty'], characterImagesArr[i]);
                charactersArr.push(character);
            }
            setCharacters(charactersArr);
            setLoaded(true);
        }
        /**
         * Retrieves Character images from Firebase Storage
         * TODO: Use async.parallel() to make this step faster
         * @returns 
         */
        async function getCharacterImages() {
            const fileNames = ['knight-with-flying-fish.jfif', 'man-smelling-fish.jfif', 'mermaid.png', 'opera.png'];
            const characterImages = await Promise.all(fileNames.map(async function getCharacterImages(fileName) {
                const imgURL = await getImageURL('characters', fileName);
                return imgURL;
            }));
            return characterImages;
        }
        /**
         * Retrieves Character data from Firebase Firestore
         */
        async function getCharacterData() {
            const characterQuery = query(collection(db, 'characters'));
            const characterDocs = await getDocs(characterQuery);
            try {
                const characterDataArr = [];
                characterDocs.forEach((doc) => {
                    const characterData = {
                        id: doc.id,
                        ...doc.data()
                    }
                    characterDataArr.push(characterData);
                })
                return characterDataArr;
            }
            catch (err) {
                console.error(err);
            }
        }
    }, [])

    return (
        <Container fluid className='d-flex flex-grow-1 justify-content-center align-items-center'>
            <ListGroup className='d-flex flex-grow-1 flex-row'>
                {characters.map((character, i) => {
                    const { name, difficulty, imgURL } = character;
                    return (
                        <ListGroup.Item key={i} >
                            <Card>
                            <Card.Title>
                                <span>{name}</span>
                                <Badge pill>{difficulty}</Badge>
                            </Card.Title>
                            <Card.Img variant='top' src={imgURL} className='character-image' />                        
                            <Card.Body>
                            </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            
        </Container>
    )


}
