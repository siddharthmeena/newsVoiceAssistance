import React,{useState, useEffect} from "react"


import alanBtn from "@alan-ai/alan-sdk-web";

import wordsToNumbers from 'words-to-numbers'

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles"
import image from './images/cropped-smile-bitmojipng-jake-miller-bitmoji-png-248_300.png'

const alanKey = '768d3348a5ae9845bda7ce7293853d8d2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = ()=>{
    const classes = useStyles();
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect( ()=>{
        alanBtn({
            key: alanKey, 
            onCommand: ({command,articles,number})=>{
                switch (command){
                    case 'newHeadlines': setNewsArticles(articles);
                    setActiveArticle(-1);
                    break;
                    case 'highlight' : 
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1)
                    break;
                    case 'open':
                    const parseNumber = number.length>2 ?wordsToNumbers(number,{fuzzy:true}) :number; 
                    if(parseNumber>20){
                        alanBtn().playText('Please try that again');
                    } 
                    else{
                    window.open(articles[parseNumber-1].url,'_blank');
                    alanBtn().playText('Opening..')
                    }
                    break;
                    default: alert("can't understand")
                }
            }
        })
    },[]
    )
    return (
        <div>
        <div className={classes.logoContainer}>
        <img src={image} className={classes.alanLogo} alt="alan logo" />
        </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}
export default App;

//d604bc11c9a04903ae88a1304374a86f