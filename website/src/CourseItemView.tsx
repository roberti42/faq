import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link, Text } from 'office-ui-fabric-react';
import {
    Card,
    ICardTokens,
} from "@uifabric/react-cards";
import Course from './models/Course'
import { initializeIcons } from '@uifabric/icons';
import { FontWeights, ITextStyles, Persona } from '@fluentui/react';
initializeIcons();

interface Props {
    data: Course
}


const CourseItemView = (props: Props) => {
    var data = props.data;

    const siteTextStyles: ITextStyles = {
        root: {
            color: "#025F52",
            fontWeight: FontWeights.semibold,
        },
    };
    const descriptionTextStyles: ITextStyles = {
        root: {
            color: "#333333",
            fontWeight: FontWeights.semibold,
        },
    };
    const helpfulTextStyles: ITextStyles = {
        root: {
            color: "#333333",
            fontWeight: FontWeights.regular,
        },
    };
    const cardTokens: ICardTokens = { childrenMargin: 12 };

    return (
        <Card
            tokens={cardTokens}                             
        >
            <Card.Item>
                { data.anno !== "Anno accademico" ? <Persona text={data.name} /> : <Persona text={data.name} imageUrl= {process.env.PUBLIC_URL + '/photo_2019-12-29_19-50-06.jpg'} /> }
            </Card.Item>
            <Card.Section>
                {   // Gruppo anno accademico descrizione in caso c'è il link disponibile (magistrali insomma) 
                    ( () => {
                        if (data.anno === "Anno accademico" && data.gruppo !== "") {
                            return <Text variant="small" styles={helpfulTextStyles}>Gruppo per qualsiasi tipo di discussione inerente a questo corso di laurea.</Text>
                        } else {
                            return "";
                        }
                    })()
                }
                
                
                {
                    ( () => {
                        if (data.cfu as any !== "") {
                            return (
                                <Text variant="small" styles={siteTextStyles}>{data.cfu} CFU</Text>
                            )
                        } else {
                            return "";
                        }
                    })()
                }

                <Text styles={descriptionTextStyles}>
                {
                    (() => 
                    {
                        if (data.anno === "" || data.anno === "Anno accademico")
                        {
                            return "";
                        } 
                        if (data.anno === "Complementare")
                        {
                            return <span>Complementare, </span>;
                        }
                        else 
                        {
                            return <span>{data.anno}° Anno, </span>;
                        }
                    })()
                }
                {
                    ( () => {
                        if (data.semestre as any !== "") {
                            return <span>{data.semestre}° Semestre</span>;
                        } else {
                            return "";
                        }
                    })()
                }
                </Text>

                {
                    ( () => {
                        if (data.gruppo !== "") {
                            return (
                            <Text variant="small" styles={helpfulTextStyles}>
                                <i className="fab fa-telegram-plane" style={{color: '#6087eb'}}></i>
                                &nbsp;
                                <Link href={data.gruppo}>
                                    Gruppo Telegram
                                </Link>
                            </Text>
                            )
                        } else if ( data.anno === "Anno accademico") {
                            return (
                                <Text variant="small" styles={helpfulTextStyles}>Contatta un amministratore se vuoi essere aggiunto al gruppo.</Text>
                            )
                        } else {
                            return (
                                <Text variant="small" styles={helpfulTextStyles}>Gruppo non disponibile.</Text>
                            )
                        }
                    })()
                }
                {
                    data.websites.length !== 0 ?
                        <Text variant="small" styles={helpfulTextStyles}>
                            <i className="fas fa-link" style={{color:'#696a6b'}}></i>
                            &nbsp;
                            {data.websites.map(
                                (e, i) => {
                                    return (
                                        <span key={i}>
                                            <Link href={e.link}>
                                                {e.etichetta}
                                            </Link>
                                            {i + 1 < data.websites.length ? <span>,&nbsp;</span> : ""}
                                        </span>
                                    )
                                }
                            )}
                        </Text>
                        : ""
                }
                {
                    data.faq !== "" ?
                        <Text variant="small" styles={helpfulTextStyles}>
                            <i className="far fa-question-circle"></i>
                            &nbsp;
                            <Link href={data.faq}>
                                    Faq
                            </Link>
                        </Text>
                        :
                        ""
                }

            </Card.Section>
            {/*
            <Card.Section
                horizontal
                styles={footerCardSectionStyles}
                tokens={footerCardSectionTokens}
            >
                <Icon iconName="RedEye" styles={iconStyles} />
                <Icon iconName="SingleBookmark" styles={iconStyles} />
                <Stack.Item grow={1}>
                    <span />
                </Stack.Item>
                <Icon iconName="MoreVertical" styles={iconStyles} />
            </Card.Section>*/}
        </Card>
    );
};

export default CourseItemView;